import React, {Component} from 'react';
import Relay from 'react-relay';
import {observer} from "mobx-react";
import {observable} from "mobx";
import Formsy from 'formsy-react';
import { Input, Textarea } from 'formsy-react-components';
import { Panel, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import CreateQuestionMutation from "../../mutations/createQuestion";
import Link from "react-router/lib/Link";

@observer
class CreateQuestionComponent extends Component<Props.ICreateQuestionProps, void> {
	@observable isValidInput = false;

	save = (item) => {
		console.log('CreateQuestion::save', item);
		const onSuccess = () => this.props.router.push('/questions');
		this.props.relay.commitUpdate(
			new CreateQuestionMutation({store: this.props.store, newItem: item}),
			{onSuccess: onSuccess, onFailure: console.error}
		);
	};

	cancel = () => {
		this.props.router.push('/questions');
	};

	public render(): JSX.Element {
		console.log(this.props.relay);
		const item = {title: '', description: ''};

		const titleFieldStyles = {"paddingRight":"16px","lineHeight":"56px","fontSize":"20px","position":"relative","textOverflow":"ellipsis","whiteSpace":"nowrap","overflow":"hidden","color":"rgba(0, 0, 0, 0.4)"};

		return (
			<div>
				<h2 className="page-header">Create Question</h2>
				<Formsy.Form ref="form" onValidSubmit={(item) => this.save(item)} onValid={() => this.isValidInput = true} onInvalid={() => this.isValidInput = false}>
					<fieldset>
						<Input label="Title" value={item.title} placeholder={item.title} required name="title" validations={{matchRegexp: /\S+/}} style={titleFieldStyles} validationError="Title field is required" />
						<Textarea
							label="Description"
							name="description"
							value={item.description}
							validationError="Description field is required"
							placeholder="This field requires 10 characters."
							help="This is some help text for the textarea."
							required
						/>
						<ButtonToolbar className="content__panelButtonToolbar pull-right" key="buttonToolbar">
							<Button bsStyle="primary" type="submit" disabled={!this.isValidInput} key="save">Save</Button>
							<Button onClick={this.cancel} bsStyle="danger" key="cancel">Cancel</Button>
						</ButtonToolbar>
					</fieldset>
				</Formsy.Form>
			</div>
		);
	}
}


const CreateQuestion = Relay.createContainer(CreateQuestionComponent, {
	fragments: {
		store: () => Relay.QL`
    		fragment on Query {
    			${CreateQuestionMutation.getFragment('store')}
			}`,
	},
});

export default CreateQuestion;