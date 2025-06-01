import {JSX} from 'react';
import {Badge, BadgeProps} from '@mantine/core';

export function PreviewBadge(props: Readonly<BadgeProps>): JSX.Element {
    return <Badge {...props} color={'pink'}>Preview</Badge>;
}
