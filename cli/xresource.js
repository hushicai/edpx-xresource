var fs = require('fs');
var path = require('path');

var cli = {};

cli.description = 'edp webserver getLocations 帮助工具';

cli.main = function (args, opts) {
    var name = args[0];

    if (!name) {
        return require('../lib/util').listAllResources();
    };

    var tpl = path.resolve(__dirname, '../tpl/' + name + '.md');

    if (fs.existsSync(tpl)) {
        var content = fs.readFileSync(tpl, {encoding: 'utf8'});
        require('../lib/util').output(content);
    }
}

exports.cli = cli;