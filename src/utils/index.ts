/*---------------------------------------------------------------------------------------------------
 * Copyright (c) 2017 Maxim Gherman
 * typeioc - Dependency injection container for node typescript / javascript
 * @version v2.1.1
 * @link https://github.com/maxgherman/TypeIOC
 * @license MIT
 * --------------------------------------------------------------------------------------------------*/

'use strict';

import { ArgumentNullError } from '../exceptions';
import * as ReflectionModule from './reflection';
import ImmutableArray from './immutableArray';

export var Reflection = ReflectionModule;

export function concat(array : any[], tailArray : any[]) : any[] {

    array.push.apply(array, tailArray);

    return array;
}

export function checkNullArgument(value : any, argument: string,  message?: string) {
    if((value != '') && !value) {
        var exception = new ArgumentNullError(argument, message);
        exception.data = value;
        throw exception;
    }
}

export function createImmutable(array : Array<any>) : Typeioc.Internal.IImmutableArray {
    return new ImmutableArray(array);
}