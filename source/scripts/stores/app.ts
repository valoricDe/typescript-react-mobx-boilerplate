import {observable, action, map, ObservableMap} from 'mobx';
import TickModel from "../models/tick";

export default class AppStore implements Stores.IApp {
	@observable currentUser;
}