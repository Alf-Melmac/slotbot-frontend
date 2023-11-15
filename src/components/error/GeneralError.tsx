import {Alert, Center} from '@mantine/core';
import {JSX} from 'react';

type GeneralErrorProps = {
	error: Error | null
};

export function GeneralError(props: Readonly<GeneralErrorProps>): JSX.Element {
	const {error} = props;

	return (
		<Center>
			<Alert title={'Oh no!'} color={'red'}>{error ? error.message : ''}</Alert>
		</Center>
	);
}
