const run = require('../utils/run');
const { green, red } = require('../utils/colors');
const logger = require('../utils/logger');

module.exports = rl => {
	const install = green('Sup, bro.\n\n') +
			'Install all dependencies? (yes) ';
	const cmd = 'npm install';

	rl.question(install, answer => {
		answer = answer.toLowerCase();

		if (answer.length === 0 || answer === 'y' || answer === 'yes') {
			console.log(green('\nAfter installation run "npm start" for open project menu or project wizard.\n'));

			run(cmd);
		} else {
			logger(red('\nAborted\n'));

			process.exit(0);
		}
	});
};