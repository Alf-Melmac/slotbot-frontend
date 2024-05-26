import {RichTextEditor} from '@mantine/tiptap';
import {Document} from '@tiptap/extension-document';
import {Text} from '@tiptap/extension-text';
import {BubbleMenu, Extension, FloatingMenu, useEditor} from '@tiptap/react';
import {Editor} from '@tiptap/core';
import {Placeholder} from '@tiptap/extension-placeholder';
import {JSX} from 'react';
import {useLanguage} from '../../../../contexts/language/Language';
import {Heading} from '@tiptap/extension-heading';
import {Paragraph} from '@tiptap/extension-paragraph';
import {Bold} from '@tiptap/extension-bold';
import {Italic} from '@tiptap/extension-italic';
import {Underline} from '@tiptap/extension-underline';
import {History} from '@tiptap/extension-history';
import {NAV_HEIGHT} from '../../../../components/nav/Nav';
import {CharacterCount} from '@tiptap/extension-character-count';
import {EMBEDDABLE_DESCRIPTION} from '../../../../utils/maxLength';
import {CounterBadge} from '../../../../components/Form/CounterBadge';
import {Strike} from '@tiptap/extension-strike';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';

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
	return text.replace(/([*_~\\])/g, '\\$1')
		.replace(/^#/g, '\\#');
}

export function EventDescription(): JSX.Element {
	const form = useFormContext();

	const Markdown = Extension.create({
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

	const CustomCharacterCount = CharacterCount.extend({
		onBeforeCreate() {
			this.storage.characters = () => {
				return this.editor.storage.markdown.markdown().length;
			};
		},
	});

	const {t} = useLanguage();
	const editor = useEditor({
		extensions: [
			Document,
			Text,
			Paragraph,
			Bold,
			Italic,
			Underline,
			Strike,
			Heading.configure({levels: [1, 2, 3]}),
			Placeholder.configure({placeholder: t('description')}),
			History,
			CustomCharacterCount.configure({limit: EMBEDDABLE_DESCRIPTION}),
			Markdown,
		],
		content: form.values.description,
		onUpdate: ({editor}) => {
			form.setFieldValue('description', editor.getHTML());
		},
	});

	return (
		<>
			<RichTextEditor editor={editor} withCodeHighlightStyles={false}>
				<RichTextEditor.Toolbar sticky stickyOffset={NAV_HEIGHT}>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold/>
						<RichTextEditor.Italic/>
						<RichTextEditor.Underline/>
						<RichTextEditor.Strikethrough/>
					</RichTextEditor.ControlsGroup>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.H1/>
						<RichTextEditor.H2/>
						<RichTextEditor.H3/>
					</RichTextEditor.ControlsGroup>
					<RichTextEditor.ControlsGroup ml={'auto'}>
						<RichTextEditor.Undo/>
						<RichTextEditor.Redo/>
					</RichTextEditor.ControlsGroup>
				</RichTextEditor.Toolbar>
				{editor && <BubbleMenu editor={editor}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold/>
                        <RichTextEditor.Italic/>
                        <RichTextEditor.Underline/>
                        <RichTextEditor.Strikethrough/>
                    </RichTextEditor.ControlsGroup>
                </BubbleMenu>}
				{editor && (
					<FloatingMenu editor={editor}>
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.H1/>
							<RichTextEditor.H2/>
							<RichTextEditor.H3/>
						</RichTextEditor.ControlsGroup>
					</FloatingMenu>
				)}
				<RichTextEditor.Content/>
			</RichTextEditor>
			<CounterBadge currentValue={editor?.storage.characterCount.characters()} maxValue={EMBEDDABLE_DESCRIPTION}/>
		</>
	);
}
