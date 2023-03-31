import {ColorScheme, ColorSchemeProvider, MantineProvider, Skeleton} from '@mantine/core';
import {Suspense, useState} from 'react';
import {routes} from "./Router";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {getThemeOverride} from "./contexts/Theme";
import {Notifications} from '@mantine/notifications';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from './contexts/authentication/AuthProvider';
import {currentLanguageTag, LanguageProvider} from './contexts/language/Language';
import {DatesProvider} from '@mantine/dates';

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

	const router = createBrowserRouter(routes, {future: {v7_normalizeFormMethod: true}});

	return (
		<Suspense fallback={<Skeleton/>}>
			<QueryClientProvider client={queryClient}>
				<LanguageProvider>
					<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
						<MantineProvider theme={{colorScheme, ...getThemeOverride()}} withNormalizeCSS withGlobalStyles>
							<Notifications/>
							<DatesProvider settings={{locale: currentLanguageTag()}}>
								<AuthProvider>
									<RouterProvider router={router}/>
								</AuthProvider>
							</DatesProvider>
						</MantineProvider>
					</ColorSchemeProvider>
				</LanguageProvider>
			</QueryClientProvider>
		</Suspense>
	);
}
