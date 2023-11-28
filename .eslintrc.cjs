module.exports = {
  globals: {
    MyGlobal: true,
  },
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    webextensions: true,
    jquery: true,
    jest: true,
  },
  extends: ['airbnb'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022,
  },
  plugins: ['no-comments'],
  rules: {
    'no-eval': [2, { allowIndirect: true }],
    camelcase: [2, { properties: 'always' }],
    'no-trailing-spaces': [2, { skipBlankLines: false }],
    indent: ['error', 2],
    'no-unused-vars': ['error', { vars: 'all' }],
    'max-len': ['error', { code: 100 }],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['expression', 'if', 'switch'],
        next: ['const', 'if', 'switch'],
      },
      {
        blankLine: 'always',
        prev: ['const', 'if', 'switch'],
        next: ['expression', 'if', 'switch'],
      },
      {
        blankLine: 'always',
        prev: 'multiline-expression',
        next: '*',
      },
    ],
    'no-comments/disallowComments': [
      'error',
      {
        allow: ['TODO', 'FIXME', 'NOTE', 'DEBUG', 'eslint', 'global'],
      },
    ],
  },
  ignorePatterns: ['allure-report/*', 'allure-results/*', 'report/*', '*.app', '*.ipa', '*.apk'],
  settings: {
    react: {
      version: '7.27.1',
    },
  },
};
