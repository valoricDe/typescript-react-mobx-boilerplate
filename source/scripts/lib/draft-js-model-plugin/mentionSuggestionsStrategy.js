/* @flow */

import {findWithRegex} from './utils/customFindWithRegex';

export default (regExp, group) => (contentBlock, callback) => {
	findWithRegex(contentBlock.getText(), callback, regExp, group);
};
