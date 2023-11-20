const { resolve } = require('node:path');
const { off } = require('node:process');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/node',
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/react',
    '@vercel/style-guide/eslint/next',
    'eslint-config-turbo',
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
  // add rules configurations here
  rules: {
    // add specific rules configurations here
    'import/no-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'unicorn/filename-case': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'no-unsafe-assignment': 'off',
    'import/no-extraneous-dependencies': 'off',
    'tsdoc/syntax': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    ' @typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
  },
};
