declare namespace Props {
	interface IApp extends Stores.IStores {}

	namespace Content {
		interface IContent extends IApp {}

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
