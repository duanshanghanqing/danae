const path = require('path');

function getProjectType() {
    const pkg = require(path.join(process.cwd(), 'package.json'));
    let dependenciesNames = [];
    if (pkg.dependencies && typeof pkg.dependencies === 'object') {
        dependenciesNames = [...Object.keys(pkg.dependencies)];
    }
    if (pkg.devDependencies && typeof pkg.devDependencies === 'object') {
        dependenciesNames = [...dependenciesNames, ...Object.keys(pkg.devDependencies)];
    }
    if (dependenciesNames.includes('vue')) {
        return 'vue';
    } else if (dependenciesNames.includes('react')) {
        return 'react';
    }
    return '';
}


module.exports = {
    getProjectType,
}
