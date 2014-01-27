'use strict';
var testData = require('./../test-data');
var scaffold = require('./../scaffold');

(function (Level5) {
    function containerOwnedInstancesAreDisposed(test) {
        var containerBuilder = scaffold.createBuilder();

        containerBuilder.register(testData.Test1Base).as(function () {
            return new testData.Test5();
        }).dispose(function (item) {
            item.Dispose();
        }).within(1 /* None */).ownedBy(1 /* Container */);

        var container = containerBuilder.build();

        var test1 = container.resolve(testData.Test1Base);

        container.dispose();

        test.notEqual(test1, null);
        test.strictEqual(test1.Disposed, true);

        test.done();
    }
    Level5.containerOwnedInstancesAreDisposed = containerOwnedInstancesAreDisposed;
    ;

    function containerOwnedAndContainerReusedInstancesAreDisposed(test) {
        var containerBuilder = scaffold.createBuilder();

        containerBuilder.register(testData.Test1Base).as(function () {
            return new testData.Test5();
        }).dispose(function (item) {
            item.Dispose();
        }).within(2 /* Container */).ownedBy(1 /* Container */);

        var container = containerBuilder.build();

        var test1 = container.resolve(testData.Test1Base);

        container.dispose();

        test.notEqual(test1, null);
        test.strictEqual(test1.Disposed, true);

        test.done();
    }
    Level5.containerOwnedAndContainerReusedInstancesAreDisposed = containerOwnedAndContainerReusedInstancesAreDisposed;
    ;

    function containerOwnedAndHierarchyReusedInstancesAreDisposed(test) {
        var containerBuilder = scaffold.createBuilder();

        containerBuilder.register(testData.Test1Base).as(function () {
            return new testData.Test5();
        }).dispose(function (item) {
            item.Dispose();
        }).within(3 /* Hierarchy */).ownedBy(1 /* Container */);

        var container = containerBuilder.build();

        var test1 = container.resolve(testData.Test1Base);

        container.dispose();

        test.notEqual(test1, null);
        test.strictEqual(test1.Disposed, true);

        test.done();
    }
    Level5.containerOwnedAndHierarchyReusedInstancesAreDisposed = containerOwnedAndHierarchyReusedInstancesAreDisposed;
    ;

    function childContainerInstanceWithParentRegistrationIsNotDisposed(test) {
        var containerBuilder = scaffold.createBuilder();

        containerBuilder.register(testData.Test1Base).as(function () {
            return new testData.Test5();
        }).within(3 /* Hierarchy */).ownedBy(1 /* Container */);

        var container = containerBuilder.build();
        var child = container.createChild();

        var test1 = child.resolve(testData.Test1Base);

        child.dispose();

        test.notEqual(test1, null);
        test.strictEqual(test1.Disposed, false);

        test.done();
    }
    Level5.childContainerInstanceWithParentRegistrationIsNotDisposed = childContainerInstanceWithParentRegistrationIsNotDisposed;
    ;

    function disposingParentContainerDisposesChildContainerInstances(test) {
        var containerBuilder = scaffold.createBuilder();

        containerBuilder.register(testData.Test1Base).as(function () {
            return new testData.Test5();
        }).dispose(function (item) {
            item.Dispose();
        }).within(1 /* None */).ownedBy(1 /* Container */);

        var container = containerBuilder.build();
        var child = container.createChild();

        var test1 = child.resolve(testData.Test1Base);

        container.dispose();

        test.notEqual(test1, null);
        test.strictEqual(test1.Disposed, true);

        test.done();
    }
    Level5.disposingParentContainerDisposesChildContainerInstances = disposingParentContainerDisposesChildContainerInstances;

    function disposingContainerDoesNotDisposeExternalOwnedInstances(test) {
        var containerBuilder = scaffold.createBuilder();

        containerBuilder.register(testData.Test1Base).as(function () {
            return new testData.Test5();
        }).within(3 /* Hierarchy */).ownedBy(2 /* Externals */);

        var container = containerBuilder.build();
        var child = container.createChild();

        var test1 = child.resolve(testData.Test1Base);

        container.dispose();

        test.notEqual(test1, null);
        test.strictEqual(test1.Disposed, false);

        test.done();
    }
    Level5.disposingContainerDoesNotDisposeExternalOwnedInstances = disposingContainerDoesNotDisposeExternalOwnedInstances;

    function serviceEntryProperlyCloned(test) {
        var initializer = function (c, item) {
        };

        var serviceEntry = new scaffold.RegistrationBase.RegistrationBase(function () {
            return new testData.Test5();
        });
        serviceEntry.initializer = initializer;
        serviceEntry.scope = 3 /* Hierarchy */;

        var containerBuilder = scaffold.createBuilder();
        var container = containerBuilder.build();

        var actual = serviceEntry.cloneFor(container);

        test.strictEqual(actual.factory, serviceEntry.factory);
        test.strictEqual(actual.scope, serviceEntry.scope);
        test.strictEqual(actual.scope, 3 /* Hierarchy */);
        test.strictEqual(actual.container, container);
        test.strictEqual(actual.initializer, initializer);

        test.done();
    }
    Level5.serviceEntryProperlyCloned = serviceEntryProperlyCloned;
    ;

    function initializeIsCalledWhenInstanceIsCreated(test) {
        var className = "item";

        var initializer = function (c, item) {
            item.initialize(className);
        };

        var containerBuilder = scaffold.createBuilder();
        containerBuilder.register(testData.Initializable).as(function () {
            return new testData.Initializable2();
        }).initializeBy(initializer);

        var container = containerBuilder.build();

        var i1 = container.resolve(testData.Initializable);
        var i2 = container.resolve(testData.Initializable);

        test.deepEqual(i1, i2);
        test.deepEqual(i1.name, i2.name);
        test.deepEqual(i1.name, className);

        test.done();
    }
    Level5.initializeIsCalledWhenInstanceIsCreated = initializeIsCalledWhenInstanceIsCreated;

    function initializeAndResolveDependencies(test) {
        var className = "item";

        var initializer = function (c, item) {
            item.initialize(className);
            item.test6 = c.resolve(testData.Test6);
        };

        var containerBuilder = scaffold.createBuilder();
        containerBuilder.register(testData.Test6).as(function (c) {
            return new testData.Test6();
        });
        containerBuilder.register(testData.Initializable).as(function (c) {
            return new testData.Initializable();
        }).initializeBy(initializer);

        var container = containerBuilder.build();

        var i1 = container.resolve(testData.Initializable);

        test.notEqual(i1, null);
        test.notEqual(i1, undefined);
        test.deepEqual(i1.name, className);
        test.notEqual(i1.test6, null);

        test.done();
    }
    Level5.initializeAndResolveDependencies = initializeAndResolveDependencies;
})(exports.Level5 || (exports.Level5 = {}));
var Level5 = exports.Level5;
//# sourceMappingURL=level5.js.map