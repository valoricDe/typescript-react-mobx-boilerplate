declare namespace Props {
	interface IApp {
		store: Store.IStore;
	}

	interface IButton {
		onClick(): void;
	}

	interface ICenter extends __React.HTMLProps<HTMLDivElement> {}

	interface ILabel {
		value: number;
	}
}
