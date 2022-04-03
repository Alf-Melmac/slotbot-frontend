import {Box, Center, createStyles, Paper, Text} from "@mantine/core";
import {CountUp} from "use-count-up";

type StatCounterProps = {
	className?: string; //To be embeddable in group
	countEnd: number;
	info: string;
};

export function StatCounter({className, countEnd, info}: StatCounterProps): JSX.Element {
	const useStyles = createStyles((theme) => ({
		paper: {
			fontSize: 80,
		},

		counterWrapper: {
			position: "relative",
			lineHeight: 1,
			paddingBottom: 20,

			'&:after': {
				content: '""',
				position: 'absolute',
				bottom: 0,
				width: 100,
				marginLeft: -50,
				left: '50%',
				height: 1,
				background: theme.fn.linearGradient(45, theme.primaryColor, theme.colors.cyan[4]),
			}
		}
	}));
	const {classes} = useStyles();

	return (
		<Paper withBorder p={'lg'} radius={'md'} className={className}>
			<Box className={classes.paper}>
				<Center className={classes.counterWrapper}>
					<CountUp isCounting end={countEnd}/>
				</Center>
			</Box>
			<Text color={'muted'} mt={'sm'} align={'center'} style={{fontSize: 20}}>{info}</Text>
		</Paper>
	);
}
