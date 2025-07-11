import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import json from '@eslint/json'
import { defineConfig } from 'eslint/config'

export default defineConfig([
	{
		ignores: [
			'dist/',
			'.astro/',
			'node_modules/',
			'data/charts/',
			'.github/',
			'.vscode/',
			'package-lock.json',
			'package.json',
		],
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		...pluginReact.configs.flat.recommended,
		rules: {
			'indent': ['error', 'tab'],
			'semi': ['error', 'never'],
			'quotes': ['error', 'single'],
		},
		languageOptions: {
			globals: { ...globals.browser },
		},
	},
	{
		files: [
			'cli.js',
			'**/automation/**',
			'**/*.config.{js,ts,mjs,cjs}',
			'astro.config.mjs',
			'eslint.config.js',
		],
		languageOptions: {
			globals: { ...globals.node },
		},
	},
	tseslint.configs.recommended,
	{ files: ['**/*.json'], plugins: { json }, language: 'json/json', extends: ['json/recommended'] },
])