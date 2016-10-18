import {reaction} from "mobx";

export default class Model implements Models.IModel {
	public store;
	public autoSave;
	public saveHandler;
	public id;

	constructor() {
		this.saveHandler = reaction(
			() => this.asJson,
			json => {
				if (this.autoSave && this.store) {
					this.store.store(json);
				}
			},
			false,
			1000
		);
	}

	get asJson() {
		throw new Error("Implement asJson in model class!");
	}

	remove() {
		this.store.remove(this);
	}

	/**
	 * Update this todo with information from the server
	 */
	updateFromJson(json) {
		// make sure our changes aren't send back to the server
		this.autoSave = false;

		for(var key in json) {
			if(key in this) {
				this[key] = json[key];
			}
		}

		this.autoSave = true;
	}

	dispose() {
		// clean up the observer
		if(this && this.saveHandler !== null) {
			this.saveHandler();
		}
	}
};
