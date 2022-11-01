import {ColorScheme, ColorSchemeProvider, MantineProvider, Skeleton} from '@mantine/core';
import {Suspense, useState} from 'react';
import {routes} from "./Router";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {getThemeOverride} from "./contexts/Theme";
import {NotificationsProvider} from '@mantine/notifications';
import dayjs from 'dayjs';
import de from 'dayjs/locale/de';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from './contexts/authentication/AuthProvider';

export function App(): JSX.Element {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});
	const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
	dayjs.locale(de);

	const router = createBrowserRouter(routes);

	return (
		<Suspense fallback={<Skeleton/>}>
			<QueryClientProvider client={queryClient}>
				<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
					<MantineProvider theme={{colorScheme, ...getThemeOverride()}} withGlobalStyles>
						<NotificationsProvider>
							<AuthProvider>
								<RouterProvider router={router}/>
							</AuthProvider>
						</NotificationsProvider>
					</MantineProvider>
				</ColorSchemeProvider>
			</QueryClientProvider>
		</Suspense>
	);
}
