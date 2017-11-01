import { realpathSync } from 'fs';
import relative from 'require-relative';
import { handleError } from '../logging.js';
import batchWarnings from './batchWarnings.js';
import build from './build.js';
import watch from './watch.js';

export default function runPickler(command) {
  if (command._.length > 1) {
    handleError({
      code: 'ONE_AT_A_TIME',
      message: 'pickler can only process one file/directory at a time'
    });
  }

  if ( command._.length === 1 ) {
		if ( command.input ) {
			handleError({
				code: 'DUPLICATE_IMPORT_OPTIONS',
				message: 'use --input, or pass input path as argument'
			});
		}

		command.input = command._[0];
	}

  if ( command.watch ) {
    handleError({
      code: 'WATCH_NOT_YET_SUPPORTED',
      message: 'pickler cannot handle watching for file changes yet'
    });
  } else {
		const warnings = batchWarnings();
    const inputOptions = {
      input: command.input
    };
    const outputOptions = {
      file: command.output
    };

		inputOptions.onwarn = warnings.add;

    return build( inputOptions, outputOptions, warnings, command.silent );
  }
}
