/**
 * @file test
 * @author hushicai(bluthcy@gmail.com)
 */

/* eslint-env node */

var request = require('request');

var Q = require('q');

module.exports = {
    php: function () {
        console.log('expect `/test.php` to response "hushicai".');
        var deferred = Q.defer();
        request.get('http://localhost:8848/test.php', function (err, res, body) {
            console.log('`/test.php` responsed "%s".', res.body);
            if (err !== null || res.body !== 'hushicai') {
                return deferred.reject();
            }
            return deferred.resolve();
        });

        return deferred.promise;
    },
    addRequestHeader: function () {
        console.log('expect `/addRequestHeader.php` to response "xresource".');
        var deferred = Q.defer();
        request.get('http://localhost:8848/addRequestHeader.php', function (err, res, body) {
            console.log('`/addRequestHeader.php` responsed "%s".', res.body);
            if (err !== null || res.body !== 'xresource') {
                return deferred.reject();
            }
            return deferred.resolve();
        });
        return deferred.promise;
    }
};
