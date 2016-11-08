import React, {Component} from 'react';
import Relay from 'react-relay';
import {observer} from "mobx-react";
import {observable} from "mobx";
import Formsy from 'formsy-react';
import { Input, Textarea } from 'formsy-react-components';
import { Panel, ButtonToolbar, Button, Modal } from 'react-bootstrap';

@observer
export default class CreateQuestion extends Component<Props.ICreateQuestionProps, void> {
	@observable isValidInput = false;

	save = (item) => {
		item.author = 1;
		console.log(item);
		this.props.save(item);
		this.props.close();
	};

	cancel = () => {
		this.props.close();
	};

	public render(): JSX.Element {
		console.log(this.props);

		const item = {title: '', description: '', author: 1};
		let style = {};

		const titleFieldStyles = {"paddingRight":"16px","lineHeight":"56px","fontSize":"20px","position":"relative","textOverflow":"ellipsis","whiteSpace":"nowrap","overflow":"hidden","color":"rgba(0, 0, 0, 0.4)"};

		return (
			<div style={style}>
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