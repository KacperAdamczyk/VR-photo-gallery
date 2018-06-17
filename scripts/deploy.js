const shell = require('shelljs');
const chalk = require('chalk');

/* CONFIG */
const buildFolderName = 'dist';

/* Getting package manager */
preferedPM = 'yarn';
fallbackPM = 'npm';
const logFallback = () => console.log(chalk.yellow(`\n'${preferedPM}' was not found, '${fallbackPM}' will be used instead.\n`));
const pm = shell.which(preferedPM) ? preferedPM : logFallback() || preferedPM;

/* Removing old files */
if (shell.ls().some(f => f === buildFolderName)) {
    console.log(chalk.blue('Removing old files...'));
    shell.rm('-r', buildFolderName);
}

shell.cd('backend');
if (shell.ls().some(f => f === buildFolderName)) {
    console.log(chalk.blue('Removing old dist folder...'));
    shell.rm('-r', buildFolderName);
}
shell.cd('../');

/* Creating build directory */
console.log(chalk.blue('Creating directory...'));
shell.mkdir(buildFolderName);

/* Building dependencies */
console.log(chalk.blue('Building dependencies...'));

const editorPath = 'editor';
console.log(chalk.blue('Building editor...'));
shell.cd(editorPath);
shell.exec(`${pm} build`);
shell.cd('../');
shell.mv(`${editorPath}/build`, `${buildFolderName}/${editorPath}`);

const vePath = 'vr';
console.log(chalk.blue('Building vr...'));
shell.cd(vePath);
shell.exec(`${pm} bundle`);
shell.cd('..');
shell.mv(`${vePath}/build`, `${buildFolderName}/${vePath}`);

console.log(chalk.blue('Moving files...'));
shell.mv(buildFolderName, `backend/${buildFolderName}`);
console.log(chalk.blue('Done!'));