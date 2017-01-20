import React, {Component} from 'react';
import Relay from 'react-relay';
import {observer} from "mobx-react";
import {observable} from "mobx";
import Formsy from 'formsy-react';
import { Input, Textarea } from 'formsy-react-components';
import { ButtonToolbar, Button, Modal, Alert } from 'react-bootstrap';

const Auth = require('../../lib/auth');
import LoginUserMutation from "../../mutations/loginUser";

export class LoginUserState {
}

enum LoginError {
	NONE,
	MALFORMED_JWT
}

@observer
export default class LoginUser extends Component<Props.ILoginUserProps, void> {
	@observable isValidInput = false;
	@observable loginError = LoginError.NONE;

	save = (item) => {
		Auth.getEnvironment().commitUpdate(
			new LoginUserMutation({email: item.email, password: item.password}),
			{
				onSuccess: (response: GQL.IMutation) => {
					if(!response.authenticate.jwtToken) {
						this.loginError = LoginError.MALFORMED_JWT;
					}
					else {
						Auth.login(response.authenticate.jwtToken);
						const { location, router } = this.props;

						if (location.state && location.state.nextPathname) {
							router.replace(location.state.nextPathname)
						} else {
							router.replace('/')
						}
						this.loginError = LoginError.NONE;
					}

				},
				onFailure: transaction => {
					var error = transaction.getError() || new Error('Mutation failed.');
					console.error(error);
					this.loginError = LoginError.MALFORMED_JWT;
				}
			}
		);

		this.close();
	};

	close = () => {

	};

	public render(): JSX.Element {
		const item = {email: '', password: ''};
		let style = {};

		return (
			<div style={style}>
				{this.loginError === LoginError.MALFORMED_JWT ?
					<Alert bsStyle="danger">
						<h4>Oh snap! You got one of the following errors!</h4>
						<ul>
							<li>Your login credentials were wrong</li>
							<li>An API login error occured if your absolutely sure your login credentials are correct contact dev@valoric.de</li>
						</ul>
					</Alert> : null}
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