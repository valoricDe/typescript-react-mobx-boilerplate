declare namespace Props {
	import IQuestion = GQL.IQuestion;
	import IUser = GQL.IUser;
	import IQuestionsConnection = GQL.IQuestionsConnection;
	import IQuery = GQL.IQuery;

	interface IRelayComponent {
		relay: any
	}

	interface IMobxStateComponent {
		_state: Object
	}

	interface IComponent extends IRelayComponent, IMobxStateComponent {}

	interface IAppStateProps {
		questionList: IQuestionListStateProps
	}

	interface IAppProps extends IComponent {
		store: IQuery
		_state: IAppStateProps
	}

	interface IQuestionListStateProps {
		addQuestion: boolean
	}

	interface IQuestionListProps extends IComponent {
		store: IQuery
		_state: IQuestionListStateProps
		close(): void
	}

	interface IUserListStateProps {
		addEntry: boolean
	}

	interface IUserListProps extends IComponent {
		store: IQuery
		_state: IUserListStateProps
		close(): void
	}

	interface IQuestionProps extends IComponent {
		store: IQuestion
	}

	interface ICreateQuestionProps {
		save(JSON): void
		close(): void
	}

	interface IRegisterUserStateProps {
		show: boolean
		isValidInput: boolean
	}

	interface IRegisterUserProps extends IComponent {
		_state: IRegisterUserStateProps
	}

	interface IUserProps extends IComponent {
		store: IUser
	}

	interface IAuthorProfileProps extends IUserProps {}

	namespace Common {
		interface ICenter extends React.HTMLProps<HTMLDivElement> {}
	}
}
