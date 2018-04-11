module.exports = {
  root: true,
  extends: 'babel',
  plugins: ['prettier'],
  parser: 'babel-eslint',
  rules: {
    'no-var': 0,
    'max-len': 0,
    strict: 0,
    'prettier/prettier': 'error'
  },
  env: {
    node: true,
    mocha: true,
    jest: true
  }
};
