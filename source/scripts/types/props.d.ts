import * as Relay from 'react-relay';
import Router from "react-router/lib/Router";

declare global {
	namespace Props {
		import IQuestion = GQL.IQuestion;
		import IUser = GQL.IUser;
		import IQuestionsConnection = GQL.IQuestionsConnection;
		import IQuery = GQL.IQuery;
		import IAnswer = GQL.IAnswer;
		import InjectedRouter = Router.InjectedRouter;
		import ITag = GQL.ITag;

		interface IRelayProps {
			relay: Relay.Store & Relay.RelayProp & any
		}

		interface IMobxStateProps {
			_state: Object
		}

		interface IRouterProps {
			router: InjectedRouter
			location?: any
		}

		interface IProps /*extends IRelayProps, IMobxStateProps, IRouterProps*/ {
		}

		interface IAppStateProps {
			questionList: IQuestionListStateProps
		}

		interface IAppProps extends IProps, IRouterProps {
			store: IQuery
			_state: IAppStateProps
		}

		interface IQuestionListStateProps {
			addQuestion: boolean
		}

		interface IQuestionListProps extends IProps {
			store: IQuery
			_state: IQuestionListStateProps
			user: IQuery
			close(): void
		}

		interface IUserListStateProps {
			addEntry: boolean
		}

		interface IUserListProps extends IProps {
			store: IQuery
			_state: IUserListStateProps
			close(): void
		}

		interface IQuestionProps extends IProps {
			store: IQuestion
			//user: IQuery
		}

		interface ICreateQuestionProps extends IProps {
			store: IQuery
			save(JSON): void
			close(): void
		}

		interface IAnswerProps extends IProps {
			store: IAnswer
			questionId: number
		}

		interface IAnswerListProps extends IProps {
			store: IQuestion
		}

		interface IAnswerVoteProps extends IProps {
			store: IAnswer
			questionId: number
		}

		interface ICreateAnswerProps extends IProps {
			id: number
			store: IQuestion
			save(JSON): void
			close(): void
		}

		interface IRegisterUserStateProps {
			show: boolean
			isValidInput: boolean
		}

		interface IRegisterUserProps extends IProps {
			_state: IRegisterUserStateProps
		}

		interface ILoginUserStateProps {
			show: boolean
			isValidInput: boolean
		}

		interface ILoginUserProps extends IProps {
			_state: ILoginUserStateProps
		}

		interface IUserProps extends IProps {
			store: IUser
			details?: boolean
			className?: string
		}

		interface IHomePageProps extends IProps {
			store: IUser
		}

		interface IAuthorProfileProps extends IUserProps {
		}

		interface ITagProps extends IProps {
			store: ITag
		}

		interface ITagListProps extends IProps {
			store: IQuery|ITag
		}

		interface IQuestionTagListProps extends IProps {
			store: IQuestion
		}

		namespace Common {
			interface ICenter extends React.HTMLProps<HTMLDivElement> {
			}
		}
	}
}