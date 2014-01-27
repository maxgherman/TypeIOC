'use strict';
var testData = require('./../test-data');
var scaffold = require('./../scaffold');

(function (Level3) {
    function defaultScopingHierarchy(test) {
        var containerBuilder = scaffold.createBuilder();
        containerBuilder.register(testData.Test1Base).as(function () {
            return new testData.Test4("test 4");
        });

        var container = containerBuilder.build();
        var test1 = container.resolve(testData.Test1Base);
        test1.Name = "test 1";
        var test2 = container.resolve(testData.Test1Base);

        test.notEqual(test1, null);
        test.strictEqual(test1.Name, "test 1");
        test.notEqual(test2, null);
        test.strictEqual(test2.Name, "test 4");

        test.done();
    }
    Level3.defaultScopingHierarchy = defaultScopingHierarchy;
    ;

    function noScopingReuse(test) {
        var containerBuilder = scaffold.createBuilder();
        containerBuilder.register(testData.Test1Base).as(function () {
            return new testData.Test4("test 4");
        }).within(1 /* None */);

        var container = containerBuilder.build();
        var test1 = container.resolve(testData.Test1Base);
        test1.Name = "test 1";
        var test2 = container.resolve(testData.Test1Base);

        test.notEqual(test1, null);
        test.strictEqual(test1.Name, "test 1");
        test.notEqual(test2, null);
        test.strictEqual(test2.Name, "test 4");

        test.done();
    }
    Level3.noScopingReuse = noScopingReuse;
    ;

    function containerScoping(test) {
        var containerBuilder = scaffold.createBuilder();
        containerBuilder.register(testData.Test1Base).as(function () {
            return new testData.Test4("test 4");
        }).within(2 /* Container */);

        var container = containerBuilder.build();
        var test1 = container.resolve(testData.Test1Base);
        test1.Name = "test 1";
        var test2 = container.resolve(testData.Test1Base);

        test.notEqual(test1, null);
        test.strictEqual(test1.Name, "test 1");
        test.notEqual(test2, null);
        test.strictEqual(test2.Name, "test 1");

        test.done();
    }
    Level3.containerScoping = containerScoping;
    ;
})(exports.Level3 || (exports.Level3 = {}));
var Level3 = exports.Level3;
//# sourceMappingURL=level3.js.map