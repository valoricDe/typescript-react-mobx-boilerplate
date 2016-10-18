import {observable, computed, action} from 'mobx';
import moment from "moment";
import Model from "./model";

export default class Question extends Model implements Models.IQuestion {
	@observable public title;
	@observable public description;
	@observable public voteCount;
	@observable public favoredCount;
	@observable public tags;
	@observable public created;
	@observable public author;

	constructor(store, id, title, description, voteCount, favoredCount, tags, author, created = moment().format("YYYY-MM-DD hh:mm:ss")) {
		this.store = store;
		this.id = id;
		this.title = title;
		this.description = description;
		this.voteCount = voteCount;
		this.favoredCount = favoredCount;
		this.tags = tags;
		this.author = author;
		this.created = created;

		super();
	}

	@computed get asJson() {
		return {
			id: this.id,
			title: this.title,
			description: this.description,
			voteCount: this.voteCount,
			favoredCount: this.favoredCount,
			tags: this.tags,
			author_id: this.author.id,
			created: this.created,
		};
	}
};
