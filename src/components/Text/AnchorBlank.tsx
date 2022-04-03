import {Anchor} from "@mantine/core";
import {ReactNode} from "react";

type AnchorBlankProps = {
	href: string;
	children: ReactNode;
};

export function AnchorBlank(props: AnchorBlankProps): JSX.Element {
	return (
		<Anchor href={props.href} target={'_blank'} rel={'noopener noreferrer'}>{props.children}</Anchor>
	);
}
