/// <reference path='../../d.ts/typeioc.addons.d.ts' />
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const scaffold = require("./../scaffold");
const scaffoldAddons = require("./../scaffoldAddons");
const testData = require("../data/test-data");
const TestDataDecorators = require("../data/decorators");
var Integration = TestDataDecorators.Integration;
const decorator = TestDataDecorators.decorator;
const Interceptors = scaffoldAddons.Interceptors;
let builder1;
let builder2;
let interceptor;
var Level19;
(function (Level19) {
    Level19.container_builder = {
        setUp: function (callback) {
            builder1 = scaffold.createBuilder();
            builder2 = scaffold.createBuilder();
            callback();
        },
        copy_copies_registrations(test) {
            builder1.register('testData.TestBase1').asType(testData.Test1);
            builder1.register(testData.Test1).asSelf();
            builder1.register(testData.Test2Base).as(() => 123);
            builder1.register('value').asValue('test - value');
            builder2.copy(builder1);
            const container = builder2.build();
            test.strictEqual(container.resolve('testData.TestBase1').Name, 'test 1');
            test.strictEqual(container.resolve(testData.Test1).Name, 'test 1');
            test.strictEqual(container.resolve(testData.Test2Base), 123);
            test.strictEqual(container.resolve('value'), 'test - value');
            test.done();
        },
        copy_keeps_source_registrations(test) {
            builder1.register('testData.TestBase1').asType(testData.Test1);
            builder1.register(testData.Test1).asSelf();
            builder1.register(testData.Test2Base).as(() => 123);
            builder1.register('value').asValue('test - value');
            builder2.copy(builder1);
            const container1 = builder1.build();
            const container2 = builder2.build();
            test.strictEqual(container1.resolve('testData.TestBase1').Name, 'test 1');
            test.strictEqual(container1.resolve(testData.Test1).Name, 'test 1');
            test.strictEqual(container1.resolve(testData.Test2Base), 123);
            test.strictEqual(container1.resolve('value'), 'test - value');
            test.strictEqual(container2.resolve('testData.TestBase1').Name, 'test 1');
            test.strictEqual(container2.resolve(testData.Test1).Name, 'test 1');
            test.strictEqual(container2.resolve(testData.Test2Base), 123);
            test.strictEqual(container2.resolve('value'), 'test - value');
            test.done();
        },
        copy_keeps_destination_registrations(test) {
            builder1.register('testData.TestBase1').asType(testData.Test1);
            builder1.register(testData.Test1).asSelf();
            builder2.register(testData.Test2Base).as(() => 123);
            builder2.register('value').asValue('test - value');
            builder2.copy(builder1);
            const container2 = builder2.build();
            test.strictEqual(container2.resolve('testData.TestBase1').Name, 'test 1');
            test.strictEqual(container2.resolve(testData.Test1).Name, 'test 1');
            test.strictEqual(container2.resolve(testData.Test2Base), 123);
            test.strictEqual(container2.resolve('value'), 'test - value');
            test.done();
        }
    };
    Level19.decorators = {
        setUp: function (callback) {
            builder1 = scaffold.createBuilder();
            callback();
        },
        resolve_basic_registration: (test) => {
            decorator.register(Integration.TestBase1).as(() => ({
                get name() {
                    return 'Dep name 1';
                }
            }));
            decorator.register(Integration.valueKey).asValue(1234567);
            decorator.register(Integration.valueKey1).asType(Integration.Test1);
            const container = decorator.build();
            const actual = container.resolve(Integration.TestBase);
            test.strictEqual(actual.name, 'test Dep name 1 1234567 test 1');
            test.done();
        },
        resove_with_import: (test) => {
            builder1.register(Integration.valueKey2).asValue(2);
            builder1.register(Integration.valueKey3).asValue(3);
            decorator.import(builder1);
            const container = decorator.build();
            const actual = container.resolve(Integration.Test2);
            test.strictEqual(actual.name, 'test 2 3');
            test.done();
        },
        resove_with_import_keeps_registrations: (test) => {
            let test1Copis = 0;
            let test2Copis = 0;
            class Test1 {
                constructor() {
                    test1Copis++;
                }
            }
            class Test2 {
                constructor() {
                    test2Copis++;
                }
            }
            builder1.register(Integration.valueKey2)
                .asType(Test1)
                .singleton();
            builder1.register(Integration.valueKey3)
                .asType(Test2)
                .singleton();
            decorator.import(builder1);
            const containerDecortor = decorator.build();
            const actualDecorator = containerDecortor.resolve(Integration.Test2);
            const containerBuilder = builder1.build();
            const actualBuilder1 = containerBuilder.resolve(Integration.valueKey2);
            const actualBuilder2 = containerBuilder.resolve(Integration.valueKey3);
            test.strictEqual(actualDecorator.name, 'test [object Object] [object Object]');
            test.strictEqual(test1Copis, 2);
            test.strictEqual(test2Copis, 2);
            test.done();
        },
        resolve_byvalue_function: (test) => {
            const container = decorator.build();
            const actual = container
                .resolve(TestDataDecorators.Resolve.ByValue.test11);
            test.strictEqual(actual.foo(), 'Test1 : decorator value func');
            test.done();
        }
    };
    Level19.life_cycle = {
        setUp: function (callback) {
            builder1 = scaffold.createBuilder();
            builder2 = scaffold.createBuilder();
            callback();
        },
        cached_resolutions_cleanup: (test) => {
            builder1.register('A')
                .as(() => ({ a: 'A' }));
            builder1.register('B')
                .as(() => ({ b: 'B' }));
            const container = builder1.build();
            container.resolveWith('A').cache('a').exec();
            container.resolveWith('B').cache('b').exec();
            const a = container.cache.a;
            const b = container.cache.b;
            container.dispose();
            test.strictEqual(a.a, 'A');
            test.strictEqual(b.b, 'B');
            test.strictEqual(container.cache.a, undefined);
            test.strictEqual(container.cache.b, undefined);
            test.done();
        }
    };
    Level19.interceptors = {
        setUp: function (callback) {
            interceptor = Interceptors.create();
            callback();
        },
        instance_method_recieves_original_object: (test) => {
            const math = interceptor.intercept(Math, [{
                    method: 'pow',
                    wrapper: (callInfo) => callInfo.next(callInfo.source.round(callInfo.source.PI) +
                        callInfo.args[0] +
                        callInfo.args[1])
                }, {
                    method: 'pow',
                    wrapper: (callInfo) => callInfo.source.round(callInfo.source.PI) +
                        callInfo.result
                }]);
            const actual = math.pow(2, 3);
            test.strictEqual(actual, 11);
            test.done();
        },
        instance_field_recieves_original_object: (test) => {
            let PI = 3.14;
            const MathClass = {
                PI: 3.14
            };
            const math = interceptor.intercept(MathClass, [{
                    method: 'PI',
                    type: Interceptors.CallInfoType.Field,
                    wrapper: function (callInfo) {
                        if (callInfo.get) {
                            return callInfo.next(callInfo.source.PI + PI);
                        }
                        if (callInfo.set) {
                            callInfo.next(callInfo.args[0] + 1);
                        }
                    }
                }, {
                    method: 'PI',
                    type: Interceptors.CallInfoType.Field,
                    wrapper: function (callInfo) {
                        if (callInfo.get) {
                            return callInfo.result + callInfo.source.PI + PI;
                        }
                        if (callInfo.set) {
                            PI = callInfo.result + callInfo.args[0] + 1;
                        }
                    }
                }]);
            test.strictEqual(math.PI, (MathClass.PI + PI) * 2);
            math.PI = 7;
            test.strictEqual(PI, 16);
            test.done();
        },
        instance_getter_recieves_original_object: (test) => {
            const subject = {
                get value() {
                    return 'value';
                }
            };
            const subjectIntercepted = interceptor.intercept(subject, [{
                    method: 'value',
                    wrapper: (callInfo) => {
                        return callInfo.next(`${callInfo.source.value} 1`);
                    }
                }, {
                    method: 'value',
                    wrapper: (callInfo) => {
                        return `${callInfo.result} ${callInfo.source.value} 2`;
                    }
                }]);
            test.strictEqual(subjectIntercepted.value, 'value 1 value 2');
            test.done();
        },
        instance_setter_recieves_original_object: (test) => {
            const subject = {
                value1: 3,
                value2: null,
                set value(value) {
                    this.value2 = value;
                }
            };
            const subjectIntercepted = interceptor.intercept(subject, [{
                    method: 'value',
                    wrapper: (callInfo) => {
                        callInfo.next(callInfo.args[0] + callInfo.source.value1);
                    }
                }, {
                    method: 'value',
                    wrapper: (callInfo) => {
                        callInfo.set(callInfo.result + callInfo.source.value1);
                    }
                }]);
            subjectIntercepted.value = 1;
            test.strictEqual(subjectIntercepted.value2, 7);
            test.done();
        },
        prototype_method_recieves_original_object: (test) => {
            class Test {
                get value() {
                    return 10;
                }
                test(a) {
                    return a + 1;
                }
            }
            const Intercepted = interceptor.intercept(Test, [{
                    method: 'test',
                    wrapper: (callInfo) => callInfo.next(callInfo.source.value +
                        callInfo.args[0])
                }, {
                    method: 'test',
                    wrapper: (callInfo) => callInfo.source.value +
                        callInfo.result
                }]);
            const instance = new Intercepted();
            const actual = instance.test(3);
            test.strictEqual(actual, 23);
            test.done();
        },
        instance_withSubstitute_intercepts: (test) => {
            const math = interceptor.withSubstitute({
                method: 'pow',
                wrapper: (callInfo) => {
                    return callInfo.next(callInfo.args[0] + callInfo.args[1]);
                }
            })
                .withSubstitute({
                method: 'pow',
                wrapper: (callInfo) => {
                    return callInfo.result + callInfo.args[0] + callInfo.args[1];
                }
            })
                .interceptInstance(Math);
            test.strictEqual(math.pow(2, 3), 10);
            test.done();
        },
        prototype_withSubstitute_intercepts: (test) => {
            class Proto {
                pow(a, b) {
                    return a - b;
                }
            }
            const ProtoI = interceptor.withSubstitute({
                method: 'pow',
                wrapper: (callInfo) => {
                    return callInfo.next(callInfo.args[0] + callInfo.args[1]);
                }
            })
                .withSubstitute({
                method: 'pow',
                wrapper: (callInfo) => {
                    return callInfo.result + callInfo.args[0] + callInfo.args[1];
                }
            })
                .interceptPrototype(Proto);
            const actual = new ProtoI();
            test.strictEqual(actual.pow(2, 3), 10);
            test.done();
        },
        intercept_withSubstitute_intercepts: (test) => {
            class Proto {
                pow(a, b) {
                    return a - b;
                }
            }
            const ProtoI = interceptor.withSubstitute({
                method: 'pow',
                wrapper: (callInfo) => {
                    return (callInfo.args[0] + callInfo.args[1]);
                }
            })
                .intercept(Proto);
            const math = interceptor.withSubstitute({
                method: 'pow',
                wrapper: (callInfo) => {
                    return (callInfo.args[0] + callInfo.args[1]);
                }
            })
                .intercept(Math);
            const protoI = new ProtoI();
            test.strictEqual(protoI.pow(2, 3), 5);
            test.strictEqual(math.pow(2, 3), 5);
            test.done();
        },
        intercept_mixed_chain: (test) => {
            const MathTest = {
                pow(a, b) {
                    return Math.pow(a, b);
                }
            };
            const math = interceptor.intercept(MathTest, [{
                    method: 'pow',
                    type: Interceptors.CallInfoType.Method,
                    wrapper: (callInfo) => {
                        return callInfo.next(callInfo.args[0] + callInfo.args[1]);
                    }
                }, {
                    method: 'pow',
                    wrapper: (callInfo) => {
                        return callInfo.next(`${callInfo.result} 1`);
                    }
                }, {
                    method: 'pow',
                    type: Interceptors.CallInfoType.Method,
                    wrapper: (callInfo) => {
                        return callInfo.next(`${callInfo.result} 2`);
                    }
                }, {
                    method: 'pow',
                    wrapper: (callInfo) => {
                        return `${callInfo.result} 3`;
                    }
                }]);
            test.strictEqual(math.pow(2, 3), '5 1 2 3');
            test.done();
        },
        intercept_throws_when_incompatible_types: (test) => {
            const subject = {
                field: 1
            };
            const delegate = () => {
                interceptor.intercept(subject, {
                    method: 'field',
                    type: 1,
                    wrapper: () => { }
                });
            };
            test.throws(delegate, function (err) {
                return (err instanceof scaffold.Exceptions.ProxyError) &&
                    /Could not match proxy type and property type. Expected one of: Any, Getter, Setter, GetterSetter, Field. Actual: Method/.test(err.message);
            });
            test.done();
        }
    };
})(Level19 = exports.Level19 || (exports.Level19 = {}));
//# sourceMappingURL=level19.js.map