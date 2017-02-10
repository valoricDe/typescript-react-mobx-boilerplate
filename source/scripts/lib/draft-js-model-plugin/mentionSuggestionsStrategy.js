/* @flow */

import findWithRegex from './utils/findWithRegex';

export default (regExp, group) => (contentBlock, callback) => {
	findWithRegex(regExp, group, contentBlock, callback);
};
