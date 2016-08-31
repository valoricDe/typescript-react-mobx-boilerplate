const { yellow, green } = require('../utils/colors');
const logger = require('./logger');

class Loading {
	start() {
		const symbols = ['\\', '|', '/', '-'];
		let count = 0;

		this.loader = setInterval(() => {
			logger(`${yellow(symbols[count++])} ${green('Loading...')}`);

			count &= 3;
		}, 250);
	}

	stop() {
		clearInterval(this.loader);
	}
}

module.exports = Loading;