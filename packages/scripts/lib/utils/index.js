const fs = require('fs');
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

function getProjectWebpackConfig() {
    const projectWebpackConfigPath = path.join(process.cwd(), 'webpack.config.js');
    if (fs.existsSync(projectWebpackConfigPath)) {
        const projectWebpackConfig = require(projectWebpackConfigPath);
        if (projectWebpackConfig && typeof projectWebpackConfig === 'object') {
            return projectWebpackConfig;
        }
    }
    return {};
}

module.exports = {
    getProjectType,
    getProjectWebpackConfig,
}
