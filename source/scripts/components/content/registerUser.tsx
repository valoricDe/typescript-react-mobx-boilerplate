import React, {Component} from 'react';
import Relay from 'react-relay';
import {observer} from "mobx-react";
import {observable} from "mobx";
import Formsy from 'formsy-react';
import { Input, Textarea } from 'formsy-react-components';
import { ButtonToolbar, Button, Modal } from 'react-bootstrap';
import RegisterUserMutation from "../../mutations/registerUser";

export class RegisterUserState {
	@observable show = false;
	@observable isValidInput = false;
}

@observer
export default class RegisterUser extends Component<Props.IRegisterUserProps, void> {

	save = (item) => {
		this.props.relay.commitUpdate(
			new RegisterUserMutation({store: this.props.store, newItem: item})
		);

		this.close();
	};

	close = () => {
		this.props._state.show = false;
	};

	public render(): JSX.Element {
		console.log(this.props);

		const item = {firstName: '', lastName: '', username: '', email: '', password: ''};
		let style = {};

		return (
			<div style={style}>
				<Formsy.Form ref="form" onValidSubmit={(item) => this.save(item)} onValid={() => this.props._state.isValidInput = true} onInvalid={() => this.props._state.isValidInput = false}>
					<fieldset>
						<Input label="First name" value={item.firstName} placeholder={item.firstName} required name="firstName" validations={{matchRegexp: /\S+/}} validationError="Title field is required" />
						<Input label="Last name" value={item.lastName} placeholder={item.lastName} required name="lastName" validations={{matchRegexp: /\S+/}} validationError="Title field is required" />
						<Input label="Username" value={item.username} placeholder={item.username} required name="username" validations={{matchRegexp: /\S+/}} validationError="Title field is required" />
						<Input label="Email" value={item.email} placeholder={item.email} required name="email" validations={{matchRegexp: /\S+/}} validationError="Title field is required" />
						<Input label="Password" value={item.password} placeholder={item.password} required type="password" name="password" validations={{matchRegexp: /\S+/}} validationError="Title field is required" />
										<ButtonToolbar className="content__panelButtonToolbar pull-right" key="buttonToolbar">
											<Button bsStyle="primary" type="submit" disabled={!this.props._state.isValidInput} key="save">Save</Button>
											<Button onClick={this.close} bsStyle="danger" key="cancel">Cancel</Button>
										</ButtonToolbar>

					</fieldset>
				</Formsy.Form>
			</div>
		);
	}
}