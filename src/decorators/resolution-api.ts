import { IDecoratorResolutionApi } from './types'
import {
    IDecoratorResolution,
    WithDecoratorResolverArgs,
    WithDecoratorResolverAttempt,
    WithDecoratorResolverName,
    WithDecoratorResolver
} from './types/resolution'
import { IApiCache } from '../build'

export class ResolutionApi implements IDecoratorResolutionApi {
    private _name?: string
    private _attempt: boolean = false
    private _service?: {}
    private _args: any[] = []

    private _cache: IApiCache = {
        use: false,
        name: undefined
    }

    public get service(): {} | undefined {
        return this._service
    }

    public set service(value: {} | undefined) {
        this._service = value
    }

    public get args(): any[] {
        return this._args
    }

    public get name(): string | undefined {
        return this._name
    }

    public get attempt(): boolean {
        return this._attempt
    }

    public get cache(): IApiCache {
        return this._cache
    }

    constructor(private _resolve: (api: IDecoratorResolutionApi) => ParameterDecorator) { }

    public by(service?: {}): IDecoratorResolution {

        this._service = service

        return {
            args: this.argsAction.bind(this),
            attempt : this.attemptAction.bind(this),
            name: this.nameAction.bind(this),
            cache: this.cacheAction.bind(this),
            resolve: this.resolveAction.bind(this)
        }
    }

    private argsAction(...value: {}[]): WithDecoratorResolverArgs {
        this._args = value

        return {
            attempt : this.attemptAction.bind(this),
            name: this.nameAction.bind(this),
            cache: this.cacheAction.bind(this),
            resolve: this.resolveAction.bind(this)
        }
    }

    private attemptAction(): WithDecoratorResolverAttempt {

        this._attempt = true

        return {
            name: this.nameAction.bind(this),
            cache: this.cacheAction.bind(this),
            resolve: this.resolveAction.bind(this)
        }
    }

    private nameAction(value : string): WithDecoratorResolverName {

        this._name = value

        return {
            cache: this.cacheAction.bind(this),
            resolve: this.resolveAction.bind(this)
        }
    }

    private cacheAction(name? : string): WithDecoratorResolver {
        this._cache = {
            use: true,
            name
        }

        return {
            resolve : this.resolveAction.bind(this)
        }
    }

    private resolveAction() : ParameterDecorator {
        return this._resolve(this)
    }
}
