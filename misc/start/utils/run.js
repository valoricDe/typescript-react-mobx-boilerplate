const exec = require('child_process').exec;

const logger = require('./logger');
const Loading = require('./loading');

module.exports = (cmd, useLoading = true) => {
	const action = exec(cmd);
	const loading = new Loading();

	if (useLoading) {
		loading.start();
	}

	action.stdout.on('data', data => {
		logger(data);

		if (useLoading) {
			loading.stop();
		}
	});

	action.stdout.on('end', () => {
		process.exit(0);
	});

	process.on('exit', () => {
		action.kill();
	});
};