import {ColorScheme, ColorSchemeProvider, Global, MantineProvider, Skeleton} from '@mantine/core';
import {Suspense, useState} from 'react';
import {Router} from "./Router";
import {HashRouter} from "react-router-dom";
import {theme} from "./contexts/Theme";
import {NotificationsProvider} from '@mantine/notifications';
import {QueryClient, QueryClientProvider} from 'react-query';
import dayjs from 'dayjs';
import de from 'dayjs/locale/de';

export function App(): JSX.Element {
	const queryClient = new QueryClient();
	const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
	dayjs.locale(de);

	return (
		<Suspense fallback={<Skeleton/>}>
			<QueryClientProvider client={queryClient}>
				<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
					<MantineProvider theme={{colorScheme, ...theme}} withGlobalStyles defaultProps={{
						Container: {size: 'lg'},
					}}>
						<NotificationsProvider>
							<Global styles={(theme) => ({
								body: {
									backgroundColor: theme.colorScheme !== 'dark' ? theme.colors.gray[2] : theme.colors.dark[7],
									margin: 0, //????
								},
								'*::-webkit-scrollbar': {
									width: 8,
								},
								'*::-webkit-scrollbar-thumb': {
									backgroundColor: theme.colors.gray[5],
									borderRadius: "6px",
								},
								'@supports (-moz-appearance:none)': {
									"*": {
										/*The following attributes are currently supported only by Firefox. Webkit browsers are designed by the ::-webkit-scrollbar
										So that nothing is broken in potential future support, these values are set only for Firefox.*/
										scrollbarColor: `${theme.colors.gray[5]} transparent`,
										scrollbarWidth: 'thin',
									},
								},
							})}/>
							<HashRouter>
								<Router/>
							</HashRouter>
						</NotificationsProvider>
					</MantineProvider>
				</ColorSchemeProvider>
			</QueryClientProvider>
		</Suspense>
	);
}
