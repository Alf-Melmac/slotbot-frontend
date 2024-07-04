import {JSX} from 'react';
import {TextKey, useLanguage} from '../../../contexts/language/Language';
import {BubbleMenu, EditorOptions, useEditor} from '@tiptap/react';
import {Document} from '@tiptap/extension-document';
import {Text} from '@tiptap/extension-text';
import {Paragraph} from '@tiptap/extension-paragraph';
import {HardBreak} from '@tiptap/extension-hard-break';
import {Bold} from '@tiptap/extension-bold';
import {Italic} from '@tiptap/extension-italic';
import {Underline} from '@tiptap/extension-underline';
import {Strike} from '@tiptap/extension-strike';
import {Highlight} from '@tiptap/extension-highlight';
import {Heading} from '@tiptap/extension-heading';
import {Blockquote} from '@tiptap/extension-blockquote';
import {HorizontalRule} from '@tiptap/extension-horizontal-rule';
import {ListItem} from '@tiptap/extension-list-item';
import {BulletList} from '@tiptap/extension-bullet-list';
import {OrderedList} from '@tiptap/extension-ordered-list';
import {Link, RichTextEditor} from '@mantine/tiptap';
import {TextAlign} from '@tiptap/extension-text-align';
import {Placeholder} from '@tiptap/extension-placeholder';
import {History} from '@tiptap/extension-history';
import {NAV_HEIGHT} from '../../../components/nav/Nav';
import {faAlignLeft, faCaretDown, faHeading} from '@fortawesome/free-solid-svg-icons';
import {Button, Group, Menu, Stack} from '@mantine/core';
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import {T} from '../../../components/T';
import classes from './HomeBlogItem.module.css';

type BlogPostInputProps = {
	onSave: (htmlContent: string) => void;
	isSaving: boolean;
	onCancel?: () => void;
	content?: EditorOptions['content'];
};

export function BlogPostInput(props: Readonly<BlogPostInputProps>): JSX.Element {
	const {onSave, isSaving, onCancel, content} = props;

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
			Highlight,
			Heading.configure({levels: [1, 2, 3]}),
			Blockquote,
			HorizontalRule,
			ListItem,
			BulletList,
			OrderedList,
			Link,
			TextAlign.configure({types: ['heading', 'paragraph']}),
			Placeholder.configure({placeholder: t('home.blog.placeholder')}),
			History,
		],
		content: content,
	});

	return <Stack gap={4} py={onCancel ? 'sm' : undefined}> {/*If there is a cancel button, we're probably embedded in a card*/}
		<RichTextEditor editor={editor} withCodeHighlightStyles={false}>
			<RichTextEditor.Toolbar sticky stickyOffset={NAV_HEIGHT}>
				<RichTextEditor.ControlsGroup>
					<RichTextEditor.Bold/>
					<RichTextEditor.Italic/>
					<RichTextEditor.Underline/>
					<RichTextEditor.Strikethrough/>
					<RichTextEditor.Highlight/>
				</RichTextEditor.ControlsGroup>
				<RichTextEditor.ControlsGroup>
					<ControlDropdown title={'editor.control.formatting'} icon={faHeading}
									 items={[
										 RichTextEditor.H1,
										 RichTextEditor.H2,
										 RichTextEditor.H3,
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
                    <RichTextEditor.Highlight/>
                    <RichTextEditor.Link/>
                    <RichTextEditor.Unlink/>
                </RichTextEditor.ControlsGroup>
            </BubbleMenu>}
			<RichTextEditor.Content/>
		</RichTextEditor>

		<Group className={classes.saveButton} gap={'xs'}>
			{onCancel &&
				<Button variant={'default'} onClick={onCancel}><T k={'action.cancel'}/></Button>
			}
			{editor &&
                <Button loading={isSaving} onClick={() => onSave(editor.getHTML())}>
                    <T k={'action.save'}/>
                </Button>
			}
		</Group>
	</Stack>;
}

type ControlDropdownProps = {
	title: TextKey;
	icon: FontAwesomeIconProps['icon'];
	items: any[];
};

function ControlDropdown(props: Readonly<ControlDropdownProps>): JSX.Element {
	const {title, icon, items} = props;

	const {t} = useLanguage();
	return (
		<Menu>
			<Menu.Target>
				<RichTextEditor.Control title={t(title)}>
					<Group gap={2} px={4}>
						<FontAwesomeIcon icon={icon} size={'xs'}/>
						<FontAwesomeIcon icon={faCaretDown} size={'xs'}/>
					</Group>
				</RichTextEditor.Control>
			</Menu.Target>

			<Menu.Dropdown>
				{items.map((item, index) => (
					<Menu.Item key={index} component={item}/>
				))}
			</Menu.Dropdown>
		</Menu>
	);
}
