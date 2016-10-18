import {observable, computed, action} from 'mobx';
import moment from "moment";
import Model from "./model";

export default class Tag extends Model implements Models.ITag {
	@observable public title;
	@observable public description;
	@observable public created;

	constructor(store, id, title, description, created = moment().format("YYYY-MM-DD hh:mm:ss")) {
		this.store = store;
		this.id = id;
		this.title = title;
		this.description = description;
		this.created = created;

		super();
	}

	@computed get asJson() {
		return {
			id: this.id,
			title: this.title,
			description: this.description,
			created: this.created,
		};
	}
};
