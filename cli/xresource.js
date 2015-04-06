var fs = require('fs');
var path = require('path');

var cli = {};

cli.description = 'edp webserver getLocations 帮助工具';

cli.options = [
    "t"
];

cli.main = function (args, opts) {
    var name = args[0];

    if (!name) {
        return require('../lib/util').listAllResources();
    };

    var tpl = path.resolve(__dirname, '../tpl/' + name + '.md');

    if (!fs.existsSync(tpl)) {
        return console.log('no help info found for %s.', name);
    }
        
    // testing
    if (opts.t) {
        doTest(name);
    }
    else {
        doHelp(tpl);
    }
}

function doHelp(tpl) {
    var content = fs.readFileSync(tpl, {encoding: 'utf8'});
    require('../lib/util').output(content);
}


function doTest(name) {
    console.log('running test....');

    var dir = path.resolve(__dirname, '..', 'example');

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    var ws = require('edp-webserver');
    var config = ws.getDefaultConfig();

    var base = path.resolve(__dirname, '..', 'config');
    var loc = path.join(base, name);

    config.documentRoot = dir;
    config.getLocations = function () {
        return require(loc);
    };
    console.log('edp webserver locations: ');
    var c = fs.readFileSync(loc + '.js', {encoding: 'utf8'});
    c = c.replace(/module\.exports\s*=\s*/, '').replace(/^(\]);$/m, '$1');
    console.log(c);
    ws.start(config);
}

exports.cli = cli;