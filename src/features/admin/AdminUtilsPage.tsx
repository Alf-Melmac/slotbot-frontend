import {JSX, lazy, Suspense} from 'react';

export function AdminUtilsPage(): JSX.Element {
	const AdminUtils = lazy(() => import('./AdminUtils'));

	return <Suspense fallback={<></>}>
		<AdminUtils/>
	</Suspense>;
}
