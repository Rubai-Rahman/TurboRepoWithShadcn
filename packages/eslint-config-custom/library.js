const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/typescript',
  ].map(require.resolve),
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  rules: {
    // add specific rules configurations here
    'import/no-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'unicorn/filename-case': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'no-unsafe-assignment': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-unsafe-assignment': 'off',
    'tsdoc/syntax': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/camelcase': 'off',
  },
};
