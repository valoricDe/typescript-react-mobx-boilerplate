import * as React from 'react';
import {RichUtils, Modifier, EditorState, SelectionState, convertToRaw, Entity} from 'draft-js';
import Button from "react-bootstrap/lib/Button";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
const Editor = require('draft-js-plugins-editor').default;
const createHashtagPlugin = require('draft-js-hashtag-plugin').default;
import 'draft-js-hashtag-plugin/lib/plugin.css';
const draftJsModelPlugin = require('../../lib/draft-js-model-plugin');
const createMentionPlugin = draftJsModelPlugin.default;
const createLinkifyPlugin = require('draft-js-linkify-plugin').default;
const defaultSuggestionsFilter = draftJsModelPlugin.defaultSuggestionsFilter;
import {Map, List} from 'immutable';
import {Draggable} from "react-touch";
import {observable} from "mobx";
import {observer} from "mobx-react";
import {Calculation} from "./calculation";
import decorateWithProps from 'decorate-component-with-props';
var math = require('mathjs');

//math.config({
// precision: 2
// });

math.createUnit(
	{
		dollar: {},
		euro: {},
		foo: {},
		bar: {
			definition: 'kg/foo',
			aliases: ['ba', 'barr', 'bars'],
			offset: 200
		},
		baz: '4 bar'
	},
	{
		override: true
	}
);

var scope = {};
math.eval('dollar = 0.92840 euro', scope);

const Entry = (props) => {
	const {
		mention,
		theme,
		searchValue, // eslint-disable-line no-unused-vars
		...parentProps
	} = props;

	return (
		<div {...parentProps}>
			<div className={theme.mentionSuggestionsEntryContainer}>
				<div className={theme.mentionSuggestionsEntryContainerLeft}>
					<div className={theme.mentionSuggestionsEntryText}>
						{mention.get('name')}
					</div>
				</div>

				<div className={theme.mentionSuggestionsEntryContainerRight}>
					<div className={theme.mentionSuggestionsEntryText}>
						{math.format(mention.get('value'), {precision: 2})}
					</div>
				</div>
			</div>
			<div className={theme.mentionSuggestionsEntryTitle}>
				{mention.get('source')}
			</div>
		</div>
	);
};

@observer
export class MyEditor extends React.Component<any, any> {
	@observable readOnly = false;

	constructor(props) {
		super(props);

		this.state = {editorState: props.editorState, suggestions: List(), models: Map()};

		const mentionPlugin = createMentionPlugin({
			mentionTrigger: '[ ',
			mentionRegExp: '[^\\]]*',
			mentionTriggerSuffix: ' ]',
			entityMutability: 'IMMUTABLE',
			/*positionSuggestions: ({ state, props }) => {
			 return {
			 transform: 'scaleY(1)',
			 transition: 'all 0.25s cubic-bezier(.3,1.2,.2,1)',
			 };
			 },*/
			//theme: {mentionSuggestions: 'mentionSuggestion mentionSuggestionPortal'}
			mentionComponent: decorateWithProps(Calculation, {
				models: this.state.models,
				updateModels: (models) => this.updateModels(models),
				setReadOnly: (readOnly) => this.setReadOnly(readOnly),
				getNodeFromNewMentionValue: (model, value) => this.getNodeFromNewMentionValue(model, value),
				recalculateModelValues: () => this.recalculateModelValues(),
			}),
			editorRepresentation: (mention, isEntry) => isEntry ? mention.get('name')+' ' : mention.get('node').toString(),
		});
		this.MentionSuggestions = mentionPlugin.MentionSuggestions;

		this.plugins = [
			mentionPlugin,
		];
	}

	updateModels(models) {
		this.setState({models});
	}

	setReadOnly(readonly) {
		this.readOnly = readonly;
	}

	onChange = (editorState) => {
		// TODO directly access entity map directy
		//const contentState = convertToRaw(this.state.editorState.getCurrentContent());
		//const models = Map(contentState.entityMap).toList().filter(v => v.type === entityType).map(v => v.data.mention);

		this.setState({editorState});
	}

	handleKeyCommand = (command) => {
		const {editorState} = this.state;
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	};

	onBoldClick = () => {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
	};

	onUnderlineClick = () => {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
	};

	defaultSuggestionsFilter(searchValue, suggestions) {
		const value = searchValue.toLowerCase();
		const filteredSuggestions = suggestions.filter((suggestion) => (
			!value || suggestion.get('name').toLowerCase().indexOf(value) > -1 || suggestion.get('value').toString().startsWith(value)
		));
		const size = Math.min(filteredSuggestions.size, 5);
		return filteredSuggestions.setSize(size);
	}

	onSearchChange = ({fullMatch, wordMatch}) => {
		this.setState({
			suggestions: this.defaultSuggestionsFilter(wordMatch, this.state.models.toList()),
		});
	};

	getNodeFromText(text) {
		try {
			return math.parse(text);
		}
		catch (error) {
			// try swapping assignement
			if (error.message.startsWith('Invalid left hand side of assignment operator')) {
				const expressions = text.split('=');
				try {
					return math.parse(expressions[1]+' = '+expressions[0]);
				}
				catch (error) {
					console.log('getNodeFromText', error);
					return null;
				}
			}
		}
	}

	getNodeFromNewMentionValue(mention, value) {
		let node = mention.get('node');
		if(node.isConstantNode) {
			node.value = String(value);
		}
		else if(node.value.isConstantNode) {
			node.value.value = String(value);
		}
		return mention;
	}

	recalculateModelValues() {
		this.setState({models: this.state.models.map(mention => mention.merge({value: mention.get('node').compile().eval(scope)}))});
	}

	onAddMention = ({mention, isEntry}) => {
		if (isEntry) {
			return mention;
		}

		let node = this.getNodeFromText(mention);
		if(!node) return;

		console.log('onAddMention', node);
		try {
			const value = node.compile().eval(scope);
			let name = node.name;
			let editable = node.isConstantNode || node.value.isConstantNode;
			const modelNames = this.state.models.map(model => model.get('name'));
			if(node.isAssignmentNode || node.isFunctionAssignmentNode) {
				if(modelNames.includes(name)) {
					return; // identifier already exists
				}
			}
			else {
				if(!name) {
					let i = 0;
					while(modelNames.includes('x' + i)) {
						i++;
					}
					name = 'x' + i;
				}
				node = this.getNodeFromText(name + ' = ' + mention);
				if(!node) return;
			}


			console.log('onAddMention', value);

			return Map({name, value, node, source: "http://example.org", editable});
		}
		catch (error) {
			console.log('onAddMention', error);
			return;
		}

		//console.log(node, parser.eval(mention.get('value')));
		//return mention.set('node', node);
		//this.setState({models: this.state.models.set(this.state.models.size, mention)});
	}

	render() {
		const {MentionSuggestions} = this;

		console.log("does rerender");

		const editorContainerStyle = {width: this.state.models.length ? '70%': '70%'};
		const modelsContainerStyle = {display: this.state.models.length ? 'block' : 'block', paddingLeft: '6px', borderLeft: '1px solid #ccc'};
		const modelsContainerHeadlineStyle = {margin: '0'};

		return (
			<div>
				<ButtonToolbar style={{paddingBottom: "2px"}}>
					<ButtonGroup>
						<Button onClick={this.onBoldClick}>Bold</Button>
						<Button onClick={this.onUnderlineClick}>Underline</Button>
					</ButtonGroup>
				</ButtonToolbar>
				<div className={"form-control editorPanels"+(this.readOnly ? ' noselect': '')} style={{height: 'auto'}}>
					<div style={editorContainerStyle}>
						<Editor
							editorState={this.state.editorState}
							onChange={this.onChange}
							plugins={this.plugins}
							handleKeyCommand={this.handleKeyCommand}
							spellCheck={true}
							readOnly={this.readOnly}
							handleBeforeInput={(chars: String) => {
								if (chars === '[') {
									const { editorState } = this.state;
									const content = editorState.getCurrentContent();
									const selection = editorState.getSelection();

									let textFunction = Modifier.insertText;
									let editorChangeType = 'insert-text';

									if(selection.getAnchorOffset() != selection.getFocusOffset() ) {
										textFunction = Modifier.replaceText;
										editorChangeType = 'replace-text';
									}

									const contentReplaced = textFunction(
											content,
											selection,
											"[  ]"
										);

									const selectionAfter = contentReplaced.getSelectionAfter();
									const contentReplaced2 = contentReplaced.set('selectionAfter', selectionAfter.merge({
												anchorOffset: selectionAfter.getAnchorOffset()-2,
												focusOffset: selectionAfter.getFocusOffset()-2
											}));
									const editorStateModified = EditorState.push(
											editorState,
											contentReplaced2,
											editorChangeType
										);

									this.setState({editorState:editorStateModified});
									return 'handled';
								}
								return 'not-handled';
							}}
							handleDrop={
								(selection, dataTransfer, isInternal) =>
								{ console.log('handleDrop', selection, dataTransfer, isInternal); return 'not-handled' }
							}
						/>
					</div>
					<div style={modelsContainerStyle}>
						<p className="calculation-headline" style={modelsContainerHeadlineStyle}>Calculations (started by typing "["):</p>
						<ul style={{listStyleType: "none", padding: "0"}}>
							{this.state.models.map((v, i) => <li key={i}>{v.get('node').toString()}</li>).toArray()}
						</ul>
					</div>
				</div>

				<MentionSuggestions
					onSearchChange={this.onSearchChange}
					suggestions={this.state.suggestions}
					onAddMention={this.onAddMention}
					entryComponent={Entry}
				/>
			</div>
		);
	}
}