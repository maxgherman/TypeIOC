/*---------------------------------------------------------------------------------------------------
 * Copyright (c) 2017 Maxim Gherman
 * typeioc - Dependency injection container for node typescript / javascript
 * @version v2.0.0
 * @link https://github.com/maxgherman/TypeIOC
 * @license MIT
 * --------------------------------------------------------------------------------------------------*/

/// <reference path="../../d.ts/typeioc.internal.d.ts" />

'use strict';


import { Defaults } from '../types';
import { checkNullArgument }  from '../utils';
import Internal = Typeioc.Internal;


export class ContainerBuilder implements Typeioc.IContainerBuilder {
    private _registrations : Internal.IRegistrationBase[];
    private _moduleRegistrations : Internal.IModuleRegistration[];
  
    constructor(private _configRegistrationService : Internal.IConfigRegistrationService,
                private _registrationBaseService : Internal.IRegistrationBaseService,
                private _instanceRegistrationService : Internal.IInstanceRegistrationService,
                private _moduleRegistrationService : Internal.IModuleRegistrationService,
                private _internalContainerService : Internal.IInternalContainerService,
                private _containerService : Internal.IContainerService) {

        this._registrations = [];
        this._moduleRegistrations = [];
    }

    public register<R>(service : any) : Typeioc.IRegistration<R> {

        checkNullArgument(service, 'service');

        var regoBase = this._registrationBaseService.create(service);
        var registration = this._instanceRegistrationService.create<R>(regoBase);

        setDefaults(regoBase);

        this._registrations.push(regoBase);

        return registration;
    }

    public registerModule(serviceModule : Object) : Typeioc.IAsModuleRegistration {

        checkNullArgument(serviceModule, 'serviceModule');

        var regoBase = this._registrationBaseService.create(serviceModule);
        var moduleRegistration = this._moduleRegistrationService.create(regoBase);

        setDefaults(regoBase);

        this._moduleRegistrations.push(moduleRegistration);

        return moduleRegistration.getAsModuleRegistration();
    }

    public registerConfig(config : Typeioc.IConfig) : void {

        checkNullArgument(config, 'config');

        var configRego = this._configRegistrationService.create();
        configRego.apply(config);

        setDefaults(configRego);

        this._registrations.push.apply(this._registrations, configRego.registrations);
    }

    public build() : Typeioc.IContainer {

        var regoes = this._registrations.slice(0);
        
        this._moduleRegistrations.forEach(item => {
            regoes.push.apply(regoes, item.registrations);
        });

        var internalContainer = this._internalContainerService.create();
        var container = this._containerService.create(internalContainer);
        internalContainer.add(regoes);

        return {
            cache : container.cache,
            resolve : container.resolve.bind(container),
            resolveAsync : container.resolveAsync.bind(container),
            tryResolve: container.tryResolve.bind(container),
            tryResolveAsync : container.tryResolveAsync.bind(container),
            resolveNamed : container.resolveNamed.bind(container),
            resolveNamedAsync : container.resolveNamedAsync.bind(container),
            tryResolveNamed : container.tryResolveNamed.bind(container),
            tryResolveNamedAsync : container.tryResolveNamedAsync.bind(container), 
            resolveWithDependencies : container.resolveWithDependencies.bind(container),
            resolveWithDependenciesAsync : container.resolveWithDependenciesAsync.bind(container),
            resolveWith : container.resolveWith.bind(container),
            createChild : container.createChild.bind(container),
            dispose: container.dispose.bind(container),
            disposeAsync : container.disposeAsync.bind(container)
        };
    }
}

function setDefaults(rego : Internal.IRegistrationBase | Internal.IConfigRegistration) {

    rego.scope = Defaults.Scope;
    rego.owner = Defaults.Owner;
}