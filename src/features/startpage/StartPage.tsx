import {Button, Center} from "@mantine/core";
import {Link} from "react-router-dom";

export function StartPage(): JSX.Element {
	return (
		<Center>
			<Button variant="gradient" size="xl" radius="xl" mt={'xl'} component={Link} to="/events">
				Events
			</Button>
		</Center>
	);
}
