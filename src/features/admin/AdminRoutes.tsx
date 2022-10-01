import {Route, Routes} from 'react-router-dom';
import {AdminUtils} from './AdminUtils';
import {NotFound} from '../error/NotFound';

export function AdminRoutes(): JSX.Element {
	return (
		<Routes>
			<Route path="/utils" element={<AdminUtils/>}/>
			<Route path="*" element={<NotFound/>}/>
		</Routes>
	);
}
