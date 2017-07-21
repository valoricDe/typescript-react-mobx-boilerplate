import * as React from 'react';
import { Component } from 'react';
import * as Relay from 'react-relay';
import {QuestionListByTag} from "./questionList";
import {TagChildrenList} from "./tagList";
import CreateTagSubscriptionMutation from "../../mutations/createTagSubscription";
import Button from "reactstrap/lib/Button";

class TagComponent extends Component<Props.ITagProps, void> {

	subscribe = (subscribe) => {
		const onSuccess = () => {};//this.context.router.push('/questions/'+this.props.store.question);
		this.props.relay.commitUpdate(
			new CreateTagSubscriptionMutation({store: this.props.store, subscribe: subscribe}),
			{onSuccess: onSuccess, onFailure: console.error}
		);
	};

	public render(): JSX.Element {
		const item = this.props.store;

		const subscription = item.tagSubscription || {questions: false, subTags: false};
		return (
			<div>
				<h2>Tag: {item.name} <small>Identifier: {item.identifier}</small></h2>
				<p>{item.description}</p>
				<p>This tag has been used in {item.questionTagXrefsByTagId.totalCount ? item.questionTagXrefsByTagId.totalCount : 'no'} question(s) yet.</p>
				<Button onClick={() => this.subscribe({questions: subscription.questions, subTags: !subscription.subTags})} color={subscription.subTags ? "primary" : "secondary"}>Subscribe to new Tags</Button>
				<TagChildrenList store={this.props.store} />
				<Button onClick={() => this.subscribe({questions: !subscription.questions, subTags: subscription.subTags})} color={subscription.questions ? "primary" : "secondary"}>Subscribe to new Questions</Button>
				<QuestionListByTag store={this.props.store} />
			</div>
		);
	}
}

const Tag = Relay.createContainer(TagComponent, {
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin.
		store: () => Relay.QL`
    		fragment on Tag {
				name
				identifier
				description
                questionTagXrefsByTagId {
					totalCount
				}
				tagSubscription {
					questions
					subTags
				}
				${TagChildrenList.getFragment('store')}
                ${QuestionListByTag.getFragment('store')}
				${CreateTagSubscriptionMutation.getFragment('store')}
			}`,
	},
});

export default Tag;

export class TagQueries extends Relay.Route {
	static routeName = 'TagQueries';
	static queries = {
		store: (Component) => Relay.QL`query { tagByRowId(rowId: $id) { ${Component.getFragment('store')} } }`,
	};
}