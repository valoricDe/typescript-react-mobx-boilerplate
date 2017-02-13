import * as React from 'react';
import {Draggable} from "react-touch";

export class Calculation extends React.Component<any, any> {
	valueAtDragStart = 0;
	positionX = 0;

	componentDidMount() {
		this.props.updateModels(this.props.models.set(this.props.entityKey, this.props.mention));
	}

	componentWillUnmount() {
		console.log('componentWillUnmount', this.props.models.toJS());
		this.props.updateModels(this.props.models.delete(this.props.entityKey));
	}

	render() {
		let {mention, entityKey, setReadOnly, getNodeFromNewMentionValue, recalculateModelValues} = this.props;
		let value = mention.get('value');

		if(mention.get('editable')) {
			return <Draggable
				style={{translateX: 0, translateY: 0}}
				position={{left: 0}}
				onMouseDown={(test) => { console.log('mouse start', test); setReadOnly(true); this.valueAtDragStart = mention.get('value'); }}
				onTouchStart={(test) => { console.log('touch start', test); setReadOnly(true); }}
				onDrag={(delta) => {
							this.positionX += delta.left;

							let newValue = this.valueAtDragStart + (this.valueAtDragStart * Math.round(this.positionX/10) / 10);
							if(value != newValue) {
								value = newValue;
								getNodeFromNewMentionValue(mention, newValue);
								recalculateModelValues();
							}
						}}
				onDragEnd={() => { console.log('drag end'); setReadOnly(false); }}
			>
				{(position) => {

					let displayValue = this.valueAtDragStart ? this.valueAtDragStart + (this.valueAtDragStart * Math.round(position.dx/10) / 10) : value;

					console.log(position, mention.get('value'));
					return <span
						className={"adjustable-number "}
					>
							{displayValue}
						</span>;
				}}
			</Draggable>;
		}
		else {
			return <span
				className={"calculated-result "}
				contentEditable={false}
			>
							{math.format(value, {precision: 2})}
						</span>;
		}
	}
}