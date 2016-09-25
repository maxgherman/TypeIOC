/*---------------------------------------------------------------------------------------------------
 * Copyright (c) 2016 Maxim Gherman
 * typeioc - Dependency injection container for node typescript / javascript
 * @version v1.4.0
 * @link https://github.com/maxgherman/TypeIOC
 * @license MIT
 * --------------------------------------------------------------------------------------------------*/

require('reflect-metadata');
var Builder =  require('./lib/scaffold');
var types = require('./lib/types/index');
var exceptions = require('./lib/exceptions/index');

var scaffold = new Builder.Scaffold();

module.exports = {
    Types: types,
    Exceptions: exceptions,

    createBuilder: function() {
        return scaffold.createBuilder();
    },

    createDecorator: function() {
        return scaffold.createDecorator();
    }
};

