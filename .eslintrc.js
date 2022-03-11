module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
        createDefaultProgram: true,
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    plugins: ['sonarjs'],
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:sonarjs/recommended',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended',
    ],
    rules: {
        'sort-imports': [
            'error',
            {
                ignoreCase: false,
                ignoreDeclarationSort: false,
                ignoreMemberSort: false,
                allowSeparatedGroups: true,
            },
        ],
        'no-console': ['warn'],
        'no-promise-executor-return': ['error'],
        'no-template-curly-in-string': ['error'],
        'no-unreachable-loop': ['error'],
        'no-useless-backreference': ['warn'],
        'array-callback-return': ['error'],
        'block-scoped-var': ['error'],
        curly: ['error'],
        'default-case': ['error'],
        'default-case-last': ['error'],
        'dot-notation': ['error'],
        'no-caller': ['error'],
        'no-constructor-return': ['error'],
        'no-empty-function': ['error'],
        'no-eval': ['error'],
        'no-else-return': ['warn'],
        'grouped-accessor-pairs': ['warn'],
        'class-methods-use-this': ['warn'],
        'no-alert': ['warn'],
        'sonarjs/cognitive-complexity': ['warn', 30],
        eqeqeq: ['error', 'smart'],
        'max-classes-per-file': ['error', 17],
        'sonarjs/max-switch-cases': ['error', 100],
        'sonarjs/no-duplicate-string': ['warn', 11],
        'prefer-const': ['off'],
        'react/prop-types': ['off'],
        'default-param-last': ['off'],
        '@typescript-eslint/ban-types': [
            'error',
            {
                extendDefaults: true,
                types: {
                    '{}': false,
                },
            },
        ],
    },
}
