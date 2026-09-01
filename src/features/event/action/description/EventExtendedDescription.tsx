import {Link, RichTextEditor} from '@mantine/tiptap';
import {useEditor} from '@tiptap/react';
import {BubbleMenu} from '@tiptap/react/menus';
import {JSX} from 'react';
import {useLanguage} from '../../../../contexts/language/Language';
import {Placeholder} from '@tiptap/extensions';
import {NAV_HEIGHT} from '../../../../components/nav/Nav';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {Group, Input} from '@mantine/core';
import {PulsatingButton} from '../../../../components/Button/PulsatingButton';
import {T} from '../../../../components/T';
import {ScrollAffix} from '../../../../components/Button/ScrollAffix';
import {useEventTextChange} from '../useEventUpdate';
import {useEventAction} from '../../../../contexts/event/action/EventActionContext';
import StarterKit from '@tiptap/starter-kit';
import SuperScript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import {Details, DetailsContent, DetailsSummary} from '@tiptap/extension-details';
import Highlight from '@tiptap/extension-highlight';
import {TableKit} from '@tiptap/extension-table';
import {TextAlign} from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import {ImageFileHandler, ImageUpload} from '../../../../utils/tiptap/ImageUpload';
import {faAlignLeft, faHeading} from '@fortawesome/free-solid-svg-icons';
import {ControlDropdown} from '../../../../utils/tiptap/ControlDropdown';
import {EventDescriptionProps} from './EventDescription';

export function EventExtendedDescription({showDescription}: Readonly<EventDescriptionProps>): JSX.Element {
	const form = useFormContext();

	const {t} = useLanguage();
	const editor = useEditor({
		extensions: [
			StarterKit.configure({link: false}),
			Link,
			Details, /*TODO details & table have no buttons https://mantine.dev/changelog/9-6-0/#richtexteditor-table-controls*/
			DetailsSummary,
			DetailsContent,
			TableKit,
			Highlight,
			SubScript,
			SuperScript,
			TextAlign.configure({types: ['heading', 'paragraph']}),
			Placeholder.configure({placeholder: t('event.extendedDescription')}),
			Image,
			ImageFileHandler,
		],
		shouldRerenderOnTransaction: true,
		content: form.values.extendedDescription,
		onUpdate: ({editor}) => {
			form.setFieldValue('extendedDescription', editor.getHTML());
		},
	});

	const {mutate} = useEventTextChange('extendedDescription', form.values.extendedDescription, () => form.resetDirty());

	return <>
		<Input.Wrapper error={form.errors.extendedDescription}>
			<RichTextEditor editor={editor} withCodeHighlightStyles={false}>
				<RichTextEditor.Toolbar sticky stickyOffset={NAV_HEIGHT}>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold/>
						<RichTextEditor.Italic/>
						<RichTextEditor.Underline/>
						<RichTextEditor.Strikethrough/>
						<RichTextEditor.Highlight/>
						<RichTextEditor.Subscript/>
						<RichTextEditor.Superscript/>
						<RichTextEditor.Code/>
						<RichTextEditor.ClearFormatting/>
					</RichTextEditor.ControlsGroup>
					<RichTextEditor.ControlsGroup>
						<ControlDropdown title={'editor.control.headings'} icon={faHeading}
										 items={[
											 RichTextEditor.H1,
											 RichTextEditor.H2,
											 RichTextEditor.H3,
											 RichTextEditor.H4,
										 ]}/>
						<ControlDropdown title={'editor.control.align'} icon={faAlignLeft}
										 items={[
											 RichTextEditor.AlignLeft,
											 RichTextEditor.AlignCenter,
											 RichTextEditor.AlignJustify,
											 RichTextEditor.AlignRight,
										 ]}/>
					</RichTextEditor.ControlsGroup>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.BulletList/>
						<RichTextEditor.OrderedList/>
						<RichTextEditor.Blockquote/>
						<RichTextEditor.Hr/>
					</RichTextEditor.ControlsGroup>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Link/>
						<ImageUpload/>
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
						<RichTextEditor.Highlight/>
						<RichTextEditor.Link/>
						<RichTextEditor.ClearFormatting/>
					</RichTextEditor.ControlsGroup>
				</BubbleMenu>}
				<RichTextEditor.Content/>
			</RichTextEditor>
		</Input.Wrapper>

		{useEventAction().editMode &&
			<Group mt={'xs'} justify={'flex-end'}>
				<ScrollAffix show={form.isDirty('extendedDescription')} onScroll={showDescription}>
					<PulsatingButton onClick={() => mutate()}
									 disabled={!form.isDirty('extendedDescription') || !!form.errors.extendedDescription}>
						<T k={'action.save'}/>
					</PulsatingButton>
				</ScrollAffix>
			</Group>
		}
	</>;
}
