/**
 * @file test
 * @author hushicai(bluthcy@gmail.com)
 */

/* eslint-env node */

var request = require('request');

var Q = require('q');
var chalk = require('chalk');

function test(url, expected) {
    var deferred = Q.defer();
    console.log(chalk.cyan('request `%s` ...'), url);
    console.log(chalk.cyan('expect to response `%s`.'), expected);
    request.get(url, function (err, res) {
        if (err !== null) {
            console.log(chalk.red('request error!'));
            return deferred.reject();
        }
        console.log(chalk.cyan('responsed `%s`.'), res.body);
        if (res.body !== expected) {
            console.log(chalk.yed('expected `hushicai`, but responsed `%s`.', res.body));
            return deferred.reject();
        }
        return deferred.resolve(res.body);
    });
    return deferred.promise;
}

module.exports = {
    php: function () {
        return test('http://localhost:8848/test.php', 'hushicai');
    },
    addRequestHeader: function () {
        return test('http://localhost:8848/addRequestHeader.php', 'xresource');
    }
};
