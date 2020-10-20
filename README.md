# Yarn dependencies analyzer

Tool that finds all packages which depend on specific package

## Usage

```
node index.js inspect <package_name> --working-dir <path>
```

or 

```
docker run \
    -v <path_to_repo>:/service \
    yaroslavcodefresh/yarn-dep-inspector \
    inspect <package_name> --wd /service
```
