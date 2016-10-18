import {observable, computed, action} from 'mobx';
import moment from "moment";
import Model from "./model";

export default class Answer extends Model implements Models.IAnswer {
	@observable public text;
	@observable public voteCount;
	@observable public created;
	@observable public author;

	constructor(store, id, text, voteCount, author, created = moment().format("YYYY-MM-DD hh:mm:ss")) {
		this.store = store;
		this.id = id;
		this.text = text;
		this.voteCount = voteCount;
		this.author = author;
		this.created = created;

		super();
	}

	@computed get asJson() {
		return {
			id: this.id,
			text: this.text,
			voteCount: this.voteCount,
			author_id: this.author.id,
			created: this.created,
		};
	}
};
