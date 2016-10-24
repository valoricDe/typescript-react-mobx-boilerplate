import React, {Component} from 'react';
import Relay from 'react-relay';
import Author from "./author";
import {Toolbar, ToolbarGroup, RaisedButton, ToolbarTitle, TextField} from "material-ui";
import {observer} from "mobx-react";
import {observable} from "mobx";
import IQuestion = Props.Content.IQuestion;
import UpdateQuestionMutation from '../../mutations/updateQuestion'

class QuestionClass extends Component<IQuestion, void> {
	isEditing = true;
	titleField: TextField;
	descriptionField;

	edit = () => {
		this.isEditing = true;
	};

	save = () => {
		const item: IQuestion = Object.assign({}, this.props.store);
		item.title = this.titleField.getValue();
		item.description = this.descriptionField.getValue();
		this.isEditing = false;
		Relay.Store.commitUpdate(
			new UpdateQuestionMutation({store: item}),
		);

		/*this.props.relay.commitUpdate(
			new UpdateQuestionMutation({store: item})
		);*/
	};

	cancel = () => {
		this.isEditing = false;
	};

	public render(): JSX.Element {
		console.log(this.props);

		const item = this.props.store;
		console.log(this.props.store.title);
		let style = {};
		if (this.props.relay.hasOptimisticUpdate(this.props.store)) {
			style.border = '1px solid red';
		}

		return (
			<div style={style}>
				<Toolbar className="content__customToolbar">
					<ToolbarGroup>
						<ToolbarTitle text={item.title} className="content__customToolbarTitle"/>
						{!this.isEditing ?
							<ToolbarTitle text={item.title} className="content__customToolbarTitle"/> :
							<TextField ref={c => this.titleField = c } defaultValue={item.title} onKeyDown={event => {if(event.keyCode == 13) { this.save() }}} errorText="This field is required" floatingLabelText={"Title"} />
						}
					</ToolbarGroup>
					<ToolbarGroup>
						{!this.isEditing ?
							<RaisedButton onTouchTap={this.edit} label="Edit" primary={true} /> :
							<div><RaisedButton onTouchTap={this.save} label="Save" primary={true} /> <RaisedButton onTouchTap={this.cancel} label="Cancel" secondary={true} /></div>
						}
					</ToolbarGroup>
				</Toolbar>
				{!this.isEditing ?
					<p>{item.description}</p> :
					<TextField ref={c => this.descriptionField = c } defaultValue={item.description} errorText="This field is required" floatingLabelText={"Description"}/>
				}
				<Author store={item.userByAuthor} />
				<hr />
			</div>
		);
	}
}

const Question = Relay.createContainer(QuestionClass, {
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin.
		store: () => Relay.QL`
    		fragment on Question {
				id
				rowId
				title
				description
				userByAuthor {
					${Author.getFragment('store')}
				}
			}`,
	},
});

export default Question;