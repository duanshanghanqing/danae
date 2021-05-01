'use strict';


module.exports = {
    ...require('./init'),
    ...require('./get-npm-info'),
    ...require('./spinner'),
    ...require('./git-clone'),
    ...require('./child_process'),
    ...require('./cross-spawn'),
};
