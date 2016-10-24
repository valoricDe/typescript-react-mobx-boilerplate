declare namespace Props {
	interface IApp extends Stores.IStores {}

	namespace Content {
		interface IContent extends IApp {}

		interface IQuestion {
			id: string
			title: string
			description: string
			rowId: number
			author: IUser
		}

		interface IUser {
			id: string
			rowId: number
			username: string
		}

		interface ILabel {
			value: string | number;
		}
	}

	namespace Common {
		interface ICenter extends React.HTMLProps<HTMLDivElement> {}
	}
}
