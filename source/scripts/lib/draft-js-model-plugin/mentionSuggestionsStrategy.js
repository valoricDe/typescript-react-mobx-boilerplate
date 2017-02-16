/* @flow */

import {findWithRegex} from '../customFindWithRegex';

export default (regExp, group) => (contentBlock, callback) => {
	findWithRegex(contentBlock.getText(), callback, regExp, group);
};
