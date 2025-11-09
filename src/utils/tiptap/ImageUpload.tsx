import {ChangeEvent, JSX, useRef} from 'react';
import {RichTextEditor, useRichTextEditorContext} from '@mantine/tiptap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage} from '@fortawesome/free-regular-svg-icons';
import {Editor, insertContentAt} from '@tiptap/core';
import FileHandler from '@tiptap/extension-file-handler';
import slotbotServerClient from '../../hooks/slotbotServerClient';

/**
 * Tiptap extension (file handler) for file uploads
 */
export const ImageFileHandler = FileHandler.configure({
	allowedMimeTypes: ['image/png', 'image/jpeg'],
	onDrop: (currentEditor, files, pos) => uploadImages(files, currentEditor, pos),
	onPaste: (currentEditor, files, htmlContent) => {
		if (htmlContent) {
			console.error('Encountered htmlContent while pasting', htmlContent);
			return;
		}
		uploadImages(files, currentEditor);
	},
});

/**
 * RichTextEditor.Control button for uploading images
 */
export function ImageUpload(): JSX.Element {
	const {editor} = useRichTextEditorContext();
	const fileInput = useRef<HTMLInputElement>(null);

	function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
		const files = e.target.files;
		if (!editor || !files) return;
		uploadImages(files, editor);
	}

	return <RichTextEditor.Control onClick={() => fileInput.current?.click()}>
		<FontAwesomeIcon icon={faImage} size={'xs'}/>
		<input type={'file'} accept={'image/png, image/jpeg'} onChange={handleFileInput} style={{display: 'none'}}
			   ref={fileInput}/>
	</RichTextEditor.Control>;
}

/**
 * Uploads all given images and inserts them into the editor at the given position
 *
 * @param files to upload
 * @param editor the current editor instance
 * @param position to insert the images at. Defaults to the current cursor position
 */
// noinspection JSDeprecatedSymbols - false positive, the anchor is part of the editor selection and not a string anchor
export function uploadImages(files: FileList | File[], editor: Editor, position: Parameters<typeof insertContentAt>[0] = editor.state.selection.anchor) {
	for (const file of files) {
		uploadFn(file)
			.then(result => editor
				.chain()
				.insertContentAt(position, {
					type: 'image',
					attrs: {
						src: result,
					},
				})
				.focus()
				.run());
	}
}

/**
 * Uploads the given image file. Returns the URL of the uploaded file on success.
 */
function uploadFn(file: File): Promise<string> {
	const formData = new FormData();
	formData.append('file', file);
	return slotbotServerClient.post('/files/uploadImage', formData, {
		headers: {'Content-Type': 'multipart/form-data'},
	}).then((fileUrl) => {
		return fileUrl.data;
	}).catch((e) => {
		throw e.response.data.error;
	});
}
