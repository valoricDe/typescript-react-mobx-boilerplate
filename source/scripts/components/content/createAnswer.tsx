import React, {Component} from 'react';
import Relay from 'react-relay';
import {observer} from "mobx-react";
import {observable} from "mobx";
import Formsy from 'formsy-react';
import { Input, Textarea } from 'formsy-react-components';
import { Panel, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import CreateAnswerMutation from "../../mutations/createAnswer";

@observer
class CreateAnswerComponent extends Component<Props.ICreateAnswerProps, void> {
	@observable isValidInput = false;

	save = (item) => {
		this.props.relay.commitUpdate(
			new CreateAnswerMutation({store: this.props.store, questionId: this.props.id, newItem: item}),
			{onSuccess: () => this.props.router.push('/questions/'+this.props.id), onFailure: console.error}
		);
	};

	cancel = () => {
		this.props.router.push('/questions/'+this.props.id);
	};

	public render(): JSX.Element {
		const item = {text: ''};

		const titleFieldStyles = {"paddingRight":"16px","lineHeight":"56px","fontSize":"20px","position":"relative","textOverflow":"ellipsis","whiteSpace":"nowrap","overflow":"hidden","color":"rgba(0, 0, 0, 0.4)"};

		return (
			<div>
				<h2 className="page-header">Add your Answer</h2>
				<Formsy.Form ref="form" onValidSubmit={(item) => this.save(item)} onValid={() => this.isValidInput = true} onInvalid={() => this.isValidInput = false}>
					<fieldset>
						<Textarea
							label="Description"
							name="text"
							value={item.text}
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


const CreateAnswer = Relay.createContainer(CreateAnswerComponent, {
	fragments: {
		store: () => Relay.QL`
    		fragment on Query {
    			${CreateAnswerMutation.getFragment('store')}
			}`,
	},
});

export default CreateAnswer;