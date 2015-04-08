/**
 * @file test
 * @author hushicai(bluthcy@gmail.com)
 */

/* eslint-env node */

var request = require('request');

var Q = require('q');
var chalk = require('chalk');

function test(options) {
    var url = options.url;
    var check = options.check;
    var deferred = Q.defer();

    console.log(chalk.cyan('request `%s` ...'), url);

    request.get(url, function (err, res) {
        if (err !== null) {
            console.log(chalk.red('request error!'));
            return deferred.reject();
        }

        var d = res.body;
        var r = check(d);
        var t = {};

        if (typeof r === 'boolean') {
            t.isValid = r;
            t.value = d;
        }
        else {
            t = r;
        }

        if (t.isValid) {
            return deferred.resolve(t.value);
        }
        return deferred.reject();
    });
    return deferred.promise;
}

function log(format) {
    var values = Array.prototype.slice.call(arguments, 1);
    console.log(chalk.cyan(format), values);
}

function defaultLogBefore(d) {
    log('expect `%s`.', d);
    return d;
}

function defaultLogAfter(d) {
    log('got `%s`.', d);
    return d;
}

module.exports = {
    php: function () {
        var expected = 'hushicai';
        defaultLogBefore(expected);
        return test({
            url: 'http://localhost:8848/test.php',
            check: function (d) {
                return d === expected;
            }
        }).then(defaultLogAfter);
    },
    addRequestHeader: function () {
        var expected = 'xresource';
        defaultLogBefore(expected);
        return test({
            url: 'http://localhost:8848/addRequestHeader.php',
            check: function (d) {
                return d === expected;
            }
        }).then(defaultLogAfter);
    },
    file: function () {},
    listDirectory: function () {
        var expected = 'Directory List';
        log('expect document title `%s`.', expected);
        return test({
            url: 'http://localhost:8848/listDirectory/',
            check: function (d) {
                var title;
                d.replace(/<title>(.+?)<\/title>/, function ($0, $1) {
                    title = $1;
                });
                return {
                    isValid: title === expected,
                    value: title
                };
            }
        }).then(function (d) {
            log('got document title `%s`.', d);
            return d;
        });
    }
};
