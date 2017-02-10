// from https://github.com/facebook/draft-js/issues/246#issuecomment-221120915
import { List } from 'immutable';

const DELIMITER = ':';
const DECORATOR_DELIMITER = ',';

function occupySlice(targetArr/* Array<?string>*/, start, end, componentKey) {
	for (let ii = start; ii < end; ii++) {
		if (targetArr[ii]) {
			targetArr[ii] = targetArr[ii] + DECORATOR_DELIMITER + componentKey; // eslint-disable-line
		} else {
			targetArr[ii] = componentKey; // eslint-disable-line no-param-reassign
		}
	}
}
export default class NestableDecorator {
	constructor(decorators) {
		// Copy the decorator array, since we use this array order to determine
		// precedence of decoration matching. If the array is mutated externally,
		// we don't want to be affected here.
		this.decorators = decorators.slice();

		// We must cache the components, otherwise every time try get a component
		// using getComponentForKey would be a new object, that makes draft buggy
		this.componentCache = {};
	}

	getDecorations(block/* ContentBlock*/) { // return immutable List
		const decorations = Array(block.getText().length).fill(null);
		this.decorators.forEach(
			(/* object*/ decorator, /* number*/ ii) => {
				let counter = 0;
				const strategy = decorator.strategy;
				strategy(block, (/* number*/ start, /* number*/ end) => {
					occupySlice(decorations, start, end, ii + DELIMITER + counter);
					counter++;
				});
			}
		);
		return List(decorations); // eslint-disable-line new-cap
	}

	getComponentForKey(key) {
		if (this.componentCache[key]) return this.componentCache[key];
		const components = key.split(DECORATOR_DELIMITER)
			.map(k => parseInt(k.split(DELIMITER)[0], 10))
			.map(k => this.decorators[k].component);

		this.componentCache[key] = (props) => // composite component
			components.reduce((children, Outer) =>
				<Outer { ...props } children={children} />, props.children);
		return this.componentCache[key];
	}

	getPropsForKey(key) {
		const pps = key.split(DECORATOR_DELIMITER)
			.map(k => parseInt(k.split(DELIMITER)[0], 10))
			.map(k => this.decorators[k].props);
		return Object.assign({}, ...pps);
	}
}