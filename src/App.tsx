import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import 'mantine-react-table/styles.css';
import './global.css';
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

	const router = createBrowserRouter(routes, {
		future: {
			v7_fetcherPersist: true,
			v7_normalizeFormMethod: true,
			v7_partialHydration: true,
			v7_relativeSplatPath: true,
		},
	});

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
