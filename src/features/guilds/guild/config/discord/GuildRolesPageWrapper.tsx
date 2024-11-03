import {JSX, PropsWithChildren} from 'react';
import {Alert, Box, Group, Spoiler} from '@mantine/core';
import {T} from '../../../../../components/T';
import classes from './GuildRolesPageWrapper.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {TextKey} from '../../../../../contexts/language/Language';

type GuildRolesPageWrapperProps = {
    warning?: TextKey;
};

export function GuildRolesPageWrapper(props: Readonly<PropsWithChildren<GuildRolesPageWrapperProps>>): JSX.Element {
    const {warning, children} = props;

    return <Box>
        <Spoiler maxHeight={22} hideLabel={<T k={'spoiler.less'}/>} showLabel={<T k={'spoiler.more'}/>}
                 classNames={{root: classes.description, control: classes.control}}>
            <T k={'guild.config.roles.description'}/>
        </Spoiler>
        {warning &&
            <Alert icon={<FontAwesomeIcon icon={faCircleExclamation}/>} color={'red'}>
                <T k={warning}/>
            </Alert>
        }
        <Group grow className={classes.roleSelections}>
            {children}
        </Group>
    </Box>;
}
