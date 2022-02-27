import {Container} from "@mantine/core";
import {ContainerProps} from "@mantine/core/lib/components/Container/Container";

export function DefaultContainer(props: ContainerProps): JSX.Element {
	const {size = "lg", ...rest} = props;

	return (
		<Container size={size} {...rest}>
			{props.children}
		</Container>
	);
}
