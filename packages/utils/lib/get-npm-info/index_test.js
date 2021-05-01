const { 
    getNpmInfo,
    getNpmVersions,
    getSemverVersion,
    getNpmLatestVersion,
} = require('./index');

(async function() {
    const npmInfo = await getNpmInfo('react');
    // console.log(npmInfo);

    const versions = await getNpmVersions('react');
    // console.log(JSON.stringify(versions));

    const newVersions = await getSemverVersion('16.8.1', 'react');
    // console.log(JSON.stringify(newVersions));

    const latestVersion = await getNpmLatestVersion('react');
    // console.log(latestVersion);
})();