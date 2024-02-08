/// <reference types="./types/eslint.config.d.ts" />

import cSpellPlugin from '@cspell/eslint-plugin';
import eslintJs from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfigs from 'eslint-config-prettier';
import { defineFlatConfig } from 'eslint-define-config';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';
import globals from 'globals';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export default defineFlatConfig([
  { ignores: ['**/node_modules/**', '**/dist/**', '**/*.module.{scss,sass}.d.ts'] },
  {
    files: ['**/*.{,c,m}js', '**/*.{,c,m}ts{,x}'],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig{,.node}.json'],
      },
      globals: { ...globals.browser, ...globals.es2020 },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
      '@cspell': cSpellPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      react: reactPlugin,
      tailwindcss: tailwindcssPlugin,
    },
    rules: {
      ...eslintJs.configs.recommended.rules,
      ...tsPlugin.configs['strict-type-checked'].rules,
      ...tsPlugin.configs['stylistic-type-checked'].rules,
      ...prettierConfigs.rules,
      ...prettierPlugin.configs.recommended.rules,
      ...cSpellPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...tailwindcssPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
      '@cspell/spellchecker': [
        'warn',
        {
          checkComments: true,
          numSuggestions: 3,
          customWordListFile: resolve(dirname(fileURLToPath(import.meta.url)), 'cspell.config.yaml'),
        },
      ],
    },
    settings: {
      react: { version: '18.2.0' },
    },
  },
]);
