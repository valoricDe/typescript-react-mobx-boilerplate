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

const project = fs.existsSync(PATHS.project) ? JSON.parse(fs.readFileSync(PATHS.project, 'utf8')) : null;

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
			project.title = !this._isEmpty(answer) ? answer : project.title;

			rl.question(questions.root, answer => {
				const kebab = answer.toLowerCase().replace(new RegExp(' ', 'g'), '-');
				project.root = !this._isEmpty(answer) ? kebab : project.root;

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
					'3) Remove build folder\n' +
					'4) Edit project settings\nEnter number: ';
		const cmd = {
			server: 'npm run server',
			prod: 'npm run prod-build',
			remove: 'npm run remove-build',
			project: this.projectWizard.bind(this),
		};

		rl.question(menu, answer => {
			if (isFinite(answer) && answer <= Object.keys(cmd).length) {
				switch (answer) {
					case '1': {
						this._run(cmd.server);
						break;
					}
					case '2': {
						this._run(cmd.prod);
						break;
					}
					case '3': {
						this._run(cmd.remove);
						break;
					}
					case '4': {
						cmd.project();
						break;
					}
				}
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
		return project.title || 'none';
	},
};

if (!fs.existsSync(PATHS.node) || !fs.existsSync(PATHS.typings)) {
	start.dependenciesWizard();
} else if (project === null || (project.title === null && project.root === null)) {
	start.projectWizard();
} else {
	start.menuWizard();
}
