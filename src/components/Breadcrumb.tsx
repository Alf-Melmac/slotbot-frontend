import {Breadcrumbs, createStyles, Group, Text} from '@mantine/core';
import {AnchorLink} from './Text/AnchorLink';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';

const useStyles = createStyles((theme) => ({
	breadcrumb: {
		overflow: 'scroll',
	},

	chevron: {
		fontSize: theme.fontSizes.md * 0.9,
		paddingTop: theme.fontSizes.md * 0.1,
	}
}));

type BreadcrumbItem = {
	title: JSX.Element | string;
	href?: string;
}

type BreadcrumbProps = {
	items: Array<BreadcrumbItem>
};

export function Breadcrumb(props: BreadcrumbProps): JSX.Element {
	const {classes} = useStyles();

	const breadcrumbItems = props.items.map((item, index) => (
		item.href ?
			<AnchorLink to={item.href} key={index}>
				{index == 0 ?
					<Group spacing={4} noWrap>
						<FontAwesomeIcon icon={faCircleChevronLeft} className={classes.chevron}/>
						<Text>{item.title}</Text>
					</Group>
					:
					<Text>{item.title}</Text>
				}
			</AnchorLink>
			:
			<Text key={index}>{item.title}</Text>
	));

	return (
		<Breadcrumbs className={classes.breadcrumb}>
			{breadcrumbItems}
		</Breadcrumbs>
	);
}
