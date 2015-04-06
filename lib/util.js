var fs = require('fs');
var path = require('path');

var util = {};

util.output = function (content) {
    process.stdout.write(content);
};

util.listAllResources = function () {
    var dir = path.resolve(__dirname, '..', '..', 'edp-webserver');

    if (fs.existsSync(dir)) {
        var resource = path.join(dir, 'lib', 'resource.js');
        resource = require(resource);
        var keys = Object.keys(resource);
        util.output(keys.join('\n'));
    }
    else {
        console.log('edp webserver not installed yet.');
    }
};

util.replaceLocations = function (config) {
    
};

module.exports = util;