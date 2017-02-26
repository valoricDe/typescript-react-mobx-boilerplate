import * as React from 'react';
import { Component } from 'react';
import * as Relay from 'react-relay';
import Panel from 'react-bootstrap/lib/Panel';
import UserBox from "./userBox";
import AnswerVote from "./answerVote"; import {ReadOnlyEditor} from "./ReadOnlyEditor";

class AnswerClass extends Component<Props.IAnswerProps, void> {
	public render(): JSX.Element {
		const item = this.props.store;
		let style = {};
		if (this.props.relay.hasOptimisticUpdate(this.props.store)) {
			style['border'] = '1px solid red';
		}

		const titleFieldStyles = {"textAlign": "top", "paddingRight":"16px","lineHeight":"56px","fontSize":"20px","position":"relative","textOverflow":"ellipsis","whiteSpace":"nowrap","overflow":"hidden","color":"rgba(0, 0, 0, 0.4)"};

		return (
			<div style={style}>
				<Panel>
					<AnswerVote store={this.props.store} questionId={this.props.questionId} />
					<UserBox store={item.userByAuthor} className="pull-right"/>
					<ReadOnlyEditor onChange={() => {}}>
						{item.text}
					</ReadOnlyEditor>
				</Panel>
			</div>
		);
	}
}

	const Answer = Relay.createContainer(AnswerClass, {
		fragments: {
			// The property name here reflects what is added to `this.props` above.
			// This template string will be parsed by babel-relay-plugin.
			store: () => Relay.QL`
				fragment on Answer {
					text
					${AnswerVote.getFragment('store')}
					userByAuthor {
						${UserBox.getFragment('store')}
					}
				}`,
		},
	});

export default Answer;