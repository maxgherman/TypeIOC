
'use strict';

exports.internal = {

    proxy : (function() {

        var Scaffold = require('../../scaffold');
        var ProxyModule = require('./../../../lib/interceptors/proxy');
        var mockery = Scaffold.Mockery;

        var proxy;

        return {

            setUp: function (callback) {

                proxy = new ProxyModule.Proxy();

                callback();
            },

            fromPrototype_should_throw_ArgumentNullError_when_null_parent : function(test) {

                var delegate = function() { proxy.fromPrototype(null, []); };

                test.throws(delegate, function(error) {
                    test.strictEqual('parent', error.argumentName);
                    return (error instanceof Scaffold.Exceptions.ArgumentNullError);
                });

                test.expect(2);

                test.done();
            },

            fromPrototype_should_throw_ArgumentNullError_when_undefined_parent : function(test) {

                var delegate = function() { proxy.fromPrototype(undefined, []); };

                test.throws(delegate, function(error) {
                    test.strictEqual('parent', error.argumentName);
                    return (error instanceof Scaffold.Exceptions.ArgumentNullError);
                });

                test.expect(2);

                test.done();
            },

            fromPrototype_should_construct_parent_instance : function(test) {

                var a1 = 0;
                var a2 = 0;

                function parent(arg1, arg2) {
                    this.arg1 = arg1;
                    this.arg2 = arg2;

                    a1 = this.arg1;
                    a2 = this.arg2;
                }

                var Proto = proxy.fromPrototype(parent);
                var instance = new Proto(1, 2);

                test.ok(Proto);
                test.ok(instance);
                test.strictEqual(a1, 1);
                test.strictEqual(a2, 2);

                test.done();
            },

            fromPrototype_should_proxy_prototype_method : function(test) {

                var stub = mockery.stub();

                function parent(arg1) {
                    this.arg1 = arg1;
                }

                parent.prototype.foo = function(){
                    stub();
                    return this.arg1;
                }

                var Proto = proxy.fromPrototype(parent);
                var instance = new Proto(1);

                test.strictEqual(1, instance.foo());
                test.ok(stub.calledOnce);

                test.done();
            },

            fromPrototype_should_proxy_inherited_prototype_method : function(test) {

                var stub = mockery.stub();

                var grandParent = { foo : function() {  stub();  return 1;} };

                function parent() { }
                parent.prototype = grandParent;

                var Proto = proxy.fromPrototype(parent);
                var instance = new Proto();

                test.strictEqual(1, instance.foo());
                test.ok(stub.calledOnce);

                test.done();
            },

            fromPrototype_should_proxy_static_method : function(test) {

                var stub = mockery.stub();

                function parent() { }
                parent.foo = function() { stub(); return 1; }

                var Proto = proxy.fromPrototype(parent);

                test.strictEqual(1, Proto.foo());
                test.ok(stub.calledOnce);

                test.done();
            },

            fromPrototype_should_proxy_prototype_field : function(test) {

                function parent() { }
                parent.prototype.foo = 1;
                parent.prototype.getFoo = function() { return this.foo; }


                var Proto = proxy.fromPrototype(parent);
                var instance = new Proto();

                test.strictEqual(1, instance.getFoo());
                test.strictEqual(1, instance.foo);
                instance.foo = 123;
                test.strictEqual(123, instance.foo);
                test.strictEqual(123, instance.getFoo());

                test.done();
            },

            fromPrototype_should_proxy_static_field : function(test) {

                function parent() { }
                parent.foo = 1;

                var Proto = proxy.fromPrototype(parent);

                test.strictEqual(1, Proto.foo);

                test.done();
            },

            fromPrototype_should_proxy_inherited_prototype_field : function(test) {

                var grandParent = { foo : 1 };

                function parent() { }
                parent.prototype = grandParent;

                var Proto = proxy.fromPrototype(parent);
                var instance = new Proto();

                test.strictEqual(1, instance.foo);

                test.done();
            },

            fromPrototype_should_proxy_prototype_getter : function(test) {

                var stub = mockery.stub();

                function parent() { }
                Object.defineProperty(parent.prototype, 'foo', {
                    get: function () {
                        stub();
                        return 1;
                    },
                    enumerable: true,
                    configurable: true
                });

                var Proto = proxy.fromPrototype(parent);
                var instance = new Proto();

                test.strictEqual(1, instance.foo);
                test.ok(stub.calledOnce);

                test.done();
            },

            fromPrototype_should_proxy_prototype_property : function(test) {

                var getStub = mockery.stub();
                var setStub = mockery.stub();

                function parent() {
                    this._innerValue = undefined;
                }

                Object.defineProperty(parent.prototype, 'foo', {
                    get : function() {
                        getStub()
                        return this._innerValue;
                    },
                    set: function (value) {
                        setStub();
                        return this._innerValue = 1 + value;
                    },
                    enumerable: true,
                    configurable: true
                });

                var Proto = proxy.fromPrototype(parent);
                var instance = new Proto();
                instance.foo = 3;

                test.strictEqual(4, instance.foo);
                test.ok(getStub.calledOnce);
                test.ok(setStub.calledOnce);

                test.done();
            },

            fromPrototype_should_proxy_static_getter : function(test) {

                var stub = mockery.stub();

                function parent() { }
                Object.defineProperty(parent, 'foo', {
                    get: function () {

                        stub();
                        return 1;
                    },
                    enumerable: true,
                    configurable: true
                });

                var Proto = proxy.fromPrototype(parent);

                test.strictEqual(1, Proto.foo);
                test.ok(stub.calledOnce);

                test.done();
            },

            fromPrototype_should_proxy_inherited_prototype_getter : function(test) {

                var stub = mockery.stub();

                var grandParent =  function() { this._innerField = 333; };
                Object.defineProperty(grandParent, 'foo', {
                    get: function () {
                        stub();
                        return this._innerField;
                    },
                    enumerable: true,
                    configurable: true
                });

                function parent() { this._innerField = 3; }
                parent.prototype = grandParent;

                var Proto = proxy.fromPrototype(parent);
                var instance = new Proto();

                test.strictEqual(3, instance.foo);
                test.ok(stub.calledOnce);

                test.done();
            },

            fromPrototype_should_proxy_inherited_prototype_property : function(test) {

                var getStub = mockery.stub();
                var setStub = mockery.stub();

                var grandParent =  function() { this._innerField = 333; };
                Object.defineProperty(grandParent, 'foo', {
                    get: function () {
                        getStub();
                        return this._innerField;
                    },
                    set: function(value) {
                        setStub();
                        this._innerField = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                function parent() { this._innerField = 0; }
                parent.prototype = grandParent;

                var Proto = proxy.fromPrototype(parent, []);
                var instance = new Proto();
                instance.foo = 3;

                test.strictEqual(3, instance.foo);
                test.ok(getStub.calledOnce);
                test.ok(setStub.calledOnce);

                test.done();
            },

            fromPrototype_should_proxy_static_property : function(test) {

                var getStub = mockery.stub();
                var setStub = mockery.stub();

                function parent() { }
                parent._innerField = 0;
                Object.defineProperty(parent, 'foo', {
                    get: function () {
                        getStub();
                        return parent._innerField;
                    },
                    set: function(value) {
                        setStub();
                        parent._innerField = value;
                    },
                    enumerable: true,
                    configurable: true
                });

                var Proto = proxy.fromPrototype(parent, []);
                Proto.foo = 123;

                test.strictEqual(123, Proto.foo);
                test.ok(getStub.calledOnce);
                test.ok(setStub.calledOnce);

                test.done();
            },

            fromPrototype_should_proxy_prototype_method_with_args : function(test) {

                var stub = mockery.stub();

                function parent(arg1) {
                    this.arg1 = arg1;
                }

                parent.prototype.foo = function(arg1, arg2){

                    stub();
                    return this.arg1 + arg1 + arg2;
                }

                var Proto = proxy.fromPrototype(parent, []);
                var instance = new Proto(1);

                test.strictEqual(6, instance.foo(2, 3));
                test.ok(stub.calledOnce);

                test.done();
            },

            fromPrototype_should_proxy_inherited_prototype_method_with_args : function(test) {

                var stub = mockery.stub();

                var grandParent = { foo : function(arg1, arg2) { stub();  return arg1 + arg2;} };

                function parent() { }
                parent.prototype = grandParent;

                var Proto = proxy.fromPrototype(parent, []);
                var instance = new Proto();

                test.strictEqual(3, instance.foo(1, 2));
                test.ok(stub.calledOnce);

                test.done();
            },

            fromPrototype_should_proxy_static_method_with_args : function(test) {

                var stub = mockery.stub();

                function parent() { }
                parent.foo = function(arg1, arg2) { stub(); return arg1 + arg2; }

                var Proto = proxy.fromPrototype(parent, []);

                test.strictEqual(3, Proto.foo(1, 2));
                test.ok(stub.calledOnce);

                test.done();
            }
        };
    })()
}