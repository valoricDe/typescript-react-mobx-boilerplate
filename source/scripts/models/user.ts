import {observable, computed, action} from 'mobx';
import moment from "moment";
import Model from "./model";

export default class User extends Model implements Models.IUser {
	@observable public username;
	@observable public name;
	@observable public password;
	@observable public created;


	constructor(store, id, username, name, password, created = moment().format("YYYY-MM-DD hh:mm:ss")) {
		this.store = store;
		this.id = id;
		this.username = username;
		this.name = name;
		this.password = password;
		this.created = created;

		super();
	}

	@computed get asJson() {
		return {
			id: this.id,
			username: this.username,
			name: this.name,
			password: this.password,
			created: this.created,
		};
	}
};
