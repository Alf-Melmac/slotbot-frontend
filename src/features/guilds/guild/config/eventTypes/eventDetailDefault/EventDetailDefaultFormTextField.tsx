import {JSX} from 'react';
import {T} from '../../../../../../components/T';
import {Input} from '@mantine/core';
import {EventDetailDefaultFormItemProps} from './EventDetailDefaultFormItem';
import {useEditor} from '@tiptap/react';
import {Document} from '@tiptap/extension-document';
import {Text} from '@tiptap/extension-text';
import {Paragraph} from '@tiptap/extension-paragraph';
import {HardBreak} from '@tiptap/extension-hard-break';
import {Bold} from '@tiptap/extension-bold';
import {Italic} from '@tiptap/extension-italic';
import {Underline} from '@tiptap/extension-underline';
import {Strike} from '@tiptap/extension-strike';
import {Small} from '../../../../../../utils/tiptap/Small';
import {Link, RichTextEditor} from '@mantine/tiptap';
import {UndoRedo} from '@tiptap/extensions';
import {DiscordMarkdown} from '../../../../../../utils/tiptap/DiscordMarkdown';
import {DiscordMarkdownCharacterCount} from '../../../../../../utils/tiptap/DiscordMarkdownCharacterCount';
import {EMBEDDABLE_VALUE} from '../../../../../../utils/maxLength';
import {validate} from '../../../../../../utils/formHelper';
import classes from '../../../../../event/action/details/EventDetailsInfo.module.css';
import {BubbleMenu} from '@tiptap/react/menus';
import {RTEControlSmall} from '../../../../../../utils/tiptap/RTEControlSmall';
import {CounterBadge} from '../../../../../../components/Form/CounterBadge';

export function EventDetailDefaultFormTextField({form, index}: Readonly<EventDetailDefaultFormItemProps>): JSX.Element {
	const formPath = `fields.${index}.text`;
	const formInputProps = form.getInputProps(formPath);
	console.log(formInputProps);

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
			Small,
			Link,
			UndoRedo,
			DiscordMarkdown,
			DiscordMarkdownCharacterCount.configure({limit: EMBEDDABLE_VALUE}),
		],
		shouldRerenderOnTransaction: true,
		content: formInputProps.defaultValue,
		//FIXME onUpdate looses focus after any keypress https://discordapp.com/channels/854810300876062770/1457154933001551894
		onBlur: ({editor}) => {
			form.setFieldValue(formPath, editor.getHTML());

			form.setFieldError(formPath, validate(editor.storage.characterCount.characters() > EMBEDDABLE_VALUE,
				<T k={'validation.maxLength'} args={[EMBEDDABLE_VALUE]}/>));
		},
	});

	return <>
		<Input.Wrapper label={<T k={'event.details.default.standard'}/>}
					   key={form.key(formPath)} error={formInputProps.error}
					   flex={1} classNames={{root: Input.classes.wrapper}}>
			<RichTextEditor editor={editor} withCodeHighlightStyles={false} variant={'subtle'}
							classNames={{content: classes.content}}>
				{editor && <BubbleMenu editor={editor}>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold/>
						<RichTextEditor.Italic/>
						<RichTextEditor.Underline/>
						<RichTextEditor.Strikethrough/>
						<RTEControlSmall/>
						<RichTextEditor.Link/>
					</RichTextEditor.ControlsGroup>
				</BubbleMenu>}
				<RichTextEditor.Content/>
			</RichTextEditor>
		</Input.Wrapper>

		{editor?.isFocused &&
			<CounterBadge currentValue={editor.storage.characterCount.characters()} maxValue={EMBEDDABLE_VALUE}/>
		}
	</>;
}
