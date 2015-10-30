/// <reference path='../../d.ts/typeioc.d.ts' />
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var scaffold = require('./../scaffold');
var decorator = scaffold.getDecorator();
var Registration;
(function (Registration) {
    var TestBase = (function () {
        function TestBase() {
        }
        TestBase.prototype.foo = function () {
        };
        return TestBase;
    })();
    Registration.TestBase = TestBase;
    var Test = (function (_super) {
        __extends(Test, _super);
        function Test() {
            _super.apply(this, arguments);
        }
        Test.prototype.foo = function () {
            return 'Test : foo';
        };
        Test = __decorate([
            decorator.register(Registration.TestBase)
        ], Test);
        return Test;
    })(TestBase);
    Registration.Test = Test;
    var Test2 = (function () {
        function Test2(_arg1, _arg2) {
            this._arg1 = _arg1;
            this._arg2 = _arg2;
        }
        Test2.prototype.foo = function () {
            return 'Test : foo';
        };
        Test2 = __decorate([
            __param(0, decorator.resolve())
        ], Test2);
        return Test2;
    })();
    Registration.Test2 = Test2;
})(Registration = exports.Registration || (exports.Registration = {}));
//export module InitializeBy {
//
//    export class TestBase {
//        public foo() {
//        }
//    }
//
//    @decorator.register<InitializeBy.TestBase>(InitializeBy.TestBase, { initializeBy : (_, item : Test2) => item.text = ' test' })
//    export class Test2 extends TestBase {
//
//        public text : string = null;
//
//        public foo() {
//            return 'Test : foo' + (this.text || '');
//        }
//    }
//}
//
//export module Scope {
//
//    export class TestBase {
//        public foo() {
//        }
//    }
//
//    @decorator.register<Scope.TestBase>(Scope.TestBase, { within : Typeioc.Types.Scope.Hierarchy })
//    export class Test extends TestBase {
//
//        public text : string = ' test';
//
//        public foo() {
//            return 'Test : foo' + (this.text || '');
//        }
//    }
//
//    export class TestBase2 {
//
//        public foo() {
//        }
//    }
//
//    @decorator.register<Scope.TestBase2>(Scope.TestBase2, { within : Typeioc.Types.Scope.Container })
//    export class Test2 extends TestBase2 {
//
//        public text : string = ' test';
//
//        public foo() {
//            return 'Test : foo' + (this.text || '');
//        }
//    }
//}
//
//export module Owner {
//    export class TestBase1 {
//        public foo() {
//        }
//
//        public dispose() {}
//    }
//
//    @decorator.register<TestBase1>(TestBase1, {
//        ownedBy: Typeioc.Types.Owner.Container,
//        dispose: ((item:Test) => { item.dispose(); })
//    })
//    export class Test extends TestBase1 {
//
//        public text : string = ' test';
//
//        public foo() {
//            return 'Test : foo' + (this.text || '');
//        }
//
//        public dispose() {
//            this.text = 'disposed';
//        }
//    }
//
//
//    export class TestBase2 {
//        public foo() {
//        }
//
//        public dispose() {}
//    }
//
//    @decorator.register<TestBase2>(TestBase2, {
//        ownedBy : Typeioc.Types.Owner.Externals,
//        dispose : ((item: TestBase2) => { item.dispose(); })
//    })
//    export class Test2 extends TestBase2 {
//
//        public text : string = ' test';
//
//        public foo() {
//            return 'Test : foo' + (this.text || '');
//        }
//
//        public dispose() {
//            this.text = 'disposed';
//        }
//    }
//}
//
//export module Named {
//
//    export class TestBase {
//        public foo() {
//        }
//    }
//
//    @decorator.register<Named.TestBase>(Named.TestBase, { named : 'Some name' })
//    export class Test extends TestBase {
//
//        public static text : string = ' test';
//
//        public foo() {
//            return 'Test : foo' + (Test.text || '');
//        }
//    }
//
//    @decorator.register<Named.TestBase>(Named.TestBase, { named : 'Some name 2' })
//    export class Test2 extends TestBase {
//
//        public static text : string = ' test';
//
//        public foo() {
//            return 'Test2 : foo' + (Test2.text || '');
//        }
//    }
//} 
//# sourceMappingURL=decorators.js.map