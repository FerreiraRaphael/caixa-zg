module.exports = {
    extends: ['airbnb', 'prettier'],
    env: {
        browser: true,
        jest: true
    },
    globals: {
        describe: false,
        it: false,
        before: false,
        beforeEach: false
    },
    rules: {
        'import/prefer-default-export': 0,
        'linebreak-style': 0,
        'react/jsx-filename-extension': 0
    },
    "parser": "babel-eslint"
};