declare namespace Props {
	interface IApp extends Store.IStores {}

	interface IContent extends IApp {}

	namespace Content {
		interface IButton {
			type: string;
			caption: string;
			onClick(): void;
		}

		interface ILabel {
			value: string | number;
		}
	}

	namespace Common {
		interface ICenter extends React.HTMLProps<HTMLDivElement> {}
	}
}
