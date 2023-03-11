import {Title} from '@mantine/core';
import {TextKey} from '../../../contexts/language/Language';
import {T} from '../../../components/T';

export function EventActionPageTitle(props: { title: TextKey }): JSX.Element {
	return <Title order={2} mb={'xs'}><T k={props.title}/></Title>;
}
