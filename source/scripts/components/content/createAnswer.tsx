import * as React from 'react';
import { Component } from 'react';
import * as Relay from 'react-relay';
import {observer} from "mobx-react";
import {observable} from "mobx";
import Formsy from 'formsy-react';
import { Input, Textarea } from 'formsy-react-components';
import { Panel, ButtonToolbar, Button, Modal } from 'react-bootstrap';
import CreateAnswerMutation from "../../mutations/createAnswer";
import {EditorState, convertToRaw} from "draft-js";
import {MyEditor} from "./myEditor";

@observer
class CreateAnswerComponent extends Component<Props.ICreateAnswerProps, void> {
	@observable isValidInput = true;
	editorState = EditorState.createEmpty(this.editorDecorators);

	save = (item) => {
		const contentState = this.editorState.getCurrentContent();
		const editorContentRaw = convertToRaw(contentState);
		item.text = JSON.stringify(editorContentRaw); //exportHtml.stateToHTML(this.editorState.getCurrentContent());
		this.props.relay.commitUpdate(
			new CreateAnswerMutation({store: this.props.store, questionId: this.props.id, newItem: item}),
			{onSuccess: () => this.props.router.push('/questions/'+this.props.id), onFailure: console.error}
		);
	};

	cancel = () => {
		this.props.router.push('/questions/'+this.props.id);
	};

	onChange = (editorState) => {
		this.editorState = editorState;
	}

	public render(): JSX.Element {
		const item = {text: ''};

		const titleFieldStyles = {"paddingRight":"16px","lineHeight":"56px","fontSize":"20px","position":"relative","textOverflow":"ellipsis","whiteSpace":"nowrap","overflow":"hidden","color":"rgba(0, 0, 0, 0.4)"};

		return (
			<div>
				<h2 className="page-header">Add your Answer</h2>
				<Formsy.Form ref="form" onValidSubmit={(item) => this.save(item)} onValid={() => this.isValidInput = true} onInvalid={() => this.isValidInput = false}>
					<fieldset>
						<MyEditor onChange={this.onChange} editorState={this.editorState} readOnly={false} />
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