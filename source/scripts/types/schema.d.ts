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
    currentUserId: number;
    dearmor: string;
    decrypt: string;
    decryptIv: string;
    encrypt: string;
    encryptIv: string;
    pgpKeyId: string;
    searchAnswers: ISearchAnswersConnection;
    searchQuestions: ISearchQuestionsConnection;
    searchTags: ISearchTagsConnection;
    tagsByParent: ITagsByParentConnection;
    allAnswers: IAnswersConnection;
    answer: IAnswer;
    answerByRowId: IAnswer;
    allAnswerVotes: IAnswerVotesConnection;
    answerVote: IAnswerVote;
    answerVoteByUserAndQuestionAndAnswer: IAnswerVote;
    allQuestions: IQuestionsConnection;
    question: IQuestion;
    questionByRowId: IQuestion;
    allQuestionModels: IQuestionModelsConnection;
    allQuestionTags: IQuestionTagsConnection;
    allQuestionVotes: IQuestionVotesConnection;
    questionVote: IQuestionVote;
    questionVoteByUserAndQuestion: IQuestionVote;
    allTags: ITagsConnection;
    tag: ITag;
    tagByRowId: ITag;
    allTagRelations: ITagRelationsConnection;
    tagRelation: ITagRelation;
    tagRelationByTag1: ITagRelation;
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
  type Node = IQuery | IUser | IQuestion | IAnswer | IAnswerVote | IQuestionVote | ITag | ITagRelation;

  /*
    description: An object with a globally unique `ID`.
  */
  interface INode extends IQuery, IUser, IQuestion, IAnswer, IAnswerVote, IQuestionVote, ITag, ITagRelation {
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
    fullName: string;
    questionsByAuthor: IQuestionsConnection;
    answersByAuthor: IAnswersConnection;
    answerVotesByUser: IAnswerVotesConnection;
    questionVotesByUser: IQuestionVotesConnection;
  }

  /*
    description: Methods to use when ordering `Question`.
  */
  type IQuestionsOrderByEnum = "PRIMARY_KEY_ASC" | "PRIMARY_KEY_DESC" | "NATURAL" | "ID_ASC" | "ID_DESC" | "TITLE_ASC" | "TITLE_DESC" | "DESCRIPTION_ASC" | "DESCRIPTION_DESC" | "AUTHOR_ASC" | "AUTHOR_DESC";

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
    answerSearch: IQuestionAnswerSearchConnection;
    answersOrderedByVote: IQuestionAnswersOrderedByVoteConnection;
    vote: number;
    userByAuthor: IUser;
    answersByQuestion: IAnswersConnection;
    answerVotesByQuestion: IAnswerVotesConnection;
    questionVotesByQuestion: IQuestionVotesConnection;
    questionTagsByQuestion: IQuestionTagsConnection;
    questionModelsByQuestionid: IQuestionModelsConnection;
  }

  /*
    description: Methods to use when ordering `Answer`.
  */
  type IQuestionAnswerSearchOrderByEnum = "NATURAL";

  /*
    description: A connection to a list of `Answer` values.
  */
  interface IQuestionAnswerSearchConnection {
    __typename: string;
    pageInfo: IPageInfo;
    totalCount: number;
    edges: Array<IQuestionAnswerSearchEdge>;
    nodes: Array<IAnswer>;
  }

  /*
    description: A `Answer` edge in the connection.
  */
  interface IQuestionAnswerSearchEdge {
    __typename: string;
    cursor: any;
    node: IAnswer;
  }

  /*
    description: null
  */
  interface IAnswer {
    __typename: string;
    id: string;
    rowId: number;
    text: any;
    question: number;
    author: number;
    answerVoteByCurrentUser: IAnswerVote;
    vote: number;
    questionByQuestion: IQuestion;
    userByAuthor: IUser;
    answerVotesByAnswer: IAnswerVotesConnection;
  }

  /*
    description: null
  */
  interface IAnswerVote {
    __typename: string;
    id: string;
    user: number;
    question: number;
    answer: number;
    subscribe: boolean;
    value: any;
    userByUser: IUser;
    questionByQuestion: IQuestion;
    answerByAnswer: IAnswer;
  }

  /*
    description: Methods to use when ordering `AnswerVote`.
  */
  type IAnswerVotesOrderByEnum = "PRIMARY_KEY_ASC" | "PRIMARY_KEY_DESC" | "NATURAL" | "USER_ASC" | "USER_DESC" | "QUESTION_ASC" | "QUESTION_DESC" | "ANSWER_ASC" | "ANSWER_DESC" | "SUBSCRIBE_ASC" | "SUBSCRIBE_DESC" | "VALUE_ASC" | "VALUE_DESC";

  /*
    description: A condition to be used against `AnswerVote` object types. All fields are tested for equality and combined with a logical ‘and.’
  */
  interface IAnswerVoteCondition {
    user?: number;
    question?: number;
    answer?: number;
    subscribe?: boolean;
    value?: any;
  }

  /*
    description: A connection to a list of `AnswerVote` values.
  */
  interface IAnswerVotesConnection {
    __typename: string;
    pageInfo: IPageInfo;
    totalCount: number;
    edges: Array<IAnswerVotesEdge>;
    nodes: Array<IAnswerVote>;
  }

  /*
    description: A `AnswerVote` edge in the connection.
  */
  interface IAnswerVotesEdge {
    __typename: string;
    cursor: any;
    node: IAnswerVote;
  }

  /*
    description: Methods to use when ordering `Answer`.
  */
  type IQuestionAnswersOrderedByVoteOrderByEnum = "NATURAL";

  /*
    description: A connection to a list of `Answer` values.
  */
  interface IQuestionAnswersOrderedByVoteConnection {
    __typename: string;
    pageInfo: IPageInfo;
    totalCount: number;
    edges: Array<IQuestionAnswersOrderedByVoteEdge>;
    nodes: Array<IAnswer>;
  }

  /*
    description: A `Answer` edge in the connection.
  */
  interface IQuestionAnswersOrderedByVoteEdge {
    __typename: string;
    cursor: any;
    node: IAnswer;
  }

  /*
    description: Methods to use when ordering `Answer`.
  */
  type IAnswersOrderByEnum = "PRIMARY_KEY_ASC" | "PRIMARY_KEY_DESC" | "NATURAL" | "ID_ASC" | "ID_DESC" | "TEXT_ASC" | "TEXT_DESC" | "QUESTION_ASC" | "QUESTION_DESC" | "AUTHOR_ASC" | "AUTHOR_DESC";

  /*
    description: A condition to be used against `Answer` object types. All fields are tested for equality and combined with a logical ‘and.’
  */
  interface IAnswerCondition {
    rowId?: number;
    text?: any;
    question?: number;
    author?: number;
  }

  /*
    description: A connection to a list of `Answer` values.
  */
  interface IAnswersConnection {
    __typename: string;
    pageInfo: IPageInfo;
    totalCount: number;
    edges: Array<IAnswersEdge>;
    nodes: Array<IAnswer>;
  }

  /*
    description: A `Answer` edge in the connection.
  */
  interface IAnswersEdge {
    __typename: string;
    cursor: any;
    node: IAnswer;
  }

  /*
    description: Methods to use when ordering `QuestionVote`.
  */
  type IQuestionVotesOrderByEnum = "PRIMARY_KEY_ASC" | "PRIMARY_KEY_DESC" | "NATURAL" | "USER_ASC" | "USER_DESC" | "QUESTION_ASC" | "QUESTION_DESC" | "SUBSCRIBE_ASC" | "SUBSCRIBE_DESC" | "VALUE_ASC" | "VALUE_DESC";

  /*
    description: A condition to be used against `QuestionVote` object types. All fields are tested for equality and combined with a logical ‘and.’
  */
  interface IQuestionVoteCondition {
    user?: number;
    question?: number;
    subscribe?: boolean;
    value?: any;
  }

  /*
    description: A connection to a list of `QuestionVote` values.
  */
  interface IQuestionVotesConnection {
    __typename: string;
    pageInfo: IPageInfo;
    totalCount: number;
    edges: Array<IQuestionVotesEdge>;
    nodes: Array<IQuestionVote>;
  }

  /*
    description: A `QuestionVote` edge in the connection.
  */
  interface IQuestionVotesEdge {
    __typename: string;
    cursor: any;
    node: IQuestionVote;
  }

  /*
    description: null
  */
  interface IQuestionVote {
    __typename: string;
    id: string;
    user: number;
    question: number;
    subscribe: boolean;
    value: any;
    userByUser: IUser;
    questionByQuestion: IQuestion;
  }

  /*
    description: Methods to use when ordering `QuestionTag`.
  */
  type IQuestionTagsOrderByEnum = "NATURAL" | "QUESTION_ASC" | "QUESTION_DESC" | "TAG_ASC" | "TAG_DESC";

  /*
    description: A condition to be used against `QuestionTag` object types. All fields are tested for equality and combined with a logical ‘and.’
  */
  interface IQuestionTagCondition {
    question?: number;
    tag?: number;
  }

  /*
    description: A connection to a list of `QuestionTag` values.
  */
  interface IQuestionTagsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    totalCount: number;
    edges: Array<IQuestionTagsEdge>;
    nodes: Array<IQuestionTag>;
  }

  /*
    description: A `QuestionTag` edge in the connection.
  */
  interface IQuestionTagsEdge {
    __typename: string;
    cursor: any;
    node: IQuestionTag;
  }

  /*
    description: null
  */
  interface IQuestionTag {
    __typename: string;
    question: number;
    tag: number;
    questionByQuestion: IQuestion;
    tagByTag: ITag;
  }

  /*
    description: null
  */
  interface ITag {
    __typename: string;
    id: string;
    rowId: number;
    name: string;
    description: string;
    parent: number;
    tagByParent: ITag;
    tagsByParent: ITagsConnection;
    questionTagsByTag: IQuestionTagsConnection;
    tagRelationsByTag1: ITagRelationsConnection;
    tagRelationsByTag2: ITagRelationsConnection;
  }

  /*
    description: Methods to use when ordering `Tag`.
  */
  type ITagsOrderByEnum = "PRIMARY_KEY_ASC" | "PRIMARY_KEY_DESC" | "NATURAL" | "ID_ASC" | "ID_DESC" | "NAME_ASC" | "NAME_DESC" | "DESCRIPTION_ASC" | "DESCRIPTION_DESC" | "PARENT_ASC" | "PARENT_DESC";

  /*
    description: A condition to be used against `Tag` object types. All fields are tested for equality and combined with a logical ‘and.’
  */
  interface ITagCondition {
    rowId?: number;
    name?: string;
    description?: string;
    parent?: number;
  }

  /*
    description: A connection to a list of `Tag` values.
  */
  interface ITagsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    totalCount: number;
    edges: Array<ITagsEdge>;
    nodes: Array<ITag>;
  }

  /*
    description: A `Tag` edge in the connection.
  */
  interface ITagsEdge {
    __typename: string;
    cursor: any;
    node: ITag;
  }

  /*
    description: Methods to use when ordering `TagRelation`.
  */
  type ITagRelationsOrderByEnum = "PRIMARY_KEY_ASC" | "PRIMARY_KEY_DESC" | "NATURAL" | "TAG1_ASC" | "TAG1_DESC" | "LINK_TYPE_ASC" | "LINK_TYPE_DESC" | "TAG2_ASC" | "TAG2_DESC";

  /*
    description: A condition to be used against `TagRelation` object types. All fields are tested for equality and combined with a logical ‘and.’
  */
  interface ITagRelationCondition {
    tag1?: number;
    linkType?: ILinkTypeEnum;
    tag2?: number;
  }

  /*
    description: null
  */
  type ILinkTypeEnum = "RELATES_TO";

  /*
    description: A connection to a list of `TagRelation` values.
  */
  interface ITagRelationsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    totalCount: number;
    edges: Array<ITagRelationsEdge>;
    nodes: Array<ITagRelation>;
  }

  /*
    description: A `TagRelation` edge in the connection.
  */
  interface ITagRelationsEdge {
    __typename: string;
    cursor: any;
    node: ITagRelation;
  }

  /*
    description: null
  */
  interface ITagRelation {
    __typename: string;
    id: string;
    tag1: number;
    linkType: ILinkTypeEnum;
    tag2: number;
    tagByTag1: ITag;
    tagByTag2: ITag;
  }

  /*
    description: Methods to use when ordering `QuestionModel`.
  */
  type IQuestionModelsOrderByEnum = "NATURAL" | "QUESTIONID_ASC" | "QUESTIONID_DESC" | "NAME_ASC" | "NAME_DESC" | "VALUE_ASC" | "VALUE_DESC" | "SOURCE_ASC" | "SOURCE_DESC" | "MIN_ASC" | "MIN_DESC" | "MAX_ASC" | "MAX_DESC" | "STEP_ASC" | "STEP_DESC";

  /*
    description: A condition to be used against `QuestionModel` object types. All fields are tested for equality and combined with a logical ‘and.’
  */
  interface IQuestionModelCondition {
    questionid?: number;
    name?: string;
    value?: string;
    source?: string;
    min?: number;
    max?: number;
    step?: number;
  }

  /*
    description: A connection to a list of `QuestionModel` values.
  */
  interface IQuestionModelsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    totalCount: number;
    edges: Array<IQuestionModelsEdge>;
    nodes: Array<IQuestionModel>;
  }

  /*
    description: A `QuestionModel` edge in the connection.
  */
  interface IQuestionModelsEdge {
    __typename: string;
    cursor: any;
    node: IQuestionModel;
  }

  /*
    description: null
  */
  interface IQuestionModel {
    __typename: string;
    questionid: number;
    name: string;
    value: string;
    source: string;
    min: number;
    max: number;
    step: number;
    questionByQuestionid: IQuestion;
  }

  /*
    description: Methods to use when ordering `Answer`.
  */
  type ISearchAnswersOrderByEnum = "NATURAL";

  /*
    description: A connection to a list of `Answer` values.
  */
  interface ISearchAnswersConnection {
    __typename: string;
    pageInfo: IPageInfo;
    totalCount: number;
    edges: Array<ISearchAnswersEdge>;
    nodes: Array<IAnswer>;
  }

  /*
    description: A `Answer` edge in the connection.
  */
  interface ISearchAnswersEdge {
    __typename: string;
    cursor: any;
    node: IAnswer;
  }

  /*
    description: Methods to use when ordering `Question`.
  */
  type ISearchQuestionsOrderByEnum = "NATURAL";

  /*
    description: A connection to a list of `Question` values.
  */
  interface ISearchQuestionsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    totalCount: number;
    edges: Array<ISearchQuestionsEdge>;
    nodes: Array<IQuestion>;
  }

  /*
    description: A `Question` edge in the connection.
  */
  interface ISearchQuestionsEdge {
    __typename: string;
    cursor: any;
    node: IQuestion;
  }

  /*
    description: Methods to use when ordering `Tag`.
  */
  type ISearchTagsOrderByEnum = "NATURAL";

  /*
    description: A connection to a list of `Tag` values.
  */
  interface ISearchTagsConnection {
    __typename: string;
    pageInfo: IPageInfo;
    totalCount: number;
    edges: Array<ISearchTagsEdge>;
    nodes: Array<ITag>;
  }

  /*
    description: A `Tag` edge in the connection.
  */
  interface ISearchTagsEdge {
    __typename: string;
    cursor: any;
    node: ITag;
  }

  /*
    description: Methods to use when ordering `Tag`.
  */
  type ITagsByParentOrderByEnum = "NATURAL";

  /*
    description: A connection to a list of `Tag` values.
  */
  interface ITagsByParentConnection {
    __typename: string;
    pageInfo: IPageInfo;
    totalCount: number;
    edges: Array<ITagsByParentEdge>;
    nodes: Array<ITag>;
  }

  /*
    description: A `Tag` edge in the connection.
  */
  interface ITagsByParentEdge {
    __typename: string;
    cursor: any;
    node: ITag;
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
    answerAnswerVote: IAnswerAnswerVotePayload;
    answerAnswerVoteCount: IAnswerAnswerVoteCountPayload;
    authenticate: IAuthenticatePayload;
    createQuestionWithTags: ICreateQuestionWithTagsPayload;
    genRandomBytes: IGenRandomBytesPayload;
    genRandomUuid: IGenRandomUuidPayload;
    registerUser: IRegisterUserPayload;
    upsertAnswerVoteByQuestionAndAnswer: IUpsertAnswerVoteByQuestionAndAnswerPayload;
    upsertTest: IUpsertTestPayload;
    createAnswer: ICreateAnswerPayload;
    updateAnswer: IUpdateAnswerPayload;
    updateAnswerByRowId: IUpdateAnswerPayload;
    deleteAnswer: IDeleteAnswerPayload;
    deleteAnswerByRowId: IDeleteAnswerPayload;
    createAnswerVote: ICreateAnswerVotePayload;
    updateAnswerVote: IUpdateAnswerVotePayload;
    updateAnswerVoteByUserAndQuestionAndAnswer: IUpdateAnswerVotePayload;
    deleteAnswerVote: IDeleteAnswerVotePayload;
    deleteAnswerVoteByUserAndQuestionAndAnswer: IDeleteAnswerVotePayload;
    createQuestion: ICreateQuestionPayload;
    updateQuestion: IUpdateQuestionPayload;
    updateQuestionByRowId: IUpdateQuestionPayload;
    deleteQuestion: IDeleteQuestionPayload;
    deleteQuestionByRowId: IDeleteQuestionPayload;
    createQuestionModel: ICreateQuestionModelPayload;
    createQuestionTag: ICreateQuestionTagPayload;
    createQuestionVote: ICreateQuestionVotePayload;
    updateQuestionVote: IUpdateQuestionVotePayload;
    updateQuestionVoteByUserAndQuestion: IUpdateQuestionVotePayload;
    deleteQuestionVote: IDeleteQuestionVotePayload;
    deleteQuestionVoteByUserAndQuestion: IDeleteQuestionVotePayload;
    createTag: ICreateTagPayload;
    updateTag: IUpdateTagPayload;
    updateTagByRowId: IUpdateTagPayload;
    deleteTag: IDeleteTagPayload;
    deleteTagByRowId: IDeleteTagPayload;
    createTagRelation: ICreateTagRelationPayload;
    updateTagRelation: IUpdateTagRelationPayload;
    updateTagRelationByTag1: IUpdateTagRelationPayload;
    deleteTagRelation: IDeleteTagRelationPayload;
    deleteTagRelationByTag1: IDeleteTagRelationPayload;
    createUser: ICreateUserPayload;
    updateUser: IUpdateUserPayload;
    updateUserByRowId: IUpdateUserPayload;
    updateUserByUsername: IUpdateUserPayload;
    deleteUser: IDeleteUserPayload;
    deleteUserByRowId: IDeleteUserPayload;
    deleteUserByUsername: IDeleteUserPayload;
  }

  /*
    description: All input for the `answerAnswerVote` mutation.
  */
  interface IAnswerAnswerVoteInput {
    clientMutationId?: string;
    answer?: IAnswerInput;
    value?: number;
    subscribe?: boolean;
  }

  /*
    description: null
  */
  interface IAnswerInput {
    rowId?: number;
    text: any;
    question: number;
    author: number;
  }

  /*
    description: The output of our `answerAnswerVote` mutation.
  */
  interface IAnswerAnswerVotePayload {
    __typename: string;
    clientMutationId: string;
    string: string;
    query: IQuery;
  }

  /*
    description: All input for the `answerAnswerVoteCount` mutation.
  */
  interface IAnswerAnswerVoteCountInput {
    clientMutationId?: string;
    questionId?: number;
    answerId?: number;
    value?: number;
    subscribe?: boolean;
  }

  /*
    description: The output of our `answerAnswerVoteCount` mutation.
  */
  interface IAnswerAnswerVoteCountPayload {
    __typename: string;
    clientMutationId: string;
    string: string;
    query: IQuery;
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
    description: All input for the `createQuestionWithTags` mutation.
  */
  interface ICreateQuestionWithTagsInput {
    clientMutationId?: string;
    title?: any;
    description?: any;
    author?: number;
    tagIds?: Array<number>;
  }

  /*
    description: The output of our `createQuestionWithTags` mutation.
  */
  interface ICreateQuestionWithTagsPayload {
    __typename: string;
    clientMutationId: string;
    question: IQuestion;
    questionEdge: IQuestionsEdge;
    userByAuthor: IUser;
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
    userEdge: IUsersEdge;
    query: IQuery;
  }

  /*
    description: All input for the `upsertAnswerVoteByQuestionAndAnswer` mutation.
  */
  interface IUpsertAnswerVoteByQuestionAndAnswerInput {
    clientMutationId?: string;
    questionId?: number;
    answerId?: number;
    value?: number;
    subscribe?: boolean;
  }

  /*
    description: The output of our `upsertAnswerVoteByQuestionAndAnswer` mutation.
  */
  interface IUpsertAnswerVoteByQuestionAndAnswerPayload {
    __typename: string;
    clientMutationId: string;
    answer: IAnswer;
    answerEdge: IAnswersEdge;
    questionByQuestion: IQuestion;
    userByAuthor: IUser;
    query: IQuery;
  }

  /*
    description: All input for the `upsertTest` mutation.
  */
  interface IUpsertTestInput {
    clientMutationId?: string;
    questionId?: number;
    answerId?: number;
    value?: number;
    subscribe?: boolean;
  }

  /*
    description: The output of our `upsertTest` mutation.
  */
  interface IUpsertTestPayload {
    __typename: string;
    clientMutationId: string;
    boolean: boolean;
    query: IQuery;
  }

  /*
    description: All input for the `createAnswer` mutation.
  */
  interface ICreateAnswerInput {
    clientMutationId?: string;
    answer: IAnswerInput;
  }

  /*
    description: The output of our `createAnswer` mutation.
  */
  interface ICreateAnswerPayload {
    __typename: string;
    clientMutationId: string;
    answer: IAnswer;
    answerEdge: IAnswersEdge;
    questionByQuestion: IQuestion;
    userByAuthor: IUser;
    query: IQuery;
  }

  /*
    description: All input for the `updateAnswer` mutation.
  */
  interface IUpdateAnswerInput {
    clientMutationId?: string;
    id: string;
    answerPatch: IAnswerPatch;
  }

  /*
    description: Represents an update to a `Answer`. Fields that are set will be updated.
  */
  interface IAnswerPatch {
    rowId?: number;
    text?: any;
    question?: number;
    author?: number;
  }

  /*
    description: The output of our `updateAnswer` mutation.
  */
  interface IUpdateAnswerPayload {
    __typename: string;
    clientMutationId: string;
    answer: IAnswer;
    questionByQuestion: IQuestion;
    userByAuthor: IUser;
    query: IQuery;
  }

  /*
    description: All input for the `updateAnswerByRowId` mutation.
  */
  interface IUpdateAnswerByRowIdInput {
    clientMutationId?: string;
    rowId: number;
    answerPatch: IAnswerPatch;
  }

  /*
    description: All input for the `deleteAnswer` mutation.
  */
  interface IDeleteAnswerInput {
    clientMutationId?: string;
    id: string;
  }

  /*
    description: The output of our `deleteAnswer` mutation.
  */
  interface IDeleteAnswerPayload {
    __typename: string;
    clientMutationId: string;
    answer: IAnswer;
    deletedAnswerId: string;
    questionByQuestion: IQuestion;
    userByAuthor: IUser;
    query: IQuery;
  }

  /*
    description: All input for the `deleteAnswerByRowId` mutation.
  */
  interface IDeleteAnswerByRowIdInput {
    clientMutationId?: string;
    rowId: number;
  }

  /*
    description: All input for the `createAnswerVote` mutation.
  */
  interface ICreateAnswerVoteInput {
    clientMutationId?: string;
    answerVote: IAnswerVoteInput;
  }

  /*
    description: null
  */
  interface IAnswerVoteInput {
    user: number;
    question: number;
    answer: number;
    subscribe?: boolean;
    value?: any;
  }

  /*
    description: The output of our `createAnswerVote` mutation.
  */
  interface ICreateAnswerVotePayload {
    __typename: string;
    clientMutationId: string;
    answerVote: IAnswerVote;
    answerVoteEdge: IAnswerVotesEdge;
    userByUser: IUser;
    questionByQuestion: IQuestion;
    answerByAnswer: IAnswer;
    query: IQuery;
  }

  /*
    description: All input for the `updateAnswerVote` mutation.
  */
  interface IUpdateAnswerVoteInput {
    clientMutationId?: string;
    id: string;
    answerVotePatch: IAnswerVotePatch;
  }

  /*
    description: Represents an update to a `AnswerVote`. Fields that are set will be updated.
  */
  interface IAnswerVotePatch {
    user?: number;
    question?: number;
    answer?: number;
    subscribe?: boolean;
    value?: any;
  }

  /*
    description: The output of our `updateAnswerVote` mutation.
  */
  interface IUpdateAnswerVotePayload {
    __typename: string;
    clientMutationId: string;
    answerVote: IAnswerVote;
    userByUser: IUser;
    questionByQuestion: IQuestion;
    answerByAnswer: IAnswer;
    query: IQuery;
  }

  /*
    description: All input for the `updateAnswerVoteByUserAndQuestionAndAnswer` mutation.
  */
  interface IUpdateAnswerVoteByUserAndQuestionAndAnswerInput {
    clientMutationId?: string;
    user: number;
    question: number;
    answer: number;
    answerVotePatch: IAnswerVotePatch;
  }

  /*
    description: All input for the `deleteAnswerVote` mutation.
  */
  interface IDeleteAnswerVoteInput {
    clientMutationId?: string;
    id: string;
  }

  /*
    description: The output of our `deleteAnswerVote` mutation.
  */
  interface IDeleteAnswerVotePayload {
    __typename: string;
    clientMutationId: string;
    answerVote: IAnswerVote;
    deletedAnswerVoteId: string;
    userByUser: IUser;
    questionByQuestion: IQuestion;
    answerByAnswer: IAnswer;
    query: IQuery;
  }

  /*
    description: All input for the `deleteAnswerVoteByUserAndQuestionAndAnswer` mutation.
  */
  interface IDeleteAnswerVoteByUserAndQuestionAndAnswerInput {
    clientMutationId?: string;
    user: number;
    question: number;
    answer: number;
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
    description: All input for the `createQuestionModel` mutation.
  */
  interface ICreateQuestionModelInput {
    clientMutationId?: string;
    questionModel: IQuestionModelInput;
  }

  /*
    description: null
  */
  interface IQuestionModelInput {
    questionid?: number;
    name?: string;
    value?: string;
    source?: string;
    min?: number;
    max?: number;
    step?: number;
  }

  /*
    description: The output of our `createQuestionModel` mutation.
  */
  interface ICreateQuestionModelPayload {
    __typename: string;
    clientMutationId: string;
    questionModel: IQuestionModel;
    questionModelEdge: IQuestionModelsEdge;
    questionByQuestionid: IQuestion;
    query: IQuery;
  }

  /*
    description: All input for the `createQuestionTag` mutation.
  */
  interface ICreateQuestionTagInput {
    clientMutationId?: string;
    questionTag: IQuestionTagInput;
  }

  /*
    description: null
  */
  interface IQuestionTagInput {
    question?: number;
    tag?: number;
  }

  /*
    description: The output of our `createQuestionTag` mutation.
  */
  interface ICreateQuestionTagPayload {
    __typename: string;
    clientMutationId: string;
    questionTag: IQuestionTag;
    questionTagEdge: IQuestionTagsEdge;
    questionByQuestion: IQuestion;
    tagByTag: ITag;
    query: IQuery;
  }

  /*
    description: All input for the `createQuestionVote` mutation.
  */
  interface ICreateQuestionVoteInput {
    clientMutationId?: string;
    questionVote: IQuestionVoteInput;
  }

  /*
    description: null
  */
  interface IQuestionVoteInput {
    user: number;
    question: number;
    subscribe?: boolean;
    value?: any;
  }

  /*
    description: The output of our `createQuestionVote` mutation.
  */
  interface ICreateQuestionVotePayload {
    __typename: string;
    clientMutationId: string;
    questionVote: IQuestionVote;
    questionVoteEdge: IQuestionVotesEdge;
    userByUser: IUser;
    questionByQuestion: IQuestion;
    query: IQuery;
  }

  /*
    description: All input for the `updateQuestionVote` mutation.
  */
  interface IUpdateQuestionVoteInput {
    clientMutationId?: string;
    id: string;
    questionVotePatch: IQuestionVotePatch;
  }

  /*
    description: Represents an update to a `QuestionVote`. Fields that are set will be updated.
  */
  interface IQuestionVotePatch {
    user?: number;
    question?: number;
    subscribe?: boolean;
    value?: any;
  }

  /*
    description: The output of our `updateQuestionVote` mutation.
  */
  interface IUpdateQuestionVotePayload {
    __typename: string;
    clientMutationId: string;
    questionVote: IQuestionVote;
    userByUser: IUser;
    questionByQuestion: IQuestion;
    query: IQuery;
  }

  /*
    description: All input for the `updateQuestionVoteByUserAndQuestion` mutation.
  */
  interface IUpdateQuestionVoteByUserAndQuestionInput {
    clientMutationId?: string;
    user: number;
    question: number;
    questionVotePatch: IQuestionVotePatch;
  }

  /*
    description: All input for the `deleteQuestionVote` mutation.
  */
  interface IDeleteQuestionVoteInput {
    clientMutationId?: string;
    id: string;
  }

  /*
    description: The output of our `deleteQuestionVote` mutation.
  */
  interface IDeleteQuestionVotePayload {
    __typename: string;
    clientMutationId: string;
    questionVote: IQuestionVote;
    deletedQuestionVoteId: string;
    userByUser: IUser;
    questionByQuestion: IQuestion;
    query: IQuery;
  }

  /*
    description: All input for the `deleteQuestionVoteByUserAndQuestion` mutation.
  */
  interface IDeleteQuestionVoteByUserAndQuestionInput {
    clientMutationId?: string;
    user: number;
    question: number;
  }

  /*
    description: All input for the `createTag` mutation.
  */
  interface ICreateTagInput {
    clientMutationId?: string;
    tag: ITagInput;
  }

  /*
    description: null
  */
  interface ITagInput {
    rowId?: number;
    name?: string;
    description?: string;
    parent?: number;
  }

  /*
    description: The output of our `createTag` mutation.
  */
  interface ICreateTagPayload {
    __typename: string;
    clientMutationId: string;
    tag: ITag;
    tagEdge: ITagsEdge;
    tagByParent: ITag;
    query: IQuery;
  }

  /*
    description: All input for the `updateTag` mutation.
  */
  interface IUpdateTagInput {
    clientMutationId?: string;
    id: string;
    tagPatch: ITagPatch;
  }

  /*
    description: Represents an update to a `Tag`. Fields that are set will be updated.
  */
  interface ITagPatch {
    rowId?: number;
    name?: string;
    description?: string;
    parent?: number;
  }

  /*
    description: The output of our `updateTag` mutation.
  */
  interface IUpdateTagPayload {
    __typename: string;
    clientMutationId: string;
    tag: ITag;
    tagByParent: ITag;
    query: IQuery;
  }

  /*
    description: All input for the `updateTagByRowId` mutation.
  */
  interface IUpdateTagByRowIdInput {
    clientMutationId?: string;
    rowId: number;
    tagPatch: ITagPatch;
  }

  /*
    description: All input for the `deleteTag` mutation.
  */
  interface IDeleteTagInput {
    clientMutationId?: string;
    id: string;
  }

  /*
    description: The output of our `deleteTag` mutation.
  */
  interface IDeleteTagPayload {
    __typename: string;
    clientMutationId: string;
    tag: ITag;
    deletedTagId: string;
    tagByParent: ITag;
    query: IQuery;
  }

  /*
    description: All input for the `deleteTagByRowId` mutation.
  */
  interface IDeleteTagByRowIdInput {
    clientMutationId?: string;
    rowId: number;
  }

  /*
    description: All input for the `createTagRelation` mutation.
  */
  interface ICreateTagRelationInput {
    clientMutationId?: string;
    tagRelation: ITagRelationInput;
  }

  /*
    description: null
  */
  interface ITagRelationInput {
    tag1: number;
    linkType?: ILinkTypeEnum;
    tag2?: number;
  }

  /*
    description: The output of our `createTagRelation` mutation.
  */
  interface ICreateTagRelationPayload {
    __typename: string;
    clientMutationId: string;
    tagRelation: ITagRelation;
    tagRelationEdge: ITagRelationsEdge;
    tagByTag1: ITag;
    tagByTag2: ITag;
    query: IQuery;
  }

  /*
    description: All input for the `updateTagRelation` mutation.
  */
  interface IUpdateTagRelationInput {
    clientMutationId?: string;
    id: string;
    tagRelationPatch: ITagRelationPatch;
  }

  /*
    description: Represents an update to a `TagRelation`. Fields that are set will be updated.
  */
  interface ITagRelationPatch {
    tag1?: number;
    linkType?: ILinkTypeEnum;
    tag2?: number;
  }

  /*
    description: The output of our `updateTagRelation` mutation.
  */
  interface IUpdateTagRelationPayload {
    __typename: string;
    clientMutationId: string;
    tagRelation: ITagRelation;
    tagByTag1: ITag;
    tagByTag2: ITag;
    query: IQuery;
  }

  /*
    description: All input for the `updateTagRelationByTag1` mutation.
  */
  interface IUpdateTagRelationByTag1Input {
    clientMutationId?: string;
    tag1: number;
    tagRelationPatch: ITagRelationPatch;
  }

  /*
    description: All input for the `deleteTagRelation` mutation.
  */
  interface IDeleteTagRelationInput {
    clientMutationId?: string;
    id: string;
  }

  /*
    description: The output of our `deleteTagRelation` mutation.
  */
  interface IDeleteTagRelationPayload {
    __typename: string;
    clientMutationId: string;
    tagRelation: ITagRelation;
    deletedTagRelationId: string;
    tagByTag1: ITag;
    tagByTag2: ITag;
    query: IQuery;
  }

  /*
    description: All input for the `deleteTagRelationByTag1` mutation.
  */
  interface IDeleteTagRelationByTag1Input {
    clientMutationId?: string;
    tag1: number;
  }

  /*
    description: All input for the `createUser` mutation.
  */
  interface ICreateUserInput {
    clientMutationId?: string;
    user: IUserInput;
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
