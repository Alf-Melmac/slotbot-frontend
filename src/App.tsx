import {ColorScheme, ColorSchemeProvider, Global, MantineProvider, Skeleton} from '@mantine/core';
import {JSX, Suspense, useState} from 'react';
import {routes} from './Router';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {getThemeOverride} from './contexts/Theme';
import {Notifications} from '@mantine/notifications';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from './contexts/authentication/AuthProvider';
import {currentLanguageTag, LanguageProvider} from './contexts/language/Language';
import {DatesProvider} from '@mantine/dates';
import regular from '/fonts/Roboto-400.woff2';
import bold from '/fonts/Roboto-700.woff2';

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
		setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'));

	const router = createBrowserRouter(routes, {future: {v7_normalizeFormMethod: true, v7_fetcherPersist: true}});

	return (
		<Suspense fallback={<Skeleton/>}>
			<QueryClientProvider client={queryClient}>
				<LanguageProvider>
					<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
						<MantineProvider theme={{colorScheme, ...getThemeOverride()}} withNormalizeCSS withGlobalStyles>
							<Global styles={[
								{
									'@font-face': {
										fontFamily: 'Roboto',
										src: `url('${regular}') format('woff2')`,
										fontWeight: 'normal',
										fontStyle: 'normal',
										fontDisplay: 'swap',
									},
								},
								{
									'@font-face': {
										fontFamily: 'Roboto',
										src: `url('${bold}') format('woff2')`,
										fontWeight: 'bold',
										fontStyle: 'normal',
										fontDisplay: 'swap',
									},
								},
							]}/>
							<Notifications/>
							<DatesProvider settings={{locale: currentLanguageTag()}}>
								<AuthProvider>
									<RouterProvider router={router} future={{v7_startTransition: true}}/>
								</AuthProvider>
							</DatesProvider>
						</MantineProvider>
					</ColorSchemeProvider>
				</LanguageProvider>
			</QueryClientProvider>
		</Suspense>
	);
}
