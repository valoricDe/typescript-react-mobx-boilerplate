const project = require('../utils/project');
const run = require('../utils/run');
const { yellow, green, red } = require('../utils/colors');
const projectWizard = require('./project');
const logger = require('../utils/logger');

module.exports = rl => {
	const menu =
				yellow(`Project: ${project.title}\n\n`) +
				green('Sup, what do you want?\n\n') +
				'1) Run development server\n' +
				'2) Production build\n' +
				'3) Remove build folder\n' +
				'4) Edit project settings\nEnter number: ';
	const cmd = {
		server: 'npm run server',
		prod: 'npm run prod-build',
		remove: 'npm run remove-build',
		projectWizard: () => projectWizard(rl),
	};

	rl.question(menu, answer => {
		if (isFinite(answer) && answer <= Object.keys(cmd).length) {
			switch (answer) {
				case '1': {
					run(cmd.server, false);
					break;
				}
				case '2': {
					run(cmd.prod, false);
					break;
				}
				case '3': {
					run(cmd.remove);
					break;
				}
				case '4': {
					cmd.projectWizard();
					break;
				}
			}
		} else {
			logger(red('\nError, please enter the action number.\n'));

			process.exit(0);
		}
	});
};