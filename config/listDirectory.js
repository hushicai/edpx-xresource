/**
 * @file listDirectory
 * @author hushicai(bluthcy@gmail.com)
 */

/* eslint-env node */

/* global listDirectory */

module.exports = [
    {
        location: /^.*$/,
        handler: [
            listDirectory()
        ]
    }
];
