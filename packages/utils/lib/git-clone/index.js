const _gitClone = require('git-clone');


const gitClone = (_url , _projectName = '') => {
    return new Promise((resolve, reject) => {
        if (!_url) {
            reject(new Error('url not null'));
            return;
        }

        _gitClone(_url, _projectName, (err) => {
            if (err) {
                reject(err)
                return;
            }
            resolve();
        });
    });
}

module.exports = {
    gitClone,
}
