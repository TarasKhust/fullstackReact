module.exports = function (wallaby) {
  return {
    files: [
      'components/*.js',
      'lib/*.js',
      '!__tests__/*.test.js',
      'package.json', // <--
      'components/!styles/*.js'
    ],

    tests: [
      '__tests__/*.test.js',
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      "**/*.js?(x)": wallaby.compilers.babel()
    },

    testFramework: 'jest',

    debug: true
  };
};
