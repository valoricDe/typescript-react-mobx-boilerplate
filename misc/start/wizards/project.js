const fs = require('fs');

const { green } = require('../utils/colors');
const paths = require('../constants/paths');
const logger = require('../utils/logger');

module.exports = rl => {
	const project = {
		title: 'ts-react-mobx-boilerplate',
		root: 'root',
	};

	const questions = {
		title: green('Sup.\n\n') +
					'Let\'s initialize your application.\n\n' +
					`Enter project html title (${project.title}): `,
		root: `Enter html root id for your React application (${project.root}): `,
	};

	const isEmpty = str => str.length === 0;

	rl.question(questions.title, answer => {
		project.title = isEmpty(answer) ? project.title : answer;

		rl.question(questions.root, answer => {
			const kebab = answer.toLowerCase().replace(new RegExp(' ', 'g'), '-');
			project.root = isEmpty(answer) ? project.root : kebab;

			fs.writeFile(paths.project, JSON.stringify(project));

			logger(green('\nDone. Project file was created. Run "npm start" for open menu.\n'));

			rl.close();
		});
	});
};