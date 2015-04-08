/**
 * @file listDirectory
 * @author hushicai(bluthcy@gmail.com)
 */

/* global file */

module.exports = [
    {
        location: /^.*$/,
        handler: [
            file()
        ]
    }
];
