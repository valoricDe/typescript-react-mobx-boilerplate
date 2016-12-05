import React, {Component} from 'react';
import Relay from 'react-relay';
import {observer} from "mobx-react";
import {observable} from "mobx";
import Formsy from 'formsy-react';
import { Input, Textarea } from 'formsy-react-components';
import { Panel, ButtonToolbar, Button } from 'react-bootstrap';
import UpdateQuestionMutation from '../../mutations/updateQuestion'
import UserBox from "./userBox";
import AnswersList from "./answerList";
import Link from "react-router/lib/Link";

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
		const item = this.props.store;
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
				<Panel
					   header={
							[<ButtonToolbar className="content__panelButtonToolbar pull-right" key="buttonToolbar">
							{this.props.user.currentUserId === item.userByAuthor.rowId ? (!this.isEditing ?
								<Button onClick={this.edit} bsStyle="primary">Edit</Button> :
								[<Button bsStyle="primary" type="submit" disabled={!this.isValidInput} key="save">Save</Button>, <Button onClick={this.cancel} bsStyle="danger" key="cancel">Cancel</Button>])
								: null
							}
							</ButtonToolbar>,
							<Link to={"/questions/"+questionId} key="title"><h2 role="presentation" className="content__panelTitle">{item.title}</h2></Link>]
					   }
					   footer="Test Footer"
				>
					{!this.isEditing ?
						null :
						<Input label="Title" value={item.title} placeholder={item.title} required name="title" validations={{matchRegexp: /\S+/}} style={titleFieldStyles} validationError="Title field is required" />
					}
					{!this.isEditing ?
						<p>{item.description}</p> :
						<Textarea
							label="Description"
							name="description"
							value={item.description}
							validationError="Description field is required"
							placeholder="This field requires 10 characters."
							help="This is some help text for the textarea."
							required
						/>
					}
					<UserBox store={item.userByAuthor} details={false} />
					<div>The question has {item.answersByQuestion.totalCount}</div>
				</Panel>
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
				${UpdateQuestionMutation.getFragment('store')}
				rowId
				title
				description
				userByAuthor {
					rowId
					${UserBox.getFragment('store')}
				}
				answersByQuestion {
					totalCount
				}
			}`,
		user: () => Relay.QL`
            fragment on Query {
                currentUserId
            }`,
	},
});

export class QuestionBoxQueries extends Relay.Route {
	static routeName = 'QuestionQueries';
	static queries = {
		store: (Component) => Relay.QL`query { questionByRowId(rowId: $id) { ${Component.getFragment('store')} } }`,
	};
}

export default QuestionBox;