import {Breadcrumbs, Text} from '@mantine/core';
import {AnchorLink} from './Text/AnchorLink';

type BreadcrumbItem = {
	title: JSX.Element | string;
	href?: string;
}

type BreadcrumbProps = {
	items: Array<BreadcrumbItem>
};

export function Breadcrumb(props: BreadcrumbProps): JSX.Element {
	const breadcrumbItems = props.items.map((item, index) => (
		//Double text to center vertically
		item.href ?
			<AnchorLink to={item.href} key={index}><Text>{item.title}</Text></AnchorLink>
			:
			<Text key={index}><Text>{item.title}</Text></Text>
	));

	return (
		<Breadcrumbs>
			{breadcrumbItems}
		</Breadcrumbs>
	);
}
