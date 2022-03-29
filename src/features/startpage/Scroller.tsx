import {createStyles, keyframes} from "@mantine/core";

type ScrollerProps = {
	onClick: () => void;
};

export function Scroller(props: ScrollerProps): JSX.Element {
	const {onClick} = props;

	/*https://www.nxworld.net/css-scroll-down-button.html#%E7%9F%A2%E5%8D%B0-%C3%97-%E3%82%A2%E3%83%8B%E3%83%A1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3-4*/
	const arrowKf = keyframes({
		'0%': {
			opacity: 0,
		},
		'50%': {
			opacity: 1,
		},
		'100%': {
			opacity: 0,
		}
	});
	const useStyles = createStyles((theme) => ({
		scroller: {
			'span': {
				position: 'absolute',
				width: 24,
				height: 24,
				marginLeft: -12,
				borderLeft: `1px solid ${theme.white}`,
				borderBottom: `1px solid ${theme.white}`,
				transform: 'rotate(-45deg)',
				cursor: 'pointer',
				animation: `${arrowKf} 2s infinite`,

				'&:nth-of-type(2)': {
					top: 16,
					animationDelay: '.15s',
				},
				'&:nth-of-type(3)': {
					top: 32,
					animationDelay: '.3s',
				},
			},
		}
	}));
	const {classes} = useStyles();

	return (
		<a className={classes.scroller}
		   onClick={onClick}><span></span><span></span><span></span>
		</a>
	);
}
