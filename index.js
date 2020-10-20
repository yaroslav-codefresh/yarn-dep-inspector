#!/usr/bin/env node
const yargs = require('yargs/yargs')
const handler = require('./lib/handler');

// noinspection BadExpressionStatementJS
yargs(yargs.hideBin(process.argv))
    .command('inspect <package_name>', 'inspect dependencies',
        (yargs) => {
            return yargs
                .positional('package_name', {
                    describe: 'package name to find dependencies'
                })
                .option('working-dir', {
                    alias: 'wd'
                })
        },
        (argv) => {
            return handler(argv.package_name, argv.workingDir);
        }
    )
    .demandCommand(1)
    .strict()
    .help('h')
    .argv;
