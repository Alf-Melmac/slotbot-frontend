import {JSX, useEffect} from 'react';

type RedirectProps = {
	do: () => void;
};

export function OnMount(props: Readonly<RedirectProps>): JSX.Element {
	useEffect(() => {
		props.do();
	}, []);

	return <></>;
}
