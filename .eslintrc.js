module.exports = {
  'env': {
    'node': true,
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'jest': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'never'
    ],
    'arrow-spacing': [
      'error', {'before': true, 'after': true}
    ],
    'no-console': 0,
    'react/prop-types': 'off',
    'react/display-name': 'off'
  }
};
