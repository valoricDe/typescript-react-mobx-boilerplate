import React, {Component} from 'react';
import Relay from 'react-relay';
import {observer} from "mobx-react";
import {observable} from "mobx";
import Formsy from 'formsy-react';
import { Input, Textarea } from 'formsy-react-components';
import { ButtonToolbar, Button, Modal } from 'react-bootstrap';
import RegisterUserMutation from "../../mutations/registerUser";
import LoginUserMutation from "../../mutations/loginUser";

export class LoginUserState {
}

@observer
export default class LoginUser extends Component<Props.ILoginUserProps, void> {
	@observable isValidInput = false;

	save = (item) => {

		let onFailure = (transaction) => {
			var error = transaction.getError() || new Error('Mutation failed.');
			console.error(error);
		};

		let onSuccess = (response) => {
			const jwtToken = response.authenticate.jwtToken;
			localStorage.setItem('jwtToken', jwtToken);
			window.location.reload();
		};

		Relay.Store.commitUpdate(
			new LoginUserMutation({email: item.email, password: item.password}),
			{onFailure, onSuccess}
		);

		this.close();
	};

	close = () => {

	};

	public render(): JSX.Element {
		console.log(this.props);

		const item = {email: '', password: ''};
		let style = {};

		return (
			<div style={style}>
				<Formsy.Form ref="form" onValidSubmit={(item) => this.save(item)} onValid={() => this.isValidInput = true} onInvalid={() => this.isValidInput = false}>
					<fieldset>
						<Input label="Email" value={item.email} placeholder={item.email} required name="email" validations={{matchRegexp: /\S+/}} validationError="Title field is required" />
						<Input label="Password" value={item.password} placeholder={item.password} required type="password" name="password" validations={{matchRegexp: /\S+/}} validationError="Title field is required" />
						<ButtonToolbar className="content__panelButtonToolbar pull-right" key="buttonToolbar">
							<Button bsStyle="primary" type="submit" disabled={!this.isValidInput} key="save">Save</Button>
							<Button onClick={this.close} bsStyle="danger" key="cancel">Cancel</Button>
						</ButtonToolbar>

					</fieldset>
				</Formsy.Form>
			</div>
		);
	}
}