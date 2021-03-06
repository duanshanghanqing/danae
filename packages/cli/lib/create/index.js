const path = require('path');
const colors = require('colors');
const pathExists = require('path-exists').sync;
const fs = require('fs');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const shell = require('shelljs');
const { spinnerStart, gitClone, exec } = require('danae-utils');
const tree = require('tree-node-cli');
const pkg = require('../../package.json');

module.exports = async function (projectName, options) {
    // View the supported created project types
    const templates = pkg['templates'];
    if (!Array.isArray(templates) || (Array.isArray(templates) && templates.length === 0)) {
        return;
    }
    if (options.show) {
        templates.forEach((template) => {
            console.log(colors.green(template.name));
        });
        return;
    }

    // create project directory
    const projectPath = path.resolve(process.cwd(), projectName);
    if (pathExists(projectPath)) {
        console.log(colors.red.underline('created repeatedly'));
        return;
    }

    // select the type of project to create
    const { templateValue } = await inquirer.prompt({
        type: 'list',
        name: 'templateValue',
        message: 'please select template type',
        default: templates[0].value,
        choices: templates,
    });

    // clone project 
    const spinner = spinnerStart('downloading');
    try {
        await gitClone(templateValue, projectName);
    } catch (error) {
        console.log(colors.red.underline('failed to create, please operate again'));
        return;
    } finally {
        spinner.stop(true);
    }
    // shell.rm('-rm', `${projectName}/.git`); // delete git hidden files, which are compatible with different platforms
    const getPath = path.resolve(projectPath, '.git');
    if (pathExists(getPath)) {
        fse.removeSync(getPath);
    }

    // edit project name
    const packageJsonPath = path.resolve(projectPath, 'package.json');
    const packageJson = require(packageJsonPath);
    packageJson.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));

    // tree display directory
    const string = tree(projectPath, {
        allFiles: true,
        exclude: [/node_modules/],
        maxDepth: 4,
    });
    console.log(colors.green(string));
    console.log(`Creating a new app in ${colors.green(projectPath)}`);


    if (templateValue.includes('-web')) {
        // remind the user whether to run the project
        const { isRun } = await inquirer.prompt({
            type: 'confirm',
            name: 'isRun',
            message: 'Is it running',
            default: true,
            // choices: frameTypes,
        });
        if (!isRun) {
            console.log('')
            console.log('We suggest that you begin by typing:');
            console.log('');
            console.log(`${colors.green('cd')} ${projectPath}`);
            console.log(`${colors.green('npm install')} or ${colors.green('yarn install')}`);
            console.log(`${colors.green('npm start')} or ${colors.green('yarn start')}`);
            console.log('');
            console.log('Happy hacking!')
            return;
        }

        // enter the project
        shell.cd(projectName);

        // install
        const installSpinner = spinnerStart('installing');
        try {
            await exec('npm install');
        } catch (error) {
            console.log(colors.red.underline('installation failed, please operate again'));
            return;
        } finally {
            installSpinner.stop(true);
        }

        // start
        shell.exec('npm start');
    }
}