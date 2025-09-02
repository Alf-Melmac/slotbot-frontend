import {JSX, PropsWithChildren} from 'react';
import {Alert, Box, Stack} from '@mantine/core';
import {T} from '../../../../../components/T';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {TextKey} from '../../../../../contexts/language/Language';

type GuildRolesPageWrapperProps = {
	warning?: TextKey;
};

export function GuildRolesPageWrapper(props: Readonly<PropsWithChildren<GuildRolesPageWrapperProps>>): JSX.Element {
	const {warning, children} = props;

	return <Box>
		{warning &&
            <Alert icon={<FontAwesomeIcon icon={faCircleExclamation}/>} color={'red'}>
                <T k={warning}/>
            </Alert>
		}
		<Stack gap={4}>
			{children}
		</Stack>
	</Box>;
}
