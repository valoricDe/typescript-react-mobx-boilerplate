import React, {Component} from 'react';
import Relay from 'react-relay';
import {observer} from "mobx-react";
import {observable} from "mobx";
import Formsy from 'formsy-react';
import { Input, Row } from 'formsy-react-components';
import { ButtonToolbar, Button } from 'react-bootstrap';
import CreateQuestionMutation from "../../mutations/createQuestion";
import {Typeahead} from 'react-bootstrap-typeahead';
import {EditorState, convertToRaw, CompositeDecorator} from 'draft-js';
const exportHtml = require("draft-js-export-html");
import {MyEditor} from "./myEditor";
import {Draggable} from "react-touch";
import defaultRegExp from "../../lib/defaultRegExp";

//const HANDLE_REGEX = new RegExp('\\[\\s(['+defaultRegExp+'\\s]*?)\\s\\]\\(\\|\\)', 'g');
const HANDLE_REGEX = /\[\s([^\]]*)\s\]\(([^\|\)]*)\|?([^\)]*)\)/g;
const HASHTAG_REGEX = /#[\w\u0590-\u05ff]+/g;

function handleStrategy(contentBlock, callback) {
	findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

function hashtagStrategy(contentBlock, callback) {
	findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
	const text = contentBlock.getText();
	let matchArr, start;
	while ((matchArr = regex.exec(text)) !== null) {
		start = matchArr.index;
		callback(start, start + matchArr[0].length);
	}
}

const HashtagSpan = (props) => {
	return <span {...props} className="calculated-result">{props.children}</span>;
};

@observer
class CreateQuestionComponent extends Component<Props.ICreateQuestionProps, void> {
	@observable isValidInput = false;
	@observable editorReadOnly = false;
	selectedTagIds = [];
	editorDecorators = new CompositeDecorator([
			{
				strategy: handleStrategy,
				component: (props) => {
					console.log(props);
					return <span {...props} className="adjustable-number">{props.children}</span>
					/*return <Draggable
						style={{translateX: 0, translateY: 0}} position={{left: 0}}
						onMouseDown={(test) => { console.log('mouse start', test); this.editorReadOnly = true }} onTouchStart={(test) => { console.log('touch start', test); this.editorReadOnly = true }} onDragEnd={() => { console.log('drag end'); this.editorReadOnly = false }}
					>
						{(position, a, b, c, d) => {
							console.log(position, a,b,c,d);

						}}
					</Draggable>;*/
				}
			},
			{ strategy: hashtagStrategy, component: HashtagSpan },
		]);
	editorState = EditorState.createEmpty(this.editorDecorators);



	save = (item) => {
		console.log('CreateQuestion::save', item);

		const contentState = this.editorState.getCurrentContent();
		const editorContentRaw = convertToRaw(contentState);
		console.log(editorContentRaw);

		item.description = exportHtml.stateToHTML(this.editorState.getCurrentContent());
		item.tagIds = this.selectedTagIds;
		const onSuccess = () => this.props.router.push('/questions');
		this.props.relay.commitUpdate(
			new CreateQuestionMutation({store: this.props.store, newItem: item}),
			{onSuccess: onSuccess, onFailure: console.error}
		);
	};

	cancel = () => {
		this.props.router.push('/questions');
	};

	searchTags = (query: any) => {
		if(query.length >= 2)
			this.props.relay.setVariables({query: query});
	};

	onSelectedTag = (selections) => {
		this.selectedTagIds = selections.map(option => option.id);
	};

	public render(): JSX.Element {
		const store = this.props.store;
		console.log("Relay", this.props.relay);
		const item = {title: '', description: ''};

		const contentState = this.editorState.getCurrentContent();
		const editorContentRaw = convertToRaw(contentState);
		console.log(editorContentRaw);
		console.log(exportHtml.stateToHTML(this.editorState.getCurrentContent()));

		const titleFieldStyles = {"paddingRight":"16px","lineHeight":"56px","fontSize":"20px","position":"relative","textOverflow":"ellipsis","whiteSpace":"nowrap","overflow":"hidden","color":"rgba(0, 0, 0, 0.4)"};

		return (
			<div>
				<h2 className="page-header">Create Question</h2>
				<Formsy.Form ref="form" onValidSubmit={(item) => this.save(item)} onValid={() => this.isValidInput = true} onInvalid={() => this.isValidInput = false}>
					<fieldset>
						<Input label="Title" value={item.title} placeholder={item.title} required name="title" validations={{matchRegexp: /\S+/}} style={titleFieldStyles} validationError="Title field is required" />
						<Row label="Description" for="description" required layout="horizontal">
							<MyEditor editorState={this.editorState} readOnly={this.editorReadOnly} />
						</Row>
						<Row label="Tags" for="tags" required layout="horizontal">
							<Typeahead
								multiple={true}
								minLength={2}
								labelKey="name"
								onChange={this.onSelectedTag}
								onInputChange={this.searchTags}
								options={store.searchTags ? store.searchTags.edges.map(e => e.node) : []}
							/>
							{this.props.relay.pendingVariables && this.props.relay.pendingVariables.hasOwnProperty('query')?
								<p>Loading matching tags.</p> :
								<p>Retrieved {store.searchTags ? store.searchTags.totalCount : "0"} tags.</p>
							}
						</Row>

						<ButtonToolbar className="content__panelButtonToolbar pull-right" key="buttonToolbar">
							<Button bsStyle="primary" type="submit" disabled={!this.isValidInput} key="save">Save</Button>
							<Button onClick={this.cancel} bsStyle="danger" key="cancel">Cancel</Button>
						</ButtonToolbar>
					</fieldset>
				</Formsy.Form>
			</div>
		);
	}
}


const CreateQuestion = Relay.createContainer(CreateQuestionComponent, {
	initialVariables: {
		query: null
	},
	prepareVariables: vars => {
		vars['queryIsTruthy'] = !!vars['query'];
		return vars;
	},
	fragments: {
		store: () => Relay.QL`
    		fragment on Query {
                searchTags(search: $query, first: 20) @include(if: $queryIsTruthy) {
                    totalCount
                    edges {
                        node {
							id: rowId
							name
                        }
                    }
                }
    			${CreateQuestionMutation.getFragment('store')}
			}`,
	},
});

export default CreateQuestion;