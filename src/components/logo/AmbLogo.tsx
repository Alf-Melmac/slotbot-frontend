import {createStyles, Group, Image, MediaQuery, Text} from '@mantine/core';
import logo from './amb-256-256.png';

const useStyles = createStyles(() => ({
	title: {
		textTransform: 'uppercase',
		fontWeight: 700,
		letterSpacing: 1,
	},
}));

type AmbLogoProps = {
	width?: number;
};

export function AmbLogo(props: AmbLogoProps): JSX.Element {
	const {width = 70} = props;
	const {classes} = useStyles();

	return (
		<Group spacing={'xs'} noWrap>
			<MediaQuery smallerThan={'xs'} styles={{display: 'none'}}>
				<Image width={width} src={logo}/>
			</MediaQuery>
			<Text size={'lg'} className={classes.title}>Arma macht Bock</Text>
		</Group>
	);
}
