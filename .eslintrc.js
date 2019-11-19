module.exports = {
    extends: 'standard',
    globals: {
        module: true,
        require: true,
    },
    env: {
        es6: true,
        node: true
    },
    rules: {
        'indent': ['error', 4],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
    }
};
