module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    ecmaFeatures: {
      globalReturn: false,
    },
    babelOptions: {
      configFile: './.babelrc',
    },
  },
  rules: {
    'import/prefer-default-export': 0,
    'consistent-return': 0,
    'arrow-parens': 0,
    'max-len': [2, {
      code: 120,
    }],
    'no-underscore-dangle': 0,
  },
  settings: {
    'import/resolver': { 'babel-module': {} },
  },
};
