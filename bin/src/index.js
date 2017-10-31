import minimist from 'minimist';
import help from './help.md';
import { version } from '../../package.json';
import run from './run/index.js';

const command = minimist( process.argv.slice( 2 ), {
	alias: {
		// Short options
		h: 'help',
		//o: 'output.file',
		v: 'version',
		//w: 'watch'
	}
});

if ( command.help || ( process.argv.length <= 2 && process.stdin.isTTY ) ) {
	console.log( `\n${help.replace('__VERSION__', version)}\n` ); // eslint-disable-line no-console
}

else if ( command.version ) {
	console.log( `pickler version ${version}` ); // eslint-disable-line no-console
}

else {
	run( command );
}
