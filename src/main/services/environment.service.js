exports.isDevMode = ()=> {
    return process.argv[2] == '--DEV';
};