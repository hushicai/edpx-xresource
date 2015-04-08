/**
 * @file addRequestHeader
 * @author hushicai(bluthcy@gmail.com)
 */

/* eslint-env node */
/* global addRequestHeader, php  */

module.exports = [
    {
        location: /\.php($|\?)/,
        handler: [
            addRequestHeader({'X-By': 'xresource'}),
            php()
        ]
    }
];
