import {CharacterCount} from '@tiptap/extension-character-count';

/**
 * Counting characters using the {@link DiscordMarkdown} to calculate length
 */
export const DiscordMarkdownCharacterCount = CharacterCount.extend({
	onBeforeCreate() {
		this.storage.characters = () => {
			return this.editor.storage.markdown.markdown().length;
		};
	},
});
