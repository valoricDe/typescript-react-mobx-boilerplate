/* @flow */

import findWithRegex from 'find-with-regex';

export default (regExp: String) => (contentBlock: Object, callback: Function) => {
		findWithRegex(regExp, contentBlock, callback);
	};
