import * as React from 'react';
import { Component } from 'react';
import * as Relay from 'react-relay';
import {observer} from "mobx-react";
import {observable} from "mobx";
import Formsy from 'formsy-react';
import { Input, Textarea } from 'formsy-react-components';
import { Card, ButtonToolbar, Button } from 'reactstrap';
import UpdateQuestionMutation from '../../mutations/updateQuestion'
import UserBox from "./userBox";
import Link from "react-router/lib/Link";
import QuestionTagList from "./questionTagList";
import {ReadOnlyEditor} from "./ReadOnlyEditor";
import CardHeader from "reactstrap/lib/CardHeader";
import CardBlock from "reactstrap/lib/CardBlock";

import '../../../styles/components/questionBox.scss';

@observer
class QuestionBoxClass extends Component<Props.IQuestionProps, void> {
	@observable isEditing = false;
	@observable isValidInput = false;

	edit = () => {
		this.isEditing = true;
	};

	save = (item) => {
		this.props.relay.commitUpdate(
			new UpdateQuestionMutation({store: this.props.store, patch: item})
		);
		this.isEditing = false;
	};

	cancel = () => {
		this.isEditing = false;
	};

	public render(): JSX.Element {
		const store = this.props.store;
		const questionId = this.props.store.rowId;
		let style = {};
		if (this.props.relay.hasOptimisticUpdate(this.props.store)) {
			style['border'] = '1px solid red';
		}

		const titleFieldStyles = {"paddingRight":"16px","lineHeight":"56px","fontSize":"20px","position":"relative","textOverflow":"ellipsis","whiteSpace":"nowrap","overflow":"hidden","color":"rgba(0, 0, 0, 0.4)"};

		return (
			<div style={style}>
				<Formsy.Form onValidSubmit={(item) => this.save(item)} onValid={() => this.isValidInput = true} onInvalid={() => this.isValidInput = false}>
					<fieldset>
				<Card className="questionBox">
					<CardHeader className="questionBox-content questionBox-header">
						<Link to={"/questions/"+questionId}><h2 role="presentation" className="content__panelTitle">{store.title}</h2></Link>
						<QuestionTagList store={store} />
					</CardHeader>
					<CardBlock className="questionBox-content">
						<ReadOnlyEditor onChange={() => {}} showCalculations={false} className="questionBox-description">
							{store.description}
						</ReadOnlyEditor>

						<div className="questionBox-detailBoxes">
							<UserBox store={store.userByAuthor} details={false} className="questionBox-user" />
							<Button className="questionBox-views" title={"This question has "+Math.floor((Math.random() * 100) + 1)+" views."}>
								<small>Views</small>
								<p>{Math.floor((Math.random() * 100) + 1)}</p>
							</Button>
							<Button className={"questionBox-answers"+(store.answersByQuestion.totalCount ? '' : '-none' )} color={store.answersByQuestion.totalCount > 0 ? "success" : "warning"} title={"This question has "+store.answersByQuestion.totalCount+" answers."}>
								<small>Answers</small>
								<p>{store.answersByQuestion.totalCount}</p>
							</Button>
						</div>
					</CardBlock>
				</Card>
			</fieldset>
			</Formsy.Form>
			</div>
		);
	}
}

const QuestionBox = Relay.createContainer(QuestionBoxClass, {
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin.
		store: () => Relay.QL`
			fragment on Question {
				rowId
				title
				description
				vote
                questionTagXrefsByQuestionId(first: 20) {
					edges {
                        node {
                            tagByTagId {
                                name
                            }
                        }	
					}
				}
				userByAuthor {
					rowId
					${UserBox.getFragment('store')}
				}
				answersByQuestion {
					totalCount
				}
                ${UpdateQuestionMutation.getFragment('store')}
                ${QuestionTagList.getFragment('store')}
			}`,
		/*user: () => Relay.QL`
            fragment on Query {
                currentUserId
            }`,*/
	},
});

export class QuestionBoxQueries extends Relay.Route {
	static routeName = 'QuestionQueries';
	static queries = {
		store: (Component) => Relay.QL`query { questionByRowId(rowId: $id) { ${Component.getFragment('store')} } }`,
	};
}

export default QuestionBox;