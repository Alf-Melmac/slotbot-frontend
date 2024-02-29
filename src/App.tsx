import {MantineProvider, Skeleton} from '@mantine/core';
import {JSX, Suspense} from 'react';
import {routes} from './Router';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {getThemeOverride} from './contexts/theme/Theme';
import {Notifications} from '@mantine/notifications';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from './contexts/authentication/AuthProvider';
import {currentLanguageTag, LanguageProvider} from './contexts/language/Language';
import {DatesProvider} from '@mantine/dates';
import {ThemeLoader} from './contexts/theme/ThemeLoader';

export function App(): JSX.Element {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

	const router = createBrowserRouter(routes, {future: {v7_normalizeFormMethod: true, v7_fetcherPersist: true}});

	return (
		<Suspense fallback={<Skeleton/>}>
			<QueryClientProvider client={queryClient}>
				<LanguageProvider>
					<MantineProvider theme={getThemeOverride()} defaultColorScheme={'dark'}>
						<ThemeLoader/>
						<Notifications/>
						<DatesProvider settings={{locale: currentLanguageTag()}}>
							<AuthProvider>
								<RouterProvider router={router} future={{v7_startTransition: true}}/>
							</AuthProvider>
						</DatesProvider>
					</MantineProvider>
				</LanguageProvider>
			</QueryClientProvider>
		</Suspense>
	);
}
