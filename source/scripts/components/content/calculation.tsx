import * as React from 'react';
import {Draggable} from "react-touch";
import math from 'mathjs';
import {Map} from 'immutable';

function mathFormatCallback(value) {
	if(value > 1e12 || value < 1e-6)
		return math.format(value, 5);
	else {
		return value.toLocaleString()
	}
}

export default class Calculation extends React.Component<any, any> {
	valueAtDragStart;
	positionX = 0;

	componentDidMount() {
		let {container} = this.props;
		let mention = this.props.mention;
		if(mention.get('node') instanceof Map) {
			mention = this.props.initializeMention({mention: mention.get('raw'), isEntry: false});
		}
		console.log('calculationDidMount', mention.get('raw'), container.state.models.toJS());
		this.props.updateModels(this.props.entityKey, mention);
		this.props.updateComponents(this.props.entityKey, this);
	}

	componentWillUnmount() {
		let {store} = this.props;
		console.log('componentWillUnmount', store.models.toJS());
		this.props.updateModels(this.props.entityKey, undefined);
	}

	render() {
		let {mention, entityKey, setReadOnly, updateValue, container} = this.props;

		let modelMapMention = container.state.models.get(entityKey);
		if(modelMapMention) {
			mention = modelMapMention;
		}
		if(mention.get('node') instanceof Map) {
			mention = this.props.initializeMention({mention: mention.get('raw'), isEntry: false});
		}

		if(!mention) {
			return <span>[Calculation could not be parsed]</span>;
		}

		let value = mention.get('node').compile().eval(container.scope);

		if(mention.get('editable')) {
			const getNewValue = (value, xDelta) => {
				const converted = typeof value === 'object' ? value.toNumber() : value;
				const expString = String(converted.toExponential());
				const exp = Number(expString.substr(expString.lastIndexOf('e')+1));
				const diff = Math.pow(10, exp-1) * Math.round(xDelta/5);
				const diff2 = math.divide(value, converted/diff);
				return math.add(value, diff2);
			};

			return <Draggable
				style={{translateX: 0, translateY: 0}}
				position={{left: 0}}
				onMouseDown={(test) => { console.log('mouse start', test); setReadOnly(true); this.valueAtDragStart = mention.get('value'); }}
				onTouchStart={(test) => { console.log('touch start', test); setReadOnly(true); this.valueAtDragStart = mention.get('value'); }}
				onDrag={(delta) => {
						this.positionX += delta.left;

						let newValue = getNewValue(this.valueAtDragStart, this.positionX);
						if(value != newValue) {
							value = newValue;
							updateValue(entityKey, mention, newValue);
						}
					}}
				onDragEnd={() => { console.log('drag end'); setReadOnly(false); }}
			>
				{(position) => {
					let displayValue = this.valueAtDragStart ? getNewValue(this.valueAtDragStart, position.dx) : value;
					return <span
						className={"adjustable-number "}
					>
					{math.format(displayValue, mathFormatCallback)}
				</span>;
				}}
			</Draggable>;
		}
		else {
			return <span
				className={"calculated-result "}
			>
			{math.format(value, mathFormatCallback)}
		</span>;
		}
	}
}