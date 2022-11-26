module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  root: true,
  rules: {
    'prettier/prettier': ['warn', { endOfLine: 'auto' }],
    'react/no-unknown-property': ['error', { ignore: ['jsx'] }],
  },
  settings: {
    react: {
      version: '18.2.0',
    },
  },
};
