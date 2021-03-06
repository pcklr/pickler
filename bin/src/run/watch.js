import fs from 'fs';
import pickler from '../../../src/pickler';
import chalk from 'chalk';
import ms from 'pretty-ms';
import onExit from 'signal-exit';
import dateTime from 'date-time';
import batchWarnings from './batchWarnings.js';
import alternateScreen from './alternateScreen.js';
import loadConfigFile from './loadConfigFile.js';
import relativeId from '../../../src/utils/relativeId.js';
import { handleError, stderr } from '../logging.js';

export default function watch(command, silent) {
	const isTTY = Boolean(process.stderr.isTTY);

	const screen = alternateScreen(isTTY);
	screen.open();

	const warnings = batchWarnings();

	let watcher;
	let configWatcher;

	function start(configs) {
		screen.reset( chalk.underline( `pickler v${pickler.VERSION}` ) );

		watcher = pickler.watch(configs);

		watcher.on('event', event => {
			switch (event.code) {
				case 'FATAL':
					screen.close();
					handleError(event.error, true);
					process.exit(1);
					break;

				case 'ERROR':
					warnings.flush();
					handleError(event.error, true);
					break;

				case 'START':
					screen.reset( chalk.underline( `pickler v${pickler.VERSION}` ) );
					break;

				case 'BUNDLE_START':
					if ( !silent ) stderr( chalk.cyan( `bundles ${chalk.bold( event.input )} → ${chalk.bold( event.output.map( relativeId ).join( ', ' ) )}...` ) );
					break;

				case 'BUNDLE_END':
					warnings.flush();
					if ( !silent ) stderr( chalk.green( `created ${chalk.bold( event.output.map( relativeId ).join( ', ' ) )} in ${chalk.bold(ms(event.duration))}` ) );
					break;

				case 'END':
					if ( !silent && isTTY ) {
						stderr( `\n[${dateTime()}] waiting for changes...` );
					}
			}
		});
	}

	// catch ctrl+c, kill, and uncaught errors
	const removeOnExit = onExit(close);
	process.on('uncaughtException', close);

	// only listen to stdin if it is a pipe
	if (!process.stdin.isTTY) {
		process.stdin.on('end', close); // in case we ever support stdin!
	}

	function close() {
		removeOnExit();
		process.removeListener('uncaughtException', close);
		// removing a non-existent listener is a no-op
		process.stdin.removeListener('end', close);

		screen.close();
		watcher.close();

		if (configWatcher) configWatcher.close();
	}

	start(configs);

	if (configFile && !configFile.startsWith('node:')) {
		let restarting = false;
		let aborted = false;
		let configFileData = fs.readFileSync(configFile, 'utf-8');

		const restart = () => {
			const newConfigFileData = fs.readFileSync(configFile, 'utf-8');
			if (newConfigFileData === configFileData) return;
			configFileData = newConfigFileData;

			if (restarting) {
				aborted = true;
				return;
			}

			restarting = true;

			loadConfigFile(configFile, silent)
				.then(configs => {
					restarting = false;

					if (aborted) {
						aborted = false;
						restart();
					} else {
						watcher.close();
						start(configs);
					}
				})
				.catch(err => {
					handleError(err, true);
				});
		};

		configWatcher = fs.watch(configFile, event => {
			if (event === 'change') restart();
		});
	}
}
