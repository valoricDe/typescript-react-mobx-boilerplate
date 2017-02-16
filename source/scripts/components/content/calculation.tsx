import * as React from 'react';
import {Draggable} from "react-touch";
import math from 'mathjs';

export default class Calculation extends React.Component<any, any> {
	valueAtDragStart;
	positionX = 0;

	componentDidMount() {
		this.props.updateModels(this.props.models.set(this.props.entityKey, this.props.mention));
	}

	componentWillUnmount() {
		console.log('componentWillUnmount', this.props.models.toJS());
		this.props.updateModels(this.props.models.delete(this.props.entityKey));
	}

	render() {
		let {mention, entityKey, setReadOnly, updateValue} = this.props;
		let value = mention.get('value');

		if(mention.get('editable')) {
			return <Draggable
				style={{translateX: 0, translateY: 0}}
				position={{left: 0}}
				onMouseDown={(test) => { console.log('mouse start', test); setReadOnly(true); this.valueAtDragStart = mention.get('value'); }}
				onTouchStart={(test) => { console.log('touch start', test); setReadOnly(true); this.valueAtDragStart = mention.get('value'); }}
				onDrag={(delta) => {
							this.positionX += delta.left;

							let newValue = math.add(this.valueAtDragStart, math.divide(math.multiply(this.valueAtDragStart, Math.round(this.positionX/10)), 10));
							if(value != newValue) {
								value = newValue;
								updateValue(entityKey, mention, newValue);
							}
						}}
				onDragEnd={() => { console.log('drag end'); setReadOnly(false); }}
			>
				{(position) => {
					let displayValue = this.valueAtDragStart ? math.add(this.valueAtDragStart, math.divide(math.multiply(this.valueAtDragStart, Math.round(position.dx/10)), 10)) : value;
					return <span
						className={"adjustable-number "}
					>
						{math.format(displayValue, 5)}
					</span>;
				}}
			</Draggable>;
		}
		else {
			return <span
				className={"calculated-result "}
			>
				{math.format(value, 5)}
			</span>;
		}
	}
}