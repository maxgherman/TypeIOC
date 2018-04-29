'use strict';

import { checkNullArgument, checkDependency } from '../utils';

export class Api<T> implements Typeioc.Internal.IContainerApi<T>{
    private _service: T;
    private _name:string;

    private _cache : Typeioc.Internal.IApiCache = {
        use: false,
        name: <string>undefined
    };

    private _dependencies : Array<Typeioc.IDynamicDependency> = [];
    private _attempt = false;
    private _args : Array<any> = [];

    public get serviceValue() : T {
        return this._service;
    }

    public get nameValue() : string {
        return this._name;
    }

    public get cacheValue() : Typeioc.Internal.IApiCache  {
        return this._cache;
    }

    public get dependenciesValue() : Array<Typeioc.IDynamicDependency>  {
        return this._dependencies;
    }

    public get isDependenciesResolvable() : boolean {
        return this._dependencies && this._dependencies.length > 0;
    }

    public get attemptValue() : boolean  {
        return this._attempt;
    }

    public get throwResolveError() : boolean {
        return !this.attemptValue;
    }

    public get argsValue() : Array<any> {
        return this._args;
    }

    constructor(private _container : Typeioc.Internal.IImportApi<T>) { }

    public service(value : any) : Typeioc.IResolveWith<T> {

        checkNullArgument(value, 'value');

        this._service = value;

        return {
            args: this.args.bind(this),
            attempt: this.attempt.bind(this),
            name: this.name.bind(this),
            dependencies: this.dependencies.bind(this),
            cache: this.cache.bind(this),
            exec: this.exec.bind(this),
            execAsync : this.execAsync.bind(this)
        }
    }

    private args(...args : Array<any>) : Typeioc.IResolveTryNamedDepCache<T> {
        this._args = args;

        return {
            attempt: this.attempt.bind(this),
            name: this.name.bind(this),
            dependencies: this.dependencies.bind(this),
            cache: this.cache.bind(this),
            exec: this.exec.bind(this),
            execAsync : this.execAsync.bind(this)
        };
    }

    private attempt() : Typeioc.IResolveNamedDepCache<T>{
        this._attempt = true;

        return {
            name: this.name.bind(this),
            dependencies: this.dependencies.bind(this),
            cache: this.cache.bind(this),
            exec: this.exec.bind(this),
            execAsync : this.execAsync.bind(this)
        };
    }

    private name(value : string) : Typeioc.IResolveDepCache<T> {

        checkNullArgument(value, 'value');

        this._name = value;

        return {
            dependencies: this.dependencies.bind(this),
            cache: this.cache.bind(this),
            exec: this.exec.bind(this),
            execAsync : this.execAsync.bind(this)
        };
    }

    private dependencies(data : Typeioc.IDynamicDependency | Array<Typeioc.IDynamicDependency>) : Typeioc.IResolveDepCache<T>
    {
        checkNullArgument(data, 'data');

        if(Array.isArray(data)) {
            (<Array<Typeioc.IDynamicDependency>>data)
            .forEach(item => checkDependency(item));

            this._dependencies.push.apply(this._dependencies, data);
        } else {
            checkDependency(data);
            this._dependencies.push(data);
        }

        return {
            dependencies: this.dependencies.bind(this),
            cache: this.cache.bind(this),
            exec: this.exec.bind(this),
            execAsync : this.execAsync.bind(this)
        };
    }

    private cache(name? : string) : Typeioc.IResolveReturn<T> {
        this._cache.use = true;
        this._cache.name = name;

        return {
            exec : this.exec.bind(this),
            execAsync : this.execAsync.bind(this)
        };
    }

    private exec() : T {
        return this._container.execute(this);
    }
    
    private async execAsync() : Promise<T> {
        
        return new Promise<T>(resolve => {
           resolve(this.exec());
        });
    }
}