import {Route, Routes} from 'react-router-dom';
import {Profile} from './Profile';

export function ProfileRoutes(): JSX.Element {
	return (
		<Routes>
			<Route path=":userId" element={<Profile/>}/>
		</Routes>
	);
}
