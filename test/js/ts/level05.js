'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const scaffold = require("./../scaffold");
const TestData = require("../data/test-data");
var Level5;
(function (Level5) {
    var containerBuilder;
    function setUp(callback) {
        containerBuilder = scaffold.createBuilder();
        callback();
    }
    Level5.setUp = setUp;
    function containerOwnedInstancesAreDisposed(test) {
        containerBuilder.register(TestData.Test1Base)
            .as(() => new TestData.Test5())
            .dispose((item) => { item.Dispose(); })
            .within(1 /* None */)
            .ownedBy(1 /* Container */);
        var container = containerBuilder.build();
        var test1 = container.resolve(TestData.Test1Base);
        container.dispose();
        test.notEqual(test1, null);
        test.strictEqual(test1.Disposed, true);
        test.done();
    }
    Level5.containerOwnedInstancesAreDisposed = containerOwnedInstancesAreDisposed;
    function internallyOwnedInstancesAreDisposed(test) {
        containerBuilder.register(TestData.Test1Base)
            .as(() => new TestData.Test5())
            .dispose((item) => { item.Dispose(); })
            .within(1 /* None */)
            .ownedInternally();
        const container = containerBuilder.build();
        const test1 = container.resolve(TestData.Test1Base);
        container.dispose();
        test.notEqual(test1, null);
        test.strictEqual(test1.Disposed, true);
        test.done();
    }
    Level5.internallyOwnedInstancesAreDisposed = internallyOwnedInstancesAreDisposed;
    function containerOwnedInstancesAreDisposedDefaultSetting(test) {
        scaffold.Types.Defaults.owner = scaffold.Types.Owner.Container;
        containerBuilder.register(TestData.Test1Base)
            .as(() => new TestData.Test5())
            .dispose((item) => item.Dispose());
        var container = containerBuilder.build();
        var test1 = container.resolve(TestData.Test1Base);
        container.dispose();
        test.notEqual(test1, null);
        test.strictEqual(test1.Disposed, true);
        test.done();
    }
    Level5.containerOwnedInstancesAreDisposedDefaultSetting = containerOwnedInstancesAreDisposedDefaultSetting;
    function containerOwnedAndContainerReusedInstancesAreDisposed(test) {
        containerBuilder.register(TestData.Test1Base)
            .as(() => new TestData.Test5())
            .dispose((item) => { item.Dispose(); })
            .within(2 /* Container */)
            .ownedBy(1 /* Container */);
        var container = containerBuilder.build();
        var test1 = container.resolve(TestData.Test1Base);
        container.dispose();
        test.notEqual(test1, null);
        test.strictEqual(test1.Disposed, true);
        test.done();
    }
    Level5.containerOwnedAndContainerReusedInstancesAreDisposed = containerOwnedAndContainerReusedInstancesAreDisposed;
    function containerOwnedAndHierarchyReusedInstancesAreDisposed(test) {
        containerBuilder.register(TestData.Test1Base)
            .as(() => new TestData.Test5())
            .dispose((item) => { item.Dispose(); })
            .within(3 /* Hierarchy */)
            .ownedBy(1 /* Container */);
        var container = containerBuilder.build();
        var test1 = container.resolve(TestData.Test1Base);
        container.dispose();
        test.notEqual(test1, null);
        test.strictEqual(test1.Disposed, true);
        test.done();
    }
    Level5.containerOwnedAndHierarchyReusedInstancesAreDisposed = containerOwnedAndHierarchyReusedInstancesAreDisposed;
    function childContainerInstanceWithParentRegistrationIsNotDisposed(test) {
        containerBuilder.register(TestData.Test1Base)
            .as(() => new TestData.Test5())
            .within(3 /* Hierarchy */)
            .ownedBy(1 /* Container */);
        var container = containerBuilder.build();
        var child = container.createChild();
        var test1 = child.resolve(TestData.Test1Base);
        child.dispose();
        test.notEqual(test1, null);
        test.strictEqual(test1.Disposed, false);
        test.done();
    }
    Level5.childContainerInstanceWithParentRegistrationIsNotDisposed = childContainerInstanceWithParentRegistrationIsNotDisposed;
    function disposingParentContainerDisposesChildContainerInstances(test) {
        containerBuilder.register(TestData.Test1Base)
            .as(() => new TestData.Test5())
            .dispose((item) => { item.Dispose(); })
            .within(1 /* None */)
            .ownedBy(1 /* Container */);
        var container = containerBuilder.build();
        var child = container.createChild();
        var test1 = child.resolve(TestData.Test1Base);
        container.dispose();
        test.notEqual(test1, null);
        test.strictEqual(test1.Disposed, true);
        test.done();
    }
    Level5.disposingParentContainerDisposesChildContainerInstances = disposingParentContainerDisposesChildContainerInstances;
    function disposingContainerDoesNotDisposeExternalOwnedInstances(test) {
        containerBuilder.register(TestData.Test1Base).as(() => new TestData.Test5()).
            within(3 /* Hierarchy */).
            ownedBy(2 /* Externals */);
        var container = containerBuilder.build();
        var child = container.createChild();
        var test1 = child.resolve(TestData.Test1Base);
        container.dispose();
        test.notEqual(test1, null);
        test.strictEqual(test1.Disposed, false);
        test.done();
    }
    Level5.disposingContainerDoesNotDisposeExternalOwnedInstances = disposingContainerDoesNotDisposeExternalOwnedInstances;
    function disposingContainerDoesNotDisposeExternallyOwnedInstances(test) {
        containerBuilder.register(TestData.Test1Base)
            .as(() => new TestData.Test5())
            .within(3 /* Hierarchy */)
            .ownedExternally();
        const container = containerBuilder.build();
        const child = container.createChild();
        const test1 = child.resolve(TestData.Test1Base);
        container.dispose();
        test.notEqual(test1, null);
        test.strictEqual(test1.Disposed, false);
        test.done();
    }
    Level5.disposingContainerDoesNotDisposeExternallyOwnedInstances = disposingContainerDoesNotDisposeExternallyOwnedInstances;
    function disposingContainerRemovesAllRegistrations(test) {
        containerBuilder.register(TestData.Test1Base)
            .as(() => new TestData.Test1())
            .named('A');
        containerBuilder.register(TestData.Test1Base)
            .as(() => new TestData.Test5())
            .within(scaffold.Types.Scope.Hierarchy)
            .ownedInternally();
        const container = containerBuilder.build();
        const first = container.resolveNamed(TestData.Test1Base, 'A');
        const second = container.resolve(TestData.Test1Base);
        container.dispose();
        const first2 = container.tryResolveNamed(TestData.Test1Base, 'A');
        const second2 = container.tryResolve(TestData.Test1Base);
        const delegate1 = () => container.resolveNamed(TestData.Test1Base, 'A');
        const delegate2 = () => container.resolve(TestData.Test1Base);
        test.ok(first);
        test.ok(second);
        test.strictEqual(first2, null);
        test.strictEqual(second2, null);
        test.throws(delegate1, function (err) {
            return (err instanceof scaffold.Exceptions.ResolutionError);
        });
        test.throws(delegate2, function (err) {
            return (err instanceof scaffold.Exceptions.ResolutionError);
        });
        test.done();
    }
    Level5.disposingContainerRemovesAllRegistrations = disposingContainerRemovesAllRegistrations;
    function disposingContainerRemovesAllChildRegistrations(test) {
        containerBuilder.register(TestData.Test1Base)
            .as(() => new TestData.Test5())
            .within(2 /* Container */)
            .ownedInternally();
        const container = containerBuilder.build();
        const child = container.createChild();
        const first = child.resolve(TestData.Test1Base);
        container.dispose();
        const delegate1 = () => child.resolve(TestData.Test1Base);
        test.ok(first);
        test.throws(delegate1, function (err) {
            return (err instanceof scaffold.Exceptions.ResolutionError);
        });
        test.done();
    }
    Level5.disposingContainerRemovesAllChildRegistrations = disposingContainerRemovesAllChildRegistrations;
    function initializeIsCalledWhenInstanceIsCreated(test) {
        var className = "item";
        containerBuilder.register(TestData.Initializable)
            .as(() => new TestData.Initializable2()).
            initializeBy((c, item) => { item.initialize(className); return item; });
        var container = containerBuilder.build();
        var i1 = container.resolve(TestData.Initializable);
        var i2 = container.resolve(TestData.Initializable);
        test.deepEqual(i1, i2);
        test.deepEqual(i1.name, i2.name);
        test.deepEqual(i1.name, className);
        test.done();
    }
    Level5.initializeIsCalledWhenInstanceIsCreated = initializeIsCalledWhenInstanceIsCreated;
    function initializeAndResolveDependencies(test) {
        var className = "item";
        var initializer = (c, item) => {
            item.initialize(className);
            item.test6 = c.resolve(TestData.Test6);
            return item;
        };
        containerBuilder.register(TestData.Test6).as((c) => new TestData.Test6());
        containerBuilder.register(TestData.Initializable).as((c) => new TestData.Initializable()).
            initializeBy(initializer);
        var container = containerBuilder.build();
        var i1 = container.resolve(TestData.Initializable);
        test.notEqual(i1, null);
        test.notEqual(i1, undefined);
        test.deepEqual(i1.name, className);
        test.notEqual(i1.test6, null);
        test.done();
    }
    Level5.initializeAndResolveDependencies = initializeAndResolveDependencies;
    function instancesFromDifferentContainersDisposedIndependently(test) {
        var secondContainerBuilder = scaffold.createBuilder();
        containerBuilder.register(TestData.Test1Base)
            .as(() => new TestData.Test5())
            .dispose((item) => item.Dispose())
            .within(1 /* None */)
            .ownedBy(1 /* Container */);
        secondContainerBuilder.register(TestData.Test1Base)
            .as(() => new TestData.Test5())
            .dispose((item) => { item.Dispose(); })
            .within(1 /* None */)
            .ownedBy(1 /* Container */);
        var container = containerBuilder.build();
        var secondContainer = secondContainerBuilder.build();
        var test1 = container.resolve(TestData.Test1Base);
        var test2 = secondContainer.resolve(TestData.Test1Base);
        test.strictEqual(test1.Disposed, false);
        test.strictEqual(test2.Disposed, false);
        container.dispose();
        test.strictEqual(test1.Disposed, true);
        test.strictEqual(test2.Disposed, false);
        secondContainer.dispose();
        test.strictEqual(test1.Disposed, true);
        test.strictEqual(test2.Disposed, true);
        test.done();
    }
    Level5.instancesFromDifferentContainersDisposedIndependently = instancesFromDifferentContainersDisposedIndependently;
})(Level5 = exports.Level5 || (exports.Level5 = {}));
//# sourceMappingURL=level05.js.map