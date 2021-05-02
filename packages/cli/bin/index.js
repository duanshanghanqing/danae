#!/usr/bin/env node


var clear = require('clear');
clear();

const { init } = require('danae-utils');
init(require('../package.json'), require('../lib'));
