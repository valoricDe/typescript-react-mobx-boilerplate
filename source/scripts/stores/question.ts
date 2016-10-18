import {observable, action, map, ObservableMap} from 'mobx';
import TickModel from "../models/tick";

export default class QuestionStore implements Stores.IUsers {
	collection;
	@observable models: Map<string, Models.Tick.ITick> = new ObservableMap<Models.Tick.ITick>();
	@observable isLoading = true;

	constructor(transportLayer) {
		this.collection = transportLayer;
		//this.transportLayer.onReceiveTickUpdate(updatedTick => this.updateTickFromServer(updatedTick));
		this.loadTicks();
	}

	initialize() {
		if(!this.models.size) {
			this.createTick(0);
		}
	}

	/**
	 * Fetches all tick's from the server
	 */
	loadTicks() {
		this.isLoading = true;
		this.collection.fetch().subscribe(fetchedTicks => {
			fetchedTicks.forEach(json => this.updateTickFromServer(json));
			this.initialize();
			this.isLoading = false;
		}, console.error);
	}

	/**
	 * Update a tick with information from the server. Guarantees a tick
	 * only exists once. Might either construct a new tick, update an existing one,
	 * or remove an tick if it has been deleted on the server.
	 */
	updateTickFromServer(json) {
		let tick = this.models.get(json.id);
		if(!tick && json.isDeleted)
			return;

		if (!tick) {
			let tick = new TickModel(this, json.value);
			this.models.set(tick.id, tick);
		}
		else if (json.isDeleted) {
			this.removeTick(tick);
		} else {
			tick.updateFromJson(json);
		}
	}

	/**
	 * Creates a fresh tick on the client and server
	 */
	createTick(value) {
		var tick = new TickModel(this, value);
		this.models.set(tick.id, tick);
		return tick;
	}

	/**
	 * A tick was somehow deleted, clean it from the client memory
	 */
	removeTick(tick) {
		this.models.delete(tick.id);
		tick.dispose();
	}
}