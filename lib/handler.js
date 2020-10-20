const fs = require('fs');
const path = require('path');
const lockParser = require('parse-yarn-lock').default;

const finder = require('./finder')

function handler(packageName, workingDir) {
    const currentDir = workingDir ? path.resolve(workingDir) : process.cwd();
    const lockFile = fs.readFileSync(path.join(currentDir, 'yarn.lock'), 'utf8');
    const parsedFile = lockParser(lockFile).object;

    const foundDependencies = finder(packageName, parsedFile);
    console.log(
        foundDependencies.length
            ? foundDependencies.join('\n')
            : 'No dependencies'
    );
}

module.exports = handler;
