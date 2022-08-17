import {Route, Routes} from 'react-router-dom';
import {AdminUtils} from './AdminUtils';

export function AdminRoutes(): JSX.Element {
	return (
		<Routes>
			<Route path="/utils" element={<AdminUtils/>}/>
		</Routes>
	);
}
