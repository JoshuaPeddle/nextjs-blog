// https://eslint.org/docs/latest/rules/#suggestions
module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'next/core-web-vitals'
  ],
  'overrides': [],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  'plugins': [ 'react' ],
  'rules': {
    'arrow-spacing': 'error',
    'arrow-parens': [ 'error', 'always' ],
    'array-bracket-spacing': [
      'error', 'always'
    ],
    'block-spacing': 'error',
    'brace-style': 'error',
    'comma-spacing': [ 'error', { 'before': false, 'after': true } ],
    'dot-location': [ 'error', 'property' ],
    'react/react-in-jsx-scope': 0,
    'no-multiple-empty-lines': [ 'error', { 'max': 1, 'maxEOF': 1 } ],
    'space-before-blocks': 'error',
    'react/prop-types': 0,
    'indent': [ 'error', 2 ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'padded-blocks': [ 'error', 'never' ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: [  'default', 'function' ], next: '*' },
      { blankLine: 'never', prev: [ 'const', 'let', 'var', 'if' ], next: [ '*' ] }
    ],
    'keyword-spacing': [ 'error', { 'before': true } ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
