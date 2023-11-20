const { off } = require('process');

module.exports = {
  extends: ['custom/next'],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'typeProperty', format: null },
      { selector: 'objectLiteralProperty', format: null },
      { selector: 'interface', format: ['PascalCase'] },
      { selector: 'variable', format: null },
      { selector: 'typeParameter', format: ['UPPER_CASE'] },
    ],
    '@typescript-eslint/camelcase': 'off',
    camelcase: 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/jsx-pascal-case': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'react/jsx-no-undef': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    'import/no-named-as-default-member': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
  },
};
