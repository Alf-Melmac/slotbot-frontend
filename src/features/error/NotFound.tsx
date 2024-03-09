import {ErrorPage} from './ErrorPage';
import {JSX} from 'react';

export function NotFound(): JSX.Element {
	return (
		<ErrorPage documentTitle={'documentTitle.error.404'}>
			<ErrorPage.Label>404</ErrorPage.Label>
			<ErrorPage.Title title={'error.notFound.title'}/>
			<ErrorPage.Description description={'error.notFound.description'}/>
			<ErrorPage.BackButton/>
		</ErrorPage>
	);
}
