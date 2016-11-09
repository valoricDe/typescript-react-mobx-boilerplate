import React, {Component} from 'react';
import {observer} from "mobx-react";
import {observable} from "mobx";
import Formsy from 'formsy-react';
import { Input, Textarea } from 'formsy-react-components';
import { ButtonToolbar, Button, Modal } from 'react-bootstrap';
import RegisterUserMutation from "../../mutations/registerUser";
import {Router, IRouterContext} from "../../lib/routerContext";

const Auth = require('../../lib/auth');

export class RegisterUserState {
	@observable show = false;
	@observable isValidInput = false;
}

@observer
export default class RegisterUser extends Component<Props.IRegisterUserProps, void> {
	@observable isValidInput = false;

	save = (item) => {
		console.log('save', item);
		Auth.getEnvironment().commitUpdate(
			new RegisterUserMutation({newItem: item})
		);

		this.props.router.push('/login');
	};

	close = () => {
		this.props.router.goBack();
	};

	public render(): JSX.Element {
		const item = {firstName: '', lastName: '', username: '', email: '', password: ''};

		return (
			<Formsy.Form onValidSubmit={(item) => this.save(item)} onValid={() => this.isValidInput = true} onInvalid={() => this.isValidInput = false}>
				<fieldset>
					<Input label="First name" value={item.firstName} placeholder={item.firstName} required name="firstName" validations={{matchRegexp: /\S+/}} validationError="Title field is required" />
					<Input label="Last name" value={item.lastName} placeholder={item.lastName} required name="lastName" validations={{matchRegexp: /\S+/}} validationError="Title field is required" />
					<Input label="Username" value={item.username} placeholder={item.username} required name="username" validations={{matchRegexp: /\S+/}} validationError="Title field is required" />
					<Input label="Email" value={item.email} placeholder={item.email} required name="email" validations={{matchRegexp: /\S+/}} validationError="Title field is required" />
					<Input label="Password" value={item.password} placeholder={item.password} required type="password" name="password" validations={{matchRegexp: /\S+/}} validationError="Title field is required" />
					<div className="row">
						<div className="col-sm-9 pull-right">
							<ButtonToolbar>
								<Button bsStyle="primary" type="submit" disabled={!this.isValidInput} >Save</Button>
								<Button onClick={this.close} bsStyle="danger">Cancel</Button>
							</ButtonToolbar>
						</div>
					</div>
				</fieldset>
			</Formsy.Form>
		);
	}
}