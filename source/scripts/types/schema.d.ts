// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    message: string;            // Required for all errors
    locations?: Array<IGraphQLResponseErrorLocation>;
    [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  /*
    description: The root query type which gives access points into the data universe.
  */
  interface IQuery {
    __typename: string;
    node: Node;
    crypt: string;
    currentUser: IUser;
    dearmor: string;
    decrypt: string;
    decryptIv: string;
    encrypt: string;
    encryptIv: string;
    pgpKeyId: string;
    userFullname: string;
    allQuestions: IQuestionsConnection;
    question: IQuestion;
    questionByRowId: IQuestion;
    allUsers: IUsersConnection;
    user: IUser;
    userByRowId: IUser;
    userByUsername: IUser;
    query: IQuery;
    id: string;
  }

  /*
    description: An object with a globally unique `ID`.
  */
  type Node = IQuery | IUser | IQuestion;

  /*
    description: An object with a globally unique `ID`.
  */
  interface INode extends IQuery, IUser, IQuestion {
    __typename: string;
    id: string;
  }

  /*
    description: null
  */
  interface IUser {
    __typename: string;
    id: string;
    rowId: number;
    username: any;
    firstName: string;
    lastName: string;
    createdAt: any;
    questionsByAuthor: IQuestionsConnection;
  }

  /*
    description: Methods to use when ordering `Question`.
  */
  type IQuestionsOrderByEnum = "PRIMARY_KEY_ASC" | "PRIMARY_KEY_DESC" | "NATURAL" | "ID_ASC" | "ID_DESC" | "TITLE_ASC" | "TITLE_DESC" | "DESCRIPTION_ASC" | "DESCRIPTION_DESC" | "AUTHOR_ASC" | "AUTHOR_DESC";

  /*
    description: A connection to a list of `Question` values.
  */
  interface IQuestionsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    totalCount: number;
    edges: Array<IQuestionsEdge>;
    nodes: Array<IQuestion>;
  }

  /*
    description: Information about pagination in a connection.
  */
  interface IPageInfo {
    __typename: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: any;
    endCursor: any;
  }

  /*
    description: A `Question` edge in the connection.
  */
  interface IQuestionsEdge {
    __typename: string;
    cursor: any;
    node: IQuestion;
  }

  /*
    description: null
  */
  interface IQuestion {
    __typename: string;
    id: string;
    rowId: number;
    title: any;
    description: any;
    author: number;
    userByAuthor: IUser;
  }

  /*
    description: null
  */
  interface IUserInput {
    rowId?: number;
    username?: any;
    firstName?: string;
    lastName?: string;
    createdAt?: any;
  }

  /*
    description: A condition to be used against `Question` object types. All fields are tested for equality and combined with a logical ‘and.’
  */
  interface IQuestionCondition {
    rowId?: number;
    title?: any;
    description?: any;
    author?: number;
  }

  /*
    description: Methods to use when ordering `User`.
  */
  type IUsersOrderByEnum = "PRIMARY_KEY_ASC" | "PRIMARY_KEY_DESC" | "NATURAL" | "ID_ASC" | "ID_DESC" | "USERNAME_ASC" | "USERNAME_DESC" | "FIRST_NAME_ASC" | "FIRST_NAME_DESC" | "LAST_NAME_ASC" | "LAST_NAME_DESC" | "CREATED_AT_ASC" | "CREATED_AT_DESC";

  /*
    description: A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’
  */
  interface IUserCondition {
    rowId?: number;
    username?: any;
    firstName?: string;
    lastName?: string;
    createdAt?: any;
  }

  /*
    description: A connection to a list of `User` values.
  */
  interface IUsersConnection {
    __typename: string;
    pageInfo: IPageInfo;
    totalCount: number;
    edges: Array<IUsersEdge>;
    nodes: Array<IUser>;
  }

  /*
    description: A `User` edge in the connection.
  */
  interface IUsersEdge {
    __typename: string;
    cursor: any;
    node: IUser;
  }

  /*
    description: The root mutation type which contains root level fields which mutate data.
  */
  interface IMutation {
    __typename: string;
    authenticate: IAuthenticatePayload;
    genRandomBytes: IGenRandomBytesPayload;
    genRandomUuid: IGenRandomUuidPayload;
    registerUser: IRegisterUserPayload;
    createQuestion: ICreateQuestionPayload;
    updateQuestion: IUpdateQuestionPayload;
    updateQuestionByRowId: IUpdateQuestionPayload;
    deleteQuestion: IDeleteQuestionPayload;
    deleteQuestionByRowId: IDeleteQuestionPayload;
    createUser: ICreateUserPayload;
    updateUser: IUpdateUserPayload;
    updateUserByRowId: IUpdateUserPayload;
    updateUserByUsername: IUpdateUserPayload;
    deleteUser: IDeleteUserPayload;
    deleteUserByRowId: IDeleteUserPayload;
    deleteUserByUsername: IDeleteUserPayload;
  }

  /*
    description: All input for the `authenticate` mutation.
  */
  interface IAuthenticateInput {
    clientMutationId?: string;
    email: string;
    password: string;
  }

  /*
    description: The output of our `authenticate` mutation.
  */
  interface IAuthenticatePayload {
    __typename: string;
    clientMutationId: string;
    jwtToken: any;
    query: IQuery;
  }

  /*
    description: All input for the `genRandomBytes` mutation.
  */
  interface IGenRandomBytesInput {
    clientMutationId?: string;
    arg0: number;
  }

  /*
    description: The output of our `genRandomBytes` mutation.
  */
  interface IGenRandomBytesPayload {
    __typename: string;
    clientMutationId: string;
    string: string;
    query: IQuery;
  }

  /*
    description: All input for the `genRandomUuid` mutation.
  */
  interface IGenRandomUuidInput {
    clientMutationId?: string;
  }

  /*
    description: The output of our `genRandomUuid` mutation.
  */
  interface IGenRandomUuidPayload {
    __typename: string;
    clientMutationId: string;
    uuid: any;
    query: IQuery;
  }

  /*
    description: All input for the `registerUser` mutation.
  */
  interface IRegisterUserInput {
    clientMutationId?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }

  /*
    description: The output of our `registerUser` mutation.
  */
  interface IRegisterUserPayload {
    __typename: string;
    clientMutationId: string;
    user: IUser;
    query: IQuery;
  }

  /*
    description: All input for the `createQuestion` mutation.
  */
  interface ICreateQuestionInput {
    clientMutationId?: string;
    question: IQuestionInput;
  }

  /*
    description: null
  */
  interface IQuestionInput {
    rowId?: number;
    title: any;
    description: any;
    author: number;
  }

  /*
    description: The output of our `createQuestion` mutation.
  */
  interface ICreateQuestionPayload {
    __typename: string;
    clientMutationId: string;
    question: IQuestion;
    questionEdge: IQuestionsEdge;
    userByAuthor: IUser;
    query: IQuery;
  }

  /*
    description: All input for the `updateQuestion` mutation.
  */
  interface IUpdateQuestionInput {
    clientMutationId?: string;
    id: string;
    questionPatch: IQuestionPatch;
  }

  /*
    description: Represents an update to a `Question`. Fields that are set will be updated.
  */
  interface IQuestionPatch {
    rowId?: number;
    title?: any;
    description?: any;
    author?: number;
  }

  /*
    description: The output of our `updateQuestion` mutation.
  */
  interface IUpdateQuestionPayload {
    __typename: string;
    clientMutationId: string;
    question: IQuestion;
    userByAuthor: IUser;
    query: IQuery;
  }

  /*
    description: All input for the `updateQuestionByRowId` mutation.
  */
  interface IUpdateQuestionByRowIdInput {
    clientMutationId?: string;
    rowId: number;
    questionPatch: IQuestionPatch;
  }

  /*
    description: All input for the `deleteQuestion` mutation.
  */
  interface IDeleteQuestionInput {
    clientMutationId?: string;
    id: string;
  }

  /*
    description: The output of our `deleteQuestion` mutation.
  */
  interface IDeleteQuestionPayload {
    __typename: string;
    clientMutationId: string;
    question: IQuestion;
    deletedQuestionId: string;
    userByAuthor: IUser;
    query: IQuery;
  }

  /*
    description: All input for the `deleteQuestionByRowId` mutation.
  */
  interface IDeleteQuestionByRowIdInput {
    clientMutationId?: string;
    rowId: number;
  }

  /*
    description: All input for the `createUser` mutation.
  */
  interface ICreateUserInput {
    clientMutationId?: string;
    user: IUserInput;
  }

  /*
    description: The output of our `createUser` mutation.
  */
  interface ICreateUserPayload {
    __typename: string;
    clientMutationId: string;
    user: IUser;
    userEdge: IUsersEdge;
    query: IQuery;
  }

  /*
    description: All input for the `updateUser` mutation.
  */
  interface IUpdateUserInput {
    clientMutationId?: string;
    id: string;
    userPatch: IUserPatch;
  }

  /*
    description: Represents an update to a `User`. Fields that are set will be updated.
  */
  interface IUserPatch {
    rowId?: number;
    username?: any;
    firstName?: string;
    lastName?: string;
    createdAt?: any;
  }

  /*
    description: The output of our `updateUser` mutation.
  */
  interface IUpdateUserPayload {
    __typename: string;
    clientMutationId: string;
    user: IUser;
    query: IQuery;
  }

  /*
    description: All input for the `updateUserByRowId` mutation.
  */
  interface IUpdateUserByRowIdInput {
    clientMutationId?: string;
    rowId: number;
    userPatch: IUserPatch;
  }

  /*
    description: All input for the `updateUserByUsername` mutation.
  */
  interface IUpdateUserByUsernameInput {
    clientMutationId?: string;
    username: any;
    userPatch: IUserPatch;
  }

  /*
    description: All input for the `deleteUser` mutation.
  */
  interface IDeleteUserInput {
    clientMutationId?: string;
    id: string;
  }

  /*
    description: The output of our `deleteUser` mutation.
  */
  interface IDeleteUserPayload {
    __typename: string;
    clientMutationId: string;
    user: IUser;
    deletedUserId: string;
    query: IQuery;
  }

  /*
    description: All input for the `deleteUserByRowId` mutation.
  */
  interface IDeleteUserByRowIdInput {
    clientMutationId?: string;
    rowId: number;
  }

  /*
    description: All input for the `deleteUserByUsername` mutation.
  */
  interface IDeleteUserByUsernameInput {
    clientMutationId?: string;
    username: any;
  }
}

