import {RouteObject} from 'react-router-dom';
import {JSX, lazy, Suspense} from 'react';

export const notFoundRoute: RouteObject = {
	path: '*',
	element: <NotFoundPage/>,
};

export function NotFoundPage(): JSX.Element {
	const NotFound = lazy(() => import('./NotFound'));

	return <Suspense fallback={<></>}>
		<NotFound/>
	</Suspense>;
}
