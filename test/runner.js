///<reference path='../d.ts/node.d.ts' />
var path = require('path');

try  {
    var reporter = require('nodeunit').reporters.default;
} catch (e) {
    console.log("Cannot find nodeunit module.");
    process.exit();
}

var testPath = path.join(__dirname, 'js');

process.chdir(testPath);
reporter.run([
    'level1.js',
    'level2.js',
    'level3.js',
    'level4.js',
    'level5.js',
    'level6.js',
    'level7.js',
    'level8.js']);
//# sourceMappingURL=runner.js.map
