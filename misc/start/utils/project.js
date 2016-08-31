const fs = require('fs');

const paths = require('../constants/paths');

module.exports =
	fs.existsSync(paths.project)
		? JSON.parse(fs.readFileSync(paths.project, 'utf8'))
		: { title: 'ts-react-mobx-boilerplate',
			root: 'root' };