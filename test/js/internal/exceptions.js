'use strict';

exports.internal = {

    exceptions: (function () {

        const Scaffold = require('../scaffold');
        const Exceptions = Scaffold.Exceptions;
        const BaseError = Scaffold.BaseError;

        return {

            all_exceptions_loaded: function(test) {

                test.ok(Exceptions.ApplicationError);
                test.ok(Exceptions.ArgumentError);
                test.ok(Exceptions.ArgumentNullError);
                test.ok(Exceptions.ResolutionError);
                test.ok(Exceptions.StorageKeyNotFoundError);
                test.ok(Exceptions.ProxyError);
                test.ok(Exceptions.DecoratorError);

                test.done();
            },

            baseError_persists_message: function(test) {

                var expected = "the message";

                var baseError = new BaseError(expected);

                test.strictEqual(expected, baseError.message);

                test.done();
            },

            baseError_persists_name: function(test) {

                var expected = "the name";

                var baseError = new BaseError();
                baseError.name = expected;

                test.strictEqual(expected, baseError.name);

                test.done();
            },

            baseError_has_stack: function(test) {

                var baseError = new BaseError();

                var stack = baseError.stack;
                test.ok(stack);

                test.done();
            },

            applicationError_derives_BaseError: function(test) {

                var baseError = new Exceptions.ApplicationError();
                baseError.data = 'test'

                test.ok(baseError instanceof BaseError);

                test.done();
            },

            applicationError_has_default_name_as_ApplicationError: function(test) {

                var baseError = new Exceptions.ApplicationError();

                test.strictEqual(baseError.name, "ApplicationError");

                test.done();
            },

            argumentNullError_has_default_name_as_ArgumentNullError: function(test) {

                var baseError = new Exceptions.ArgumentNullError();

                test.strictEqual(baseError.name, "ArgumentNullError");

                test.done();
            },

            argumentNullError_derives_ApplicationError: function(test) {

                var baseError = new Exceptions.ArgumentNullError();

                test.ok(baseError instanceof Exceptions.ApplicationError);

                test.done();
            },

            resolutionError_has_default_name_as_ResolutionError: function(test) {

                var baseError = new Exceptions.ResolutionError();

                test.strictEqual(baseError.name, "ResolutionError");

                test.done();
            },

            resolutionError_derives_ApplicationError: function(test) {

                var baseError = new Exceptions.ResolutionError();

                test.ok(baseError instanceof Exceptions.ApplicationError);

                test.done();
            },

            storageKeyNotFoundError_has_default_name_as_StorageKeyNotFoundError: function(test) {

                var baseError = new Exceptions.StorageKeyNotFoundError();

                test.strictEqual(baseError.name, "StorageKeyNotFound");

                test.done();
            },

            StorageKeyNotFoundError_derives_ApplicationError: function(test) {

                var baseError = new Exceptions.StorageKeyNotFoundError();

                test.ok(baseError instanceof Exceptions.ApplicationError);

                test.done();
            }
        }

    })()
}