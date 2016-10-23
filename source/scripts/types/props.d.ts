declare namespace Props {
	interface IApp extends Stores.IStores {}

	namespace Content {
		interface IContent extends IApp {}

		interface IQuestion {
			id: string
			title: string
			description: string
			rowId: number
		}

		interface ILabel {
			value: string | number;
		}
	}

	namespace Common {
		interface ICenter extends React.HTMLProps<HTMLDivElement> {}
	}
}
