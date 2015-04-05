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

        console.log(resource);
    }
    else {
        console.log('edp webserver not installed yet.');
    }
};

module.exports = util;