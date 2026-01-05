import {JSX} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment} from '@fortawesome/free-regular-svg-icons';
import {RichTextEditor, useRichTextEditorContext} from '@mantine/tiptap';
import {useLanguage} from '../../contexts/language/Language';

/**
 * Rich Text Editor Control for {@link Small}
 */
export function RTEControlSmall(): JSX.Element {
	const {editor} = useRichTextEditorContext();
	const {t} = useLanguage();

	return <RichTextEditor.Control onClick={() => editor?.chain().focus().toggleSmall().run()}
								   active={editor?.isActive('small')}
								   title={t('editor.control.small')}>
		<FontAwesomeIcon icon={faComment} size={'xs'}/>
	</RichTextEditor.Control>;
}
