
'use strict';

const path = require('path');

function formatPath(p) {
    if (p && typeof p === 'string') {
        // mac   /
        // window \
        if (path.sep === '/') {
            return p;
        } else {
            return p.replace(/\\/g, '/');
        }
    }
    return p;
}

module.exports = {
    formatPath,
}