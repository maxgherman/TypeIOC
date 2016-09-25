/*---------------------------------------------------------------------------------------------------
 * Copyright (c) 2016 Maxim Gherman
 * typeioc - Dependency injection container for node typescript / javascript
 * @version v1.4.0
 * @link https://github.com/maxgherman/TypeIOC
 * @license MIT
 * --------------------------------------------------------------------------------------------------*/

///<reference path='../d.ts/typeioc.internal.d.ts' />
///<reference path='../d.ts/typeioc.addons.d.ts' />

'use strict';

import { Decorator } from './interceptors/decorator';
import { Proxy } from './interceptors/proxy';
import { Interceptor } from './interceptors/interceptor';

export class ScaffoldAddons {

    public interceptor() : Addons.Interceptors.IInterceptor {

        var decorator = new Decorator();
        var proxy = new Proxy(decorator);

        return new Interceptor(proxy);
    }
}