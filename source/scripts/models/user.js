var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable, computed } from 'mobx';
import moment from "moment";
export default class User {
    constructor(store, id, username, name, password, created = moment().format("YYYY-MM-DD hh:mm:ss")) {
        this.autoSave = true;
        this.saveHandler = null;
        this.store = store;
        this.id = id;
        this.username = username;
        this.name = name;
        this.password = password;
        this.created = created;
    }
    remove() {
        this.store.collection.remove(this.id);
        this.store.removeTodo(this);
    }
    get asJson() {
        return {
            id: this.id,
            value: this.value,
        };
    }
    /**
     * Update this todo with information from the server
     */
    updateFromJson(json) {
        // make sure our changes aren't send back to the server
        this.autoSave = false;
        this.value = json.value;
        this.autoSave = true;
    }
    dispose() {
        // clean up the observer
        if (this && this.saveHandler !== null) {
            this.created();
        }
    }
}
__decorate([
    observable
], User.prototype, "username", void 0);
__decorate([
    observable
], User.prototype, "name", void 0);
__decorate([
    observable
], User.prototype, "password", void 0);
__decorate([
    observable
], User.prototype, "created", void 0);
__decorate([
    computed
], User.prototype, "asJson", null);
;
//# sourceMappingURL=user.js.map