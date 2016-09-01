const del = require('del');

const { paths } = require('../settings');

del([paths.build.path]).then(paths => {
	if (paths.length !== 0) {
		console.log(`Files deleted successfully:\n${paths.join('\n')}`);
	} else {
		console.log('No files to delete.\n');
	}
});