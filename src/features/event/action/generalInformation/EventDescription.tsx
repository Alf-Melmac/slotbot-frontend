import {RichTextEditor} from '@mantine/tiptap';
import {Document} from '@tiptap/extension-document';
import {Text} from '@tiptap/extension-text';
import {BubbleMenu, FloatingMenu, useEditor} from '@tiptap/react';
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

type EventDescriptionProps = {};

export function EventDescription(props: EventDescriptionProps): JSX.Element {
	const {} = props;
	const form = useFormContext();

	const CustomCharacterCount = CharacterCount.extend({
		onBeforeCreate() {
			this.storage.characters = options => {
				const node = options?.node || this.editor.state.doc;

				let length = 0;
				node.content.forEach((paragraph, i) => {
					if (i !== 0) {
						length += 1; // new line
					}
					paragraph.content.forEach((text) => {
						const marks = text.marks;
						length += text.text?.length ?? 0;
						if (marks.length !== 0) {
							if (marks.some(mark => mark.type.name === Bold.name)) {
								length += 4; //**text**
							}
							if (marks.some(mark => mark.type.name === Italic.name)) {
								length += 2; //*text*
							}
							if (marks.some(mark => mark.type.name === Underline.name)) {
								length += 4; //__text__
							}
							if (marks.some(mark => mark.type.name === Strike.name)) {
								length += 4; //~~text~~
							}
						}
						if (paragraph.type.name === Heading.name) {
							console.log(paragraph.attrs.level);
							length += paragraph.attrs.level + 1; // # text
						}
					});
				});

				return length;
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
		],
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
