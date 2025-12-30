import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    rules: {
      semi: ['error', 'always'],
    },
  },
];
