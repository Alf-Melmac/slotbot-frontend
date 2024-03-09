import {Box, Breadcrumbs, Group, Text} from '@mantine/core';
import {AnchorLink} from './Text/AnchorLink';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {TextKey} from '../contexts/language/Language';
import {T} from './T';
import {JSX} from 'react';
import classes from './Breadcrumb.module.css';

type BreadcrumbItem = {
	/**
	 * item text
	 */
	title: JSX.Element | TextKey | string;
	/**
	 * Already translated or static `title`
	 * @default false
	 */
	staticTitle?: boolean;
	/**
	 * Creates a link
	 */
	href?: string;
}

type BreadcrumbProps = {
	items: Array<BreadcrumbItem>
};

export function Breadcrumb(props: Readonly<BreadcrumbProps>): JSX.Element {
	const breadcrumbItems = props.items.map((item, index) => {
		const {title, staticTitle = false, href} = item;
		const text = (staticTitle || typeof title !== 'string') ? title : <T k={title}/>;

		return href ?
			<AnchorLink to={href} key={index}>
				{index == 0 ?
					<Group gap={4} wrap={'nowrap'}>
						<FontAwesomeIcon icon={faCircleChevronLeft} className={classes.chevron}/>
						<Text>{text}</Text>
					</Group>
					:
					<Text>{text}</Text>
				}
			</AnchorLink>
			:
			<Box key={index}>{text}</Box>;
	});

	return (
		<Breadcrumbs mb={6}>
			{breadcrumbItems}
		</Breadcrumbs>
	);
}
