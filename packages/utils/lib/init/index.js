async function init(pkg, cb) {
    // check the node version number
    const semver = require('semver');
    if (!semver.satisfies(process.version, pkg.engines.node, { includePrerelease: true })) {
        console.log(require('colors').red(
            `you are using Node ${process.version}, this version of ${pkg.name} need Node ${pkg.engines.node}.\nplease upgrade the version.`
        ));
        return;
    }


    // check if it is a root account
    const rootCheck = require('root-check');
    rootCheck(); // sudo root will be automatically demoted when executing the command


    // check user home directory
    // const userHome = require('user-home'); 
    // const pathExists = require('path-exists').sync;// check whether the path exists
    // if (!userHome || !pathExists(userHome)) {
    //     console.log(require('colors').red(`The home directory of the current login user does not exist`));
    //     process.exit(1);
    // }

    
    // create environment variables. This step is not used for the moment


    // check whether the scaffold needs to be updated
    const { getSemverVersions } = require('../index');
    // Gets a list of version numbers greater than the current package
    const versions = await getSemverVersions(pkg.version, pkg.name);
    // const versions = await getSemverVersions('16.8.0', 'react');
    if (versions.length > 0) {
        console.log(require('colors').yellow(`please update manually ${pkg.name},the current version is ${pkg.version},latest version:${versions[versions.length - 1]},exec:\n npm install -g ${pkg.name}@${versions[versions.length - 1]}`));
    }


    // import-local I have also seen this package. My understanding is that if there is a package installed locally, the local package will be preferred
    const importLocal = require('import-local');
    // Use local file
    if (importLocal(__filename)) {
        require('npmlog').info('cli', `In use ${pkg.name} local version`);
    }

    cb();
};

module.exports = {
    init,
};
