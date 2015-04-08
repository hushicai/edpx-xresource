/**
 * @file cli
 * @author hushicai(bluthcy@gmail.com)
 */

/* eslint-env node  */

var fs = require('fs');
var path = require('path');

var cli = {};

cli.description = 'edp webserver getLocations 帮助工具';

cli.options = [
    't'
];

cli.main = function (args, opts) {
    var name = args[0];

    if (!name) {
        return require('../lib/util').listAllResources();
    }

    var tpl = path.resolve(__dirname, '../tpl/' + name + '.md');

    if (!fs.existsSync(tpl)) {
        return console.log('no help info found for %s.', name);
    }

    if (opts.t) {
        doTest(name);
    }
    else {
        doHelp(tpl);
    }
};

function doHelp(tpl) {
    var content = fs.readFileSync(tpl, {encoding: 'utf8'});
    require('../lib/util').output(content);
}

var chalk = require('chalk');

function doTest(name) {
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
    console.log(chalk.bold('edp webserver locations: '));
    var c = fs.readFileSync(loc + '.js', {encoding: 'utf8'});
    c = c
        .replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:\/\/(?:.*)$)/g, '')
        .replace(/module\.exports\s*=\s*/, '')
        .replace(/^(\]);$/m, '$1')
        .trim();
    console.log(chalk.italic(c));
    var server = ws.start(config);

    var testHandler = require('../lib/test')[name];

    if (testHandler) {
        console.log(chalk.cyan('running test....'));
        testHandler().then(testDone, testFail);
    }

    function testDone() {
        console.log(chalk.green('test success!'));
        server.close();
    }
    function testFail() {
        console.log(chalk.red('test fail!'));
        server.close();
    }
}

exports.cli = cli;
