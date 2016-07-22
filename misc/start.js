const fs = require('fs');
const path = require('path');
const readline = require('readline');
const exec = require('child_process').exec;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const PATHS = {
	node: path.join(__dirname, '../node_modules'),
	typings: path.join(__dirname, '../typings'),
};

if (fs.existsSync(PATHS.node) && fs.existsSync(PATHS.typings)) {
	const menu = green('Sup, what do you want?\n\n') +
				'1) Run development server\n' +
				'2) Development build\n' +
				'3) Production build\n' +
				'4) Remove build folder\nEnter number: ';

	rl.question(menu, answer => {
		const cmd = {
			1: 'npm run server',
			2: 'npm run dev-build',
			3: 'npm run prod-build',
			4: 'npm run remove-build',
		};

		if (isFinite(answer) && answer <= Object.keys(cmd).length) {
			run(cmd[answer]);
		} else {
			console.log(red('\nError, please enter the action number.\n'));
			process.exit(0);
		}

		rl.close();
	});
} else {
	const install = green('Sup, bro.\n\n') +
				'Install all dependencies? (yes) ';
	const cmd = 'npm install && typings install';

	rl.question(install, answer => {
		const ans = answer.toLowerCase();

		if (ans.length === 0 || ans === 'y' || ans === 'yes') {
			console.log(green('\nAfter installation run "npm start" for open project menu.'));
			run(cmd);
		} else {
			console.log(red('\nAborted\n'));
			process.exit(0);
		}

		rl.close();
	});
}

function run(cmd) {
	const action = exec(cmd);

	console.log(yellow('\nLoading...\n'));

	action.stdout.on('data', data => {
		console.log(data);
	});

	action.stdout.on('end', () => {
		process.exit(0);
	});

	process.on('exit', () => {
		action.kill();
	});
}

function yellow(text) {
	return `\x1b[33m${text}\x1b[0m`;
}

function green(text) {
	return `\x1b[32m${text}\x1b[0m`;
}

function red(text) {
	return `\x1b[31m${text}\x1b[0m`;
}
