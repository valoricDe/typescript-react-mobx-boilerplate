const fs = require('fs');
const readline = require('readline');

const path = require('./constants/paths');
const project = require('./utils/project');
const wizard = {
	menu: require('./wizards/menu'),
	dependencies: require('./wizards/dependencies'),
	project: require('./wizards/project'),
};

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

if (!fs.existsSync(path.node)) {
	wizard.dependencies(rl);
} else if (project === null || (project.title === null && project.root === null)) {
	wizard.project(rl);
} else {
	wizard.menu(rl);
}