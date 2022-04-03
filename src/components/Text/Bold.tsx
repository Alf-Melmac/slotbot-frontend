import {Text} from "@mantine/core";
import {ReactNode} from "react";

type BoldProps = {
	children: ReactNode;
};

export function Bold(props: BoldProps): JSX.Element {
	return (
		<Text weight={'bold'} component={'span'}>{props.children}</Text>
	);
}
