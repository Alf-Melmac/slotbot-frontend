import {Extension} from '@tiptap/react';
import {Editor} from '@tiptap/core';
import {Heading} from '@tiptap/extension-heading';
import {Text} from '@tiptap/extension-text';
import {Underline} from '@tiptap/extension-underline';
import {Bold} from '@tiptap/extension-bold';
import {Italic} from '@tiptap/extension-italic';
import {Strike} from '@tiptap/extension-strike';

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
		element.content.forEach((node, i) => {
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
				if (i === 0 && item.startsWith('#')) {
					item = `\\${item}`; //escape fake headings
				}
				markdown += item;
			}
		});
	});
	return markdown;
}

function escape(text: string): string {
	return text.replace(/([*_`~\\])/g, '\\$1')
		.replace(/^#/g, '\\#');
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
