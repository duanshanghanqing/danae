
const { Command } = require('commander');
const pkg = require('../package.json');
const program = new Command();

module.exports = function () {

    program._helpDescription = 'show help';
    program._helpCommandDescription = 'show command help';
    program
        .name(Object.keys(pkg.bin)[0])
        .usage('<command> [options]')
        .version(pkg.version, '', 'version number');

    // canna create projectName
    program.command('create [projectName]')
        .description('create a project or package')
        .option('-s, --show', 'show template list')
        .action((projectName, options) => {
            require('./create')(projectName, options);
        });

    program.parse(process.argv);
}
