import {CharacterCount} from '@tiptap/extensions';

// noinspection JSUnusedGlobalSymbols
/**
 * Counting characters using the {@link DiscordMarkdown} to calculate length
 */
export const DiscordMarkdownCharacterCount = CharacterCount.extend({
	onBeforeCreate() {
		this.storage.characters = () => {
			return this.editor.storage.markdown.markdown().trim().length;
		};
	},
});
