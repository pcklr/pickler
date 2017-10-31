import { readFileSync } from 'fs';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import string from 'rollup-plugin-string';
import pkg from './package.json';

export default [
	/* bin/pickler */
	{
		input: 'bin/src/index.js',
		plugins: [
			string({ include: '**/*.md' }),
			json(),
			buble({ target: { node: 6 } }),
			commonjs({
				include: 'node_modules/**'
			}),
			resolve()
		],
		external: [
			'fs',
			'path',
			'module',
			'events',
			'rollup',
			'assert',
			'os'
		],
		output: {
			file: 'bin/pickler',
			format: 'cjs',
			banner: '#!/usr/bin/env node',
			paths: {
				pickler: '../dist/pickler.js'
			}
		}
	}
]
