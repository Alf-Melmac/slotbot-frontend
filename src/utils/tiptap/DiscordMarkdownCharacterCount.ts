import {CharacterCount} from '@tiptap/extensions';

/**
 * Counting characters using the {@link DiscordMarkdown} to calculate length
 */
export const DiscordMarkdownCharacterCount = CharacterCount.extend({
	onBeforeCreate() {
		this.storage.characters = () => {
			// @ts-ignore TODO From our own extension
			return this.editor.storage.markdown.markdown().trim().length;
		};
	},
});
