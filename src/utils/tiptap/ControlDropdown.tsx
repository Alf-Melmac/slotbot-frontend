import {FC, JSX} from 'react';
import {TextKey, useLanguage} from '../../contexts/language/Language';
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import {Group, Menu} from '@mantine/core';
import {H1Control, RichTextEditor} from '@mantine/tiptap';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';

type ControlDropdownProps = {
	title: TextKey;
	icon: FontAwesomeIconProps['icon'];
	items: FC<Parameters<typeof H1Control>[0]>[];  //Extract RichTextEditorControlBaseProps from any control as it isn't exported
};

export function ControlDropdown({title, icon, items}: Readonly<ControlDropdownProps>): JSX.Element {
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
