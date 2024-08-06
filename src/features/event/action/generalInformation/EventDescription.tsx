import {RichTextEditor} from '@mantine/tiptap';
import {Document} from '@tiptap/extension-document';
import {Text} from '@tiptap/extension-text';
import {BubbleMenu, FloatingMenu, useEditor} from '@tiptap/react';
import {Placeholder} from '@tiptap/extension-placeholder';
import {JSX, useEffect, useState} from 'react';
import {useLanguage} from '../../../../contexts/language/Language';
import {Heading} from '@tiptap/extension-heading';
import {Paragraph} from '@tiptap/extension-paragraph';
import {Bold} from '@tiptap/extension-bold';
import {Italic} from '@tiptap/extension-italic';
import {Underline} from '@tiptap/extension-underline';
import {History} from '@tiptap/extension-history';
import {NAV_HEIGHT} from '../../../../components/nav/Nav';
import {EMBEDDABLE_DESCRIPTION} from '../../../../utils/maxLength';
import {CounterBadge} from '../../../../components/Form/CounterBadge';
import {Strike} from '@tiptap/extension-strike';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {HardBreak} from '@tiptap/extension-hard-break';
import {DiscordMarkdown} from '../../../../utils/tiptap/DiscordMarkdown';
import {DiscordMarkdownCharacterCount} from '../../../../utils/tiptap/DiscordMarkdownCharacterCount';
import {Box, Group, Input} from '@mantine/core';
import {PulsatingButton} from '../../../../components/Button/PulsatingButton';
import {T} from '../../../../components/T';
import {ScrollAffix} from '../../../../components/Button/ScrollAffix';
import {useEventTextChange} from '../useEventUpdate';
import {useEditMode} from '../../../../contexts/event/action/EditModeContext';
import {validate} from '../../../../utils/formHelper';
import {ListItem} from '@tiptap/extension-list-item';
import {BulletList} from '@tiptap/extension-bullet-list';
import {OrderedList} from '@tiptap/extension-ordered-list';

export function EventDescription(): JSX.Element {
	const form = useFormContext();
	const [isUpdateFromEditor, setIsUpdateFromEditor] = useState(false);

	const {t} = useLanguage();
	const editor = useEditor({
		extensions: [
			Document,
			Text,
			Paragraph,
			HardBreak,
			Bold,
			Italic,
			Underline,
			Strike,
			Heading.configure({levels: [1, 2, 3]}),
			ListItem,
			BulletList,
			OrderedList,
			Placeholder.configure({placeholder: t('description')}),
			History,
			DiscordMarkdown,
			DiscordMarkdownCharacterCount.configure({limit: EMBEDDABLE_DESCRIPTION}),
		],
		content: form.values.description,
		onUpdate: ({editor}) => {
			setIsUpdateFromEditor(true);
			form.setFieldValue('description', editor.getHTML());
			form.setFieldError('description', validate(editor.storage.characterCount.characters() > EMBEDDABLE_DESCRIPTION,
				<T k={'validation.maxLength'} args={[EMBEDDABLE_DESCRIPTION]}/>));
		},
	});

	useEffect(() => {
		if (!isUpdateFromEditor) {
			form.values.description && editor?.commands.setContent(form.values.description);
		}
		setIsUpdateFromEditor(false); // reset flag after checking
	}, [form.values.description]);

	const {mutate} = useEventTextChange('description', form.values.description, () => form.resetDirty());

	return (
		<>
			<Input.Wrapper label={<T k={'description'}/>} error={form.errors.description}>
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
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.BulletList/>
							<RichTextEditor.OrderedList/>
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
			</Input.Wrapper>

			<Group justify={'space-between'} align={'flex-start'} mt={'xs'}>
				{editor?.isFocused &&
                    <CounterBadge currentValue={editor?.storage.characterCount.characters()}
                                  maxValue={EMBEDDABLE_DESCRIPTION}/>
				}
				{useEditMode() &&
                    <Box ml={'auto'}>
                        <ScrollAffix show={form.isDirty('description')}>
                            <PulsatingButton onClick={() => mutate()}
                                             disabled={!form.isDirty('description') || !!form.errors.description}>
                                <T k={'action.save'}/>
                            </PulsatingButton>
                        </ScrollAffix>
                    </Box>
				}
			</Group>
		</>
	);
}
