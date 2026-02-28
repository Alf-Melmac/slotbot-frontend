import {RichTextEditor} from '@mantine/tiptap';
import {Document} from '@tiptap/extension-document';
import {Text} from '@tiptap/extension-text';
import {useEditor} from '@tiptap/react';
import {BubbleMenu, FloatingMenu} from '@tiptap/react/menus';
import {JSX} from 'react';
import {useLanguage} from '../../../../contexts/language/Language';
import {Heading} from '@tiptap/extension-heading';
import {Paragraph} from '@tiptap/extension-paragraph';
import {Bold} from '@tiptap/extension-bold';
import {Italic} from '@tiptap/extension-italic';
import {Underline} from '@tiptap/extension-underline';
import {Placeholder, UndoRedo} from '@tiptap/extensions';
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
import {useEventAction} from '../../../../contexts/event/action/EventActionContext';
import {BulletList, ListItem, ListKeymap, OrderedList} from '@tiptap/extension-list';
import {Small} from '../../../../utils/tiptap/Small';
import {RTEControlSmall} from '../../../../utils/tiptap/RTEControlSmall';
import {useCharacterCountCache} from '../../../../contexts/event/action/CharacterCountCacheContext';

export type EventDescriptionProps = {
	/**
	 * Function to show the description if the user triggered an action related to this description
	 */
	showDescription?: () => void;
}

export function EventDescription({showDescription}: Readonly<EventDescriptionProps>): JSX.Element {
	const form = useFormContext();
	const {setCharacterCount} = useCharacterCountCache();

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
			Small,
			ListItem,
			BulletList,
			OrderedList,
			ListKeymap,
			Placeholder.configure({placeholder: t('description')}),
			UndoRedo,
			DiscordMarkdown,
			DiscordMarkdownCharacterCount.configure({limit: EMBEDDABLE_DESCRIPTION}),
		],
		shouldRerenderOnTransaction: true,
		content: form.values.description,
		onUpdate: ({editor}) => {
			// Update cache before validation is triggered by form update
			setCharacterCount('description', editor.storage.characterCount.characters());

			form.setFieldValue('description', editor.getHTML());
		},
	});

	const {mutate} = useEventTextChange('description', form.values.description, () => form.resetDirty());

	return <>
		<Input.Wrapper error={form.errors.description}>
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
						<RTEControlSmall/>
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
				{editor && <>
					<BubbleMenu editor={editor}>
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.Bold/>
							<RichTextEditor.Italic/>
							<RichTextEditor.Underline/>
							<RichTextEditor.Strikethrough/>
						</RichTextEditor.ControlsGroup>
					</BubbleMenu>
					<FloatingMenu editor={editor}>
						<RichTextEditor.ControlsGroup>
							<RichTextEditor.H1/>
							<RichTextEditor.H2/>
							<RichTextEditor.H3/>
						</RichTextEditor.ControlsGroup>
					</FloatingMenu>
				</>}
				<RichTextEditor.Content/>
			</RichTextEditor>
		</Input.Wrapper>

		<Group justify={'space-between'} align={'flex-start'} mt={'xs'}>
			{editor?.isFocused &&
				<CounterBadge currentValue={editor.storage.characterCount.characters()}
							  maxValue={EMBEDDABLE_DESCRIPTION}/>
			}
			{useEventAction().editMode &&
				<Box ml={'auto'}>
					<ScrollAffix show={form.isDirty('description')} onScroll={showDescription}>
						<PulsatingButton onClick={() => mutate()}
										 disabled={!form.isDirty('description') || !!form.errors.description}>
							<T k={'action.save'}/>
						</PulsatingButton>
					</ScrollAffix>
				</Box>
			}
		</Group>
	</>;
}
