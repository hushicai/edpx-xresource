/**
 * @file util
 * @author hushicai(bluthcy@gmail.com)
 */


/* eslint-env node */

var fs = require('fs');
var path = require('path');

var util = {};

var chalk = require('chalk');

util.output = function (content) {
    console.log(content);
    // process.stdout.write(content);
};

util.listAllResources = function () {
    var dir = path.resolve(__dirname, '..', '..', 'edp-webserver');

    var exclude = [
        // edp webserver默认会在handlers最后增加一个write handler
        // 所以这个resource handler开发者一般不需要调用
        'write'
    ];

    if (fs.existsSync(dir)) {
        var resource = path.join(dir, 'lib', 'resource.js');
        resource = require(resource);
        var keys = Object.keys(resource).filter(function (r) {
            return exclude.indexOf(r)  === -1;
        });
        var content = keys.join('\n').replace(/^(\w)/gm, '  $1');
        util.output(chalk.yellow(content));
    }
    else {
        console.log('edp webserver not installed yet.');
    }
};

module.exports = util;
