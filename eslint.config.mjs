import js from './api/node_modules/@eslint/js/src/index.js';
import globals from './api/node_modules/globals/index.js';

export default [
  { ignores: ['**/node_modules/**', '**/coverage/**'] },
  js.configs.recommended,
  {
    files: ['api/**/*.js', 'frontend/cypress.config.cjs'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['frontend/app.js'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['frontend/cypress/e2e/**/*.js'],
    languageOptions: {
      globals: { describe: 'readonly', it: 'readonly', cy: 'readonly', expect: 'readonly' },
    },
  },
];
