module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'eslint-plugin-jest'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'space-before-function-paren': 0,
    'react/prop-types': 0,
    'react/jsx-handler-names': 0,
    'react/jsx-fragments': 0,
    'react/no-unused-prop-types': 0,
    'import/export': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.stories.tsx'],
      },
    ],
    'jsx-a11y/label-has-associated-control': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 0,
    'react/jsx-uses-react': 0,
    'react/jsx-props-no-spreading': 0,
    camelcase: [2, { properties: 'always' }],
  },
};
