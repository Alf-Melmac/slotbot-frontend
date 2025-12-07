import {JSX} from 'react';
import {useEditor} from '@tiptap/react';
import {BubbleMenu} from '@tiptap/react/menus';
import {Document} from '@tiptap/extension-document';
import {Text} from '@tiptap/extension-text';
import {Bold} from '@tiptap/extension-bold';
import {Italic} from '@tiptap/extension-italic';
import {Underline} from '@tiptap/extension-underline';
import {Strike} from '@tiptap/extension-strike';
import {Placeholder, UndoRedo} from '@tiptap/extensions';
import {DiscordMarkdown} from '../../../../utils/tiptap/DiscordMarkdown';
import {DiscordMarkdownCharacterCount} from '../../../../utils/tiptap/DiscordMarkdownCharacterCount';
import {TextKey, useLanguage} from '../../../../contexts/language/Language';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {Input} from '@mantine/core';
import {RichTextEditor} from '@mantine/tiptap';
import {Paragraph} from '@tiptap/extension-paragraph';
import classes from './EventDetailsInfo.module.css';
import {CounterBadge} from '../../../../components/Form/CounterBadge';
import {T} from '../../../../components/T';
import {requiredField, validate} from '../../../../utils/formHelper';
import {Small} from '../../../../utils/tiptap/Small';
import {HardBreak} from '@tiptap/extension-hard-break';
import {RTEControlSmall} from '../../../../utils/tiptap/RTEControlSmall';

type EventDetailsInfoInputProps = {
	placeholder: TextKey;
	maxLength: number;
	flex: number;
}

type EventDetailsInfoProps = {
	inputProps: EventDetailsInfoInputProps;
	formPath: string;
	/** Forces edit mode in form context **/
	overrideFormContextEditMode?: boolean;
};

export function EventDetailsInfo({
									 inputProps: {placeholder, maxLength, flex},
									 formPath,
									 overrideFormContextEditMode = false,
								 }: Readonly<EventDetailsInfoProps>): JSX.Element {
	const form = useFormContext(overrideFormContextEditMode ? true : undefined);
	const formInputProps = form.getInputProps(formPath);

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
			Small,
			Placeholder.configure({placeholder: t(placeholder)}),
			UndoRedo,
			DiscordMarkdown,
			DiscordMarkdownCharacterCount.configure({limit: maxLength}),
		],
		shouldRerenderOnTransaction: true,
		content: formInputProps.value,
		onUpdate: ({editor}) => {
			form.setFieldValue(formPath, editor.getHTML());
			const characters = editor.storage.characterCount.characters();
			form.setFieldError(formPath, requiredField(characters, () => validate(characters > maxLength,
				<T k={'validation.maxLength'} args={[maxLength]}/>)));
		},
	});

	return <>
		<Input.Wrapper flex={flex} error={formInputProps.error} classNames={{root: Input.classes.wrapper}}>
			<RichTextEditor editor={editor} withCodeHighlightStyles={false} variant={'subtle'}
							classNames={{content: classes.content}}>
				{editor && <BubbleMenu editor={editor}>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold/>
						<RichTextEditor.Italic/>
						<RichTextEditor.Underline/>
						<RichTextEditor.Strikethrough/>
						<RTEControlSmall/>
					</RichTextEditor.ControlsGroup>
				</BubbleMenu>}
				<RichTextEditor.Content/>
			</RichTextEditor>
		</Input.Wrapper>

		{editor?.isFocused &&
			<CounterBadge currentValue={editor.storage.characterCount.characters()} maxValue={maxLength}/>
		}
	</>;
}
