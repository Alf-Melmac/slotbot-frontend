import {Alert, Center, Container} from '@mantine/core';

type GeneralErrorProps = {
	error: Error | null
};

export function GeneralError(props: GeneralErrorProps): JSX.Element {
	const {error} = props;

	return (
		<Container style={{height: '100vh'}}>
			<Center><Alert title={'Oh no!'} color={'red'}>{error ? error.message : ''}</Alert></Center>
		</Container>
	);
}
