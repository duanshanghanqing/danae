
const { Command } = require('commander');
const pkg = require('../package.json');
const program = new Command();

module.exports = function () {

    program._helpDescription = 'view help';
    program._helpCommandDescription = 'view command help';
    program
        .name(Object.keys(pkg.bin)[0])
        .usage('<command> [options]')
        .version(pkg.version, '', 'version number');

    // 添加 canna create projectName
    program.command('create [projectName]')
        .description('create a project or package')
        .option('-s, --show', 'view the types that support project creation')
        .action((projectName, options) => {
            require('./create')(projectName, options);
        });

    program.parse(process.argv);
}
