import {Title} from '@mantine/core';
import {TextKey} from '../../../contexts/language/Language';
import {T} from '../../../components/T';
import {JSX} from 'react';

export function EventActionPageTitle(props: Readonly<{ title: TextKey }>): JSX.Element {
	return <Title order={2} mb={'xs'}><T k={props.title}/></Title>;
}
