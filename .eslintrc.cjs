module.exports = {
    globals: {
      $: true,
      browser: true,
    },
    env: {
      es2021: true,
      node: true,
      browser: true,
      mocha: true,
    },
    extends: 'eslint:recommended',
    plugins: [
      'standard',
      'promise',
      'webdriverio',
      'cucumber',
    ],
    overrides: [
      {
        env: {
          node: true,
        },
        files: [
          ".eslintrc.js",
          ".eslintrc.cjs",
        ],
        parserOptions: {
          sourceType: "script",
        },
      },
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-useless-escape': 'off',
      'no-async-promise-executor': 'off',
      
    },
    ignorePatterns: ['reporter/'],
  };
  