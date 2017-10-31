import pickler from '../../../src/pickler';
import chalk from 'chalk';
import ms from 'pretty-ms';
import { handleError, stderr } from '../logging.js';
import fs from 'graceful-fs';
import path from 'path';

export default function build ( inputOptions, outputOptions, warnings, silent ) {
	const useStdout = !outputOptions.file;

	const start = Date.now();
	const files = useStdout ? [ 'stdout' ] : relativeId( outputOptions.file );
	if ( !silent ) stderr( chalk.cyan( `\n${chalk.bold( inputOptions.input )} → ${chalk.bold( files.join( ', ' ) )}...` ) );

	const file = fs.readFileSync(path.resolve(inputOptions.input), 'utf8');

	const out = pickler(file).join('');

	console.log(out);
}
