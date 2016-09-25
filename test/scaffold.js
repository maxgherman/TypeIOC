/// <reference path='../d.ts/node.d.ts' />
/// <reference path='../d.ts/typeioc.d.ts' />
'use strict';
var typeioc = require('../');
var ConfigModule = require('./data/config');
var ConfigProvider = ConfigModule.Config;
var BError = require('../lib/exceptions/baseError').default;
exports.Exceptions = typeioc.Exceptions;
exports.Types = typeioc.Types;
exports.RegistrationBase = require('../lib/registration/base/registrationBase');
exports.BaseError = BError;
exports.TestModule = require('./data/test-data');
exports.TestModule2 = require('./data/test-data2');
exports.TestModuleInterceptors = require('./data/test-data-intercept');
ConfigProvider.TestModule = exports.TestModule;
ConfigProvider.TestModule2 = exports.TestModule2;
exports.Config = ConfigProvider;
exports.Utils = require('../lib/utils/index');
exports.Mockery = require('sinon');
function createBuilder() {
    return typeioc.createBuilder();
}
exports.createBuilder = createBuilder;
function createDecorator() {
    return typeioc.createDecorator();
}
exports.createDecorator = createDecorator;
//# sourceMappingURL=scaffold.js.map