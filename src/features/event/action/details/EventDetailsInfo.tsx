import {JSX} from 'react';
import {BubbleMenu, useEditor} from '@tiptap/react';
import {Document} from '@tiptap/extension-document';
import {Text} from '@tiptap/extension-text';
import {Bold} from '@tiptap/extension-bold';
import {Italic} from '@tiptap/extension-italic';
import {Underline} from '@tiptap/extension-underline';
import {Strike} from '@tiptap/extension-strike';
import {Placeholder} from '@tiptap/extension-placeholder';
import {History} from '@tiptap/extension-history';
import {DiscordMarkdown} from '../../../../utils/tiptap/DiscordMarkdown';
import {DiscordMarkdownCharacterCount} from '../../../../utils/tiptap/DiscordMarkdownCharacterCount';
import {TextKey, useLanguage} from '../../../../contexts/language/Language';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {Input} from '@mantine/core';
import {Link, RichTextEditor} from '@mantine/tiptap';
import {Paragraph} from '@tiptap/extension-paragraph';
import classes from './EventDetailsInfo.module.css';
import {CounterBadge} from '../../../../components/Form/CounterBadge';
import {T} from '../../../../components/T';
import {requiredField, validate} from '../../../../utils/formHelper';

type EventDetailsInfoInputProps = {
	placeholder: TextKey;
	maxLength: number;
	flex: number;
}

type EventDetailsInfoProps = {
	inputProps: EventDetailsInfoInputProps;
	formPath: string;
};

export function EventDetailsInfo({
									 inputProps: {placeholder, maxLength, flex},
									 formPath,
								 }: Readonly<EventDetailsInfoProps>): JSX.Element {
	const form = useFormContext();
	const formInputProps = form.getInputProps(formPath);

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
			Link,
			Placeholder.configure({placeholder: t(placeholder)}),
			History,
			DiscordMarkdown,
			DiscordMarkdownCharacterCount.configure({limit: maxLength}),
		],
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
                        <RichTextEditor.Link/>
                    </RichTextEditor.ControlsGroup>
                </BubbleMenu>}
				<RichTextEditor.Content/>
			</RichTextEditor>
		</Input.Wrapper>

		{editor?.isFocused &&
            <CounterBadge currentValue={editor?.storage.characterCount.characters()} maxValue={maxLength}/>
		}
	</>;
}
