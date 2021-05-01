function spinnerStart(msg = 'processing..', spinnerString = '|/-\\') {
    var Spinner = require('cli-spinner').Spinner;
    var spinner = new Spinner(msg + ' %s');
    spinner.setSpinnerString(spinnerString); // 会把 / 替换为 %s
    spinner.start();
    return spinner;
}

function sleep(t = 1000) {
    return new Promise(resolve => setTimeout(resolve, t));
}

module.exports = {
    spinnerStart,
    sleep,
}
