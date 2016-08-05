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
	project: path.join(__dirname, './project.json'),
};

const start = {
	projectWizard() {
		const project = {
			title: 'ts-react-mobx-boilerplate',
			root: 'root',
		};

		const questions = {
			title: this._text.green('Sup.\n\n') +
						'Let\'s initialize your application.\n\n' +
						`Enter project html title (${project.title}): `,
			root: `Enter html root id for your React application (${project.root}): `,
		};

		rl.question(questions.title, answer => {
			project.title = answer;

			rl.question(questions.root, answer => {
				project.root = answer.toLowerCase().replace(new RegExp(' ', 'g'), '-');

				fs.writeFile(PATHS.project, JSON.stringify(project));

				console.log(this._text.green('\nDone. Project file was created. Run "npm start" for open menu.\n'));

				rl.close();
			});
		});
	},

	dependenciesWizard() {
		const install = this._text.green('Sup, bro.\n\n') +
					'Install all dependencies? (yes) ';
		const cmd = 'npm install && typings install';

		rl.question(install, answer => {
			answer = answer.toLowerCase();

			if (this._isEmpty(answer) || answer === 'y' || answer === 'yes') {
				console.log(this._text.green('\nAfter installation run "npm start" for open project menu or project wizard.'));

				this._run(cmd);
			} else {
				console.log(this._text.red('\nAborted\n'));

				process.exit(0);
			}
		});
	},

	menuWizard() {
		const menu = this._text.yellow(`Project: ${this._title}\n\n`) +
					this._text.green('Sup, what do you want?\n\n') +
					'1) Run development server\n' +
					'2) Production build\n' +
					'3) Remove build folder\nEnter number: ';
		const cmd = {
			1: 'npm run server',
			2: 'npm run prod-build',
			3: 'npm run remove-build',
		};

		rl.question(menu, answer => {
			if (isFinite(answer) && answer <= Object.keys(cmd).length) {
				this._run(cmd[answer]);
			} else {
				console.log(this._text.red('\nError, please enter the action number.\n'));

				process.exit(0);
			}
		});
	},

	_run(cmd) {
		const action = exec(cmd);

		console.log(this._text.yellow('\nLoading...\n'));

		action.stdout.on('data', data => {
			console.log(data);
		});

		action.stdout.on('end', () => {
			process.exit(0);
		});

		process.on('exit', () => {
			action.kill();
		});
	},

	get _text() {
		return {
			yellow(text) {
				return `\x1b[33m${text}\x1b[0m`;
			},

			green(text) {
				return `\x1b[32m${text}\x1b[0m`;
			},

			red(text) {
				return `\x1b[31m${text}\x1b[0m`;
			},
		};
	},

	_isEmpty(str) {
		return str.length === 0;
	},

	get _title() {
		return JSON.parse(fs.readFileSync(PATHS.project, 'utf8')).title || 'none';
	},
};

if (!fs.existsSync(PATHS.node) || !fs.existsSync(PATHS.typings)) {
	start.dependenciesWizard();
} else if (!fs.existsSync(PATHS.project)) {
	start.projectWizard();
} else {
	start.menuWizard();
}
