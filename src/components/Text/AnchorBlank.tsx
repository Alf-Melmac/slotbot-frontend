import {Anchor} from "@mantine/core";
import {ReactNode} from "react";

type AnchorBlankProps = {
	href: string;
	children: ReactNode;
};

export function AnchorBlank(props: AnchorBlankProps): JSX.Element {
	const {href, children} = props;

	return (
		<Anchor href={href} target={"_blank"} rel={"noopener noreferrer"}>{children}</Anchor>
	);
}
