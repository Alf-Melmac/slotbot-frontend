import {createStyles, Group, Image, MediaQuery, Text} from '@mantine/core';
import logo from './amb-256-256.png';

const useStyles = createStyles((theme) => ({
	title: {
		textTransform: 'uppercase',
		fontWeight: 700,
		letterSpacing: 1,
	},
}));

type AmbLogoProps = {
	height?: number;
};

export function AmbLogo(props: AmbLogoProps): JSX.Element {
	const {height = 70} = props;
	const {classes} = useStyles();

	return (
		<Group spacing={'xs'} noWrap>
			<MediaQuery smallerThan={'xs'} styles={{display: 'none'}}>
				<Image height={height} src={logo}/>
			</MediaQuery>
			<Text size={'lg'} className={classes.title}>Arma macht Bock</Text>
		</Group>
	);
}
