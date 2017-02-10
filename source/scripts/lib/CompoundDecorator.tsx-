// https://github.com/facebook/draft-js/issues/542#issuecomment-275996606

import { CompositeDecorator } from 'draft-js';
import React from 'react';

import { List } from 'immutable';

const DELIMITER = '|';
const EMPTY = 'EMPTY';

const Span = (props) => <span>{props.children}</span>;

const keyFromString = (string) => {
	return string === EMPTY ? null : string;
};

const keyToString = (key) => {
	return key === null ? EMPTY : key;
};

const tupleFromString = (string) => {
	return string.split(DELIMITER).map(keyFromString);
};

const tupleToString = (tuple) => {
	return tuple.map(keyToString).join(DELIMITER);
};

export default class CompoundDecorator {
	constructor(decorators = []) {
		this.decorators = decorators.map((decorator) => {
			return decorator.strategy && decorator.component ?
				new CompositeDecorator([decorator]) :
				decorator;
		});
	}

	getDecorations(block) {
		const emptyTuples = Array(block.getText().length).fill(
			Array(this.decorators.length).fill(null)
		);

		const decorations = this.decorators.reduce((tuples, decorator, index) => {
			const blockDecorations = decorator.getDecorations(block);

			return tuples.map((tuple, tupleIndex) => {
				return [
					...tuple.slice(0, index),
					blockDecorations.get(tupleIndex),
					...tuple.slice(index + 1),
				];
			});
		}, emptyTuples);

		return List(decorations.map(JSON.stringify));
	}

	getComponentForKey(key) {
		const tuple = JSON.parse(key);
		return (props) => {
			const { decoratorProps, ...compositionProps } = props;
			const Composed = tuple.reduce((Composition, decoration, index) => {
				if (decoration !== null) {
					const decorator = this.decorators[index];
					const Component = decorator.getComponentForKey(decoration);
					const componentProps = {
						...compositionProps,
						...decoratorProps[index],
					};
					return () => (
						<Component {...componentProps}>
							<Composition {...compositionProps} />
						</Component>
					);
				}
				return Composition;
			}, Span);
			return (
				<Composed>{props.children}</Composed>
			);
		};
	}

	getPropsForKey(key) {
		const tuple = JSON.parse(key);
		return {
			decoratorProps: tuple.map((decoration, index) => {
				const decorator = this.decorators[index];
				return decoration !== null ? decorator.getPropsForKey(decoration) : {};
			}),
		};
	}
}