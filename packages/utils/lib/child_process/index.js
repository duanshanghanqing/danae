function exec(cmd, option = {}) {
    return new Promise(function (resolve, reject) {
        require("child_process").exec(cmd, {
            maxBuffer: 1024 * 2000,
            ...option,
        }, function (err, stdout, stderr) {
            if (err) {
                console.log(err);
                reject(err);
            } else if (stderr.lenght > 0) {
                reject(new Error(stderr.toString()));
            } else {
                console.log(stdout);
                resolve();
            }
        });
    });
};


function spawn(cmd, code, option) {
    const cp = require('child_process');
    let child;
    if (process.platform === 'win32') {
        // child = cp.spawn('cmd', ['/c', cmd, '-e', code], option);
        child = cp.spawn('cmd', ['/c', cmd, ...code], option);
    } else {
        child = cp.spawn(cmd, code, option);
    }
    return child;
}

function spawnAsyanc(cmd, code, option = {}) {
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, code, option);
        child.stdout.pipe(process.stdout);// output stream
        child.stderr.pipe(process.stderr);// error stream
        child.on('error', e => {
            reject(e);
        });
        child.on('exit', code => {
            resolve(code);
        });
    });
}

module.exports = {
    exec,
    spawn,
    spawnAsyanc,
};