import {Breadcrumbs, createStyles, Group, Text} from '@mantine/core';
import {AnchorLink} from './Text/AnchorLink';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {TextKey} from '../contexts/language/Language';
import {T} from './T';

const useStyles = createStyles((theme) => ({
	breadcrumb: {
		overflow: 'scroll',
	},

	chevron: {
		fontSize: theme.fontSizes.sm,
	},
}));

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

export function Breadcrumb(props: BreadcrumbProps): JSX.Element {
	const {classes} = useStyles();

	const breadcrumbItems = props.items.map((item, index) => {
		const {title, staticTitle = false, href} = item;
		const text = (staticTitle || typeof title !== 'string') ? title : <T k={title}/>;

		return href ?
			<AnchorLink to={href} key={index}>
				{index == 0 ?
					<Group spacing={4} noWrap>
						<FontAwesomeIcon icon={faCircleChevronLeft} className={classes.chevron}/>
						<Text>{text}</Text>
					</Group>
					:
					<Text>{text}</Text>
				}
			</AnchorLink>
			:
			<Text key={index}>{text}</Text>;
	});

	return (
		<Breadcrumbs className={classes.breadcrumb}>
			{breadcrumbItems}
		</Breadcrumbs>
	);
}
