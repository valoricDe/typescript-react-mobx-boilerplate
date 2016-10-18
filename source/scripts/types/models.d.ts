declare namespace Models {

	interface IModel {
		store: Stores.IStore;
		autoSave: boolean;
		saveHandler(): void;
		id: string;
		remove(): void;
		updateFromJson(json: JSON): void;
		dispose(): void;
	}

	interface IModelBase {
		created: string;
	}

	interface IUser extends IModelBase {
		username: string;
		name: string;
		password: string;
	}

	interface IAuthoredModel extends IModelBase {
		author: IUser;
	}

	interface IQuestion extends IAuthoredModel {
		title: string;
		description: string;
		voteCount: number;
		favoredCount: number;
		tags: ITag[];
	}

	interface ITag extends IModelBase {
		title: string;
		description: string;
		description: string;
	}

	interface IAnswer extends IAuthoredModel {
		text: string;
		voteCount: number;
	}
}
