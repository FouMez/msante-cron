module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es2021: true,
    },
    extends: ['airbnb-base'],
    parserOptions: {
      ecmaVersion: 12,
    },
    rules: {
      'no-underscore-dangle': [0],
      'no-return-await': [0],
      'no-param-reassign': [0],
      'no-case-declarations': [0],
      'prefer-promise-reject-errors': [1],
      'no-restricted-globals': [0],
      'no-plusplus': [0],
      'import/no-dynamic-require': [0],
      camelcase: [0],
    },
  };
  