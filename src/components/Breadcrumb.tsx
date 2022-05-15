import {Breadcrumbs, Text} from '@mantine/core';
import {AnchorLink} from './Text/AnchorLink';

type BreadcrumbItem = {
	title: JSX.Element;
	href?: string;
}

type BreadcrumbProps = {
	items: Array<BreadcrumbItem>
};

export function Breadcrumb(props: BreadcrumbProps): JSX.Element {
	const {items} = props;

	const breadcrumbItems = items.map((item, index) => (
		item.href ?
			<AnchorLink to={item.href} key={index}>{item.title}</AnchorLink>
			:
			<Text key={index}>{item.title}</Text>
	));

	return (
		<Breadcrumbs>
			{breadcrumbItems}
		</Breadcrumbs>
	);
}
