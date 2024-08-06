import {Extension} from '@tiptap/react';
import {Editor} from '@tiptap/core';
import {Heading} from '@tiptap/extension-heading';
import {Text} from '@tiptap/extension-text';
import {Underline} from '@tiptap/extension-underline';
import {Bold} from '@tiptap/extension-bold';
import {Italic} from '@tiptap/extension-italic';
import {Strike} from '@tiptap/extension-strike';
import {BulletList} from '@tiptap/extension-bullet-list';
import {ListItem} from '@tiptap/extension-list-item';
import {Node} from 'prosemirror-model';
import {OrderedList} from '@tiptap/extension-ordered-list';

/**
 * Converts the editor content to discord markdown, closely matching the backend implementation
 */
function toMarkdown(editor: Editor): string {
	let markdown = '';
	editor.state.doc.content.forEach((element) => {
		if (markdown !== '') {
			markdown += '\n';
		}
		if (element.type.name === Heading.name) {
			markdown += `${'#'.repeat(element.attrs.level)} `;
		}

		markdown += fragmentToMarkdown(element);
	});
	return markdown;
}

function fragmentToMarkdown(parent: Node): string {
	let fragment = '';
	parent.content.forEach((node, i) => {
		if (node.type.name === Text.name) {
			let item = node.text;
			if (item === undefined) return;
			item = escape(item);
			node.marks.forEach((mark) => {
				if (mark.type.name === Underline.name) {
					item = `__${item}__`;
				} else if (mark.type.name === Bold.name) {
					item = `**${item}**`;
				} else if (mark.type.name === Italic.name) {
					item = `*${item}*`;
				} else if (mark.type.name === Strike.name) {
					item = `~~${item}~~`;
				}
			});
			fragment += item;
		} else if (node.type.name === ListItem.name) {
			if (parent.type.name === BulletList.name) {
				fragment += '- ';
			} else if (parent.type.name === OrderedList.name) {
				fragment += '1. ';
			}
			node.content.forEach(item => {
				fragment += fragmentToMarkdown(item) + '\n';
			});
		}
	});
	return fragment;
}

function escape(text: string): string {
	return text.replace(/([*_`~\\])/g, '\\$1')
		.replace(/^((?:#+|-)\s)/g, '\\$1')
		.replace(/^(\d)(\.\s)/g, '$1\\\\$2');
}

/**
 * Adds the editor content in discord markdown format to the storage
 */
export const DiscordMarkdown = Extension.create({
	name: 'markdown',

	addStorage() {
		return {
			markdown: () => '',
		};
	},

	onBeforeCreate() {
		this.storage.markdown = () => {
			return toMarkdown(this.editor);
		};
	},
});
