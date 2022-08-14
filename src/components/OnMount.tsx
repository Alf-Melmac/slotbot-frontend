import {useEffect} from 'react';

type RedirectProps = {
	do: () => void;
};

export function OnMount(props: RedirectProps): JSX.Element {
	useEffect(() => {
		props.do();
	}, []);

	return <></>;
}
