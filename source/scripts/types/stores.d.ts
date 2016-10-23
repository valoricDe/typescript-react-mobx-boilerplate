declare namespace Stores {
	interface IStores {
		questions: any;
		users: IUsers;
	}

	interface IApp {
		currentUser: Models.IUser;

	}

	interface IStore {
		collection: any;
		models: Map<string, Models.IModel>;
		isLoading: boolean;

		loadModels(): void;
		updateModelFromServer(json: JSON): void;
		createModel(json: JSON): this;
		removeModel(model: this): void;
	}

	interface IUsers extends IStore {

	}

	interface IQuestions extends IStore {

	}
}
