import {Breadcrumbs, Group, Text} from '@mantine/core';
import {AnchorLink} from './Text/AnchorLink';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';

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
			<AnchorLink to={item.href} key={index}>
				{index == 0 ?
					<Group spacing={4}>
						<FontAwesomeIcon icon={faCircleChevronLeft} style={{fontSize: 14, paddingTop: 2}}/>
						<Text>{item.title}</Text>
					</Group>
					:
					<Text>{item.title}</Text>
				}
			</AnchorLink>
			:
			<Text key={index}><Text>{item.title}</Text></Text>
	));

	return (
		<Breadcrumbs>
			{breadcrumbItems}
		</Breadcrumbs>
	);
}
