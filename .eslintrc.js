module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  globals: {
    global: 'readonly',
    require: 'readonly',
    __DEV__: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['import', 'prettier', 'react', 'react-hooks', 'react-native'],
  rules: {
    // react
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
    'react/sort-prop-types': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: true,
        requiredFirst: false,
        sortShapeProp: true,
      },
    ],
    // sorting
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          // {
          //   pattern: '{react,react-native,reactor/**}',
          //   group: 'internal',
          //   position: 'before',
          // },
          {
            pattern: '{@**,@**/**,}',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['@'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    // clean-code
    'max-len': [1, 120, { tabWidth: 2, ignoreComments: true }],
  },
  root: true,
  settings: {
    react: {
      version: require('./package.json').dependencies.react,
    },
  },
};
