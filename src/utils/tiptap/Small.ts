import {mergeAttributes, Node, textblockTypeInputRule} from '@tiptap/core';
import {Paragraph} from '@tiptap/extension-paragraph';

export interface SmallOptions {
	HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		small: {
			/**
			 * Set a small node
			 */
			setSmall: () => ReturnType,
			/**
			 * Toggle a small node
			 */
			toggleSmall: () => ReturnType,
		};
	}
}

const inputRegex = /^(-#)\s$/;

export const Small = Node.create<SmallOptions>({
	name: 'small',

	addOptions() {
		return {
			HTMLAttributes: {},
		};
	},

	content: 'inline*',

	group: 'block',

	defining: true,

	addAttributes() {
		return {
			rendered: false,
		};
	},

	parseHTML() {
		return [
			{
				tag: 'small',
			},
		];
	},

	renderHTML({HTMLAttributes}) {
		return ['small', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
	},

	addCommands() {
		return {
			setSmall: () => ({commands}) => {
				return commands.setNode(this.name);
			},
			toggleSmall: () => ({commands}) => {
				return commands.toggleNode(this.name, Paragraph.name);
			},
		};
	},

	addKeyboardShortcuts() {
		return {
			'Mod-,': () => this.editor.commands.toggleSmall(),
		};
	},

	addInputRules() {
		return [
			textblockTypeInputRule({
				find: inputRegex,
				type: this.type,
			}),
		];
	},
});
