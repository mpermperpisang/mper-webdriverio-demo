module.exports = {
  globals: {
    MyGlobal: true,
  },
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 12,
  },
  plugins: ['no-comments'],
  rules: {
    'no-trailing-spaces': [2, { skipBlankLines: false }],
    indent: ['error', 2],
    'no-unused-vars': ['error', { vars: 'all' }],
    'max-len': ['error', { code: 100 }],
    'no-comments/disallowComments': [
      'error',
      {
        allow: ['TODO', 'NOTE', 'global'],
      },
    ],
  },
  ignorePatterns: ['node_modules/*', 'allure-*/*'],
  settings: {
    react: {
      version: '7.27.1',
    },
  },
};
