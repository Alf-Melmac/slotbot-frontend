import {JSX, PropsWithChildren} from 'react';
import {Box, Group, Spoiler} from '@mantine/core';
import {T} from '../../../../components/T';
import classes from './GuildRolesPageWrapper.module.css';

export function GuildRolesPageWrapper(props: Readonly<PropsWithChildren>): JSX.Element {
    return <Box>
        <Spoiler maxHeight={22} hideLabel={<T k={'spoiler.less'}/>} showLabel={<T k={'spoiler.more'}/>}
                 classNames={{root: classes.description, control: classes.control}}>
            <T k={'guild.config.roles.description'}/>
        </Spoiler>
        <Group grow className={classes.roleSelections}>
            {props.children}
        </Group>
    </Box>;
}
