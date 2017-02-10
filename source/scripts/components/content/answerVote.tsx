import * as React from 'react';
import { Component } from 'react';
import * as Relay from 'react-relay';
import { ButtonToolbar, Button } from 'react-bootstrap';
import AnswerVoteMutation from "../../mutations/createAnswerVote";
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import IRouterComponent = Components.IRouterComponent;

class AnswerVoteComponent extends Component<Props.IAnswerVoteProps, void> {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	save = (item) => {
		const onSuccess = () => this.context.router.push('/questions/'+this.props.store.question);
		this.props.relay.commitUpdate(
			new AnswerVoteMutation({store: this.props.store, item: item}),
			{onSuccess: onSuccess, onFailure: console.error}
		);
	};

	vote = (value) => {
		const item = this.getVoteDefaults();
		item.value = item.value == value ? 0 : value;
		this.save(item);
	};

	subscribe = () => {
		const item = this.getVoteDefaults();
		item.subscribe = !item.subscribe;
		this.save(item);
	};

	getVoteDefaults = () => {
		const item = this.props.store;
		return item.answerVoteByCurrentUser ? item.answerVoteByCurrentUser : {value: 0, subscribe: false};
	};

	public render(): JSX.Element {
		const item = this.getVoteDefaults();
		return (
			<div className="content__voteBox">
				<ButtonGroup vertical block>
					<Button onClick={() => this.vote(+1)} active={item.value > 0}><Glyphicon glyph="chevron-up" /></Button>
					<Button onClick={() => this.vote(0)}>{this.props.store.vote ? this.props.store.vote : 0}</Button>
					<Button onClick={() => this.vote(-1)} active={item.value < 0}><Glyphicon glyph="chevron-down" /></Button>
				</ButtonGroup>
				<a onClick={this.subscribe} style={{color: item.subscribe ? "" : "inherit", textDecoration: "none"}} className="content__subscribe"><Glyphicon glyph="star" /></a>
			</div>
		);
	}
}

const AnswerVote = Relay.createContainer(AnswerVoteComponent, {
	fragments: {
		store: () => Relay.QL`
    		fragment on Answer {
    			question
    			vote
    			answerVoteByCurrentUser {
    				value
    				subscribe
    			}
				${AnswerVoteMutation.getFragment('store')}
			}`,
	},
});

export default AnswerVote;