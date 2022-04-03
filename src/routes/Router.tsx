import {Route, Routes} from "react-router";
import {Events} from "../features/event/Events";
import {Title} from "@mantine/core";
import {StartPage} from "../features/startpage/StartPage";

export function Router(): JSX.Element {
	return (
		<Routes>
			<Route path="/events" element={<Events/>}/>
			<Route path="/404" element={<Title>404 :(</Title>}/>
			<Route path="/" element={<StartPage/>}/>
		</Routes>
	);
}
