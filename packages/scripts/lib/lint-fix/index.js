const shelljs = require('shelljs');

shelljs.exec('eslint --fix --ext .ts,js,jsx,tsx src');