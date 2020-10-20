const _ = require('lodash');
const semver = require('semver');
const delimiter = ' -> '

function deps(packageName, version, lockFile, suffix) {
    const result = _.chain(lockFile)
        .map((info, name) => {
            const depVersion = info.dependencies[packageName];
            if (depVersion && semver.satisfies(version, depVersion)) {
                const lastIndex = name.lastIndexOf('@');
                const lookupName = name.substring(0, lastIndex);
                return deps(lookupName, info.version, lockFile, `${name}${delimiter}${suffix}`);
            }
        })
        .compact()
        .flatten()
        .value()
    return _.isEmpty(result) ? [suffix] : result;
}

function finder(packageName, parsedFile) {
    const filteredFile = _.reduce(parsedFile, (acc, dep, name) => {
        if (dep.dependencies) {
            acc[name] = dep;
        }
        return acc;
    }, {})

    const packages = [];

    _.forEach(parsedFile, (dep, name) => {
        if (name.includes(packageName)) {
            packages.push(name);
        }
    })

    const dependencies = _.chain(filteredFile)
        .map((info, name) => {
            const version = info.dependencies[packageName];
            if (version) {
                const lastIndex = name.lastIndexOf('@');
                const lookupName = name.substring(0, lastIndex);
                return deps(lookupName, info.version, filteredFile, `${name}${delimiter}${packageName}@${version}`);
            }
        })
        .compact()
        .flatten()
        .value();

    return _.sortBy(_.concat(packages, dependencies), o => o.length, _.identity);
}

module.exports = finder;
