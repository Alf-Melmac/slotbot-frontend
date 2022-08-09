import {Text} from "@mantine/core";
import {ReactNode} from "react";

type ItalicProps = {
	children: ReactNode;
};

export function Italic(props: ItalicProps): JSX.Element {
	return (
		<Text italic span>{props.children}</Text>
	);
}
