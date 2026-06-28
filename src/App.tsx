import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/tiptap/styles.css';
import 'mantine-react-table-open/styles.css';
import './global.css';
import {MantineProvider, Skeleton} from '@mantine/core';
import {JSX, Suspense} from 'react';
import {routes} from './Router';
import {createBrowserRouter, RouterProvider} from 'react-router';
import {useGetThemeOverride} from './contexts/theme/Theme';
import {Notifications} from '@mantine/notifications';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from './contexts/authentication/AuthProvider';
import {LanguageProvider, useLanguage} from './contexts/language/Language';
import {DatesProvider} from '@mantine/dates';
import {ThemeLoader} from './contexts/theme/ThemeLoader';
import {GuildProvider} from './contexts/guildcontext/GuildContext';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

export function App(): JSX.Element {
	return (
		<Suspense fallback={<Skeleton/>}>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools/>
				<LanguageProvider>
					<GuildProvider>
						<MantineApp/>
					</GuildProvider>
				</LanguageProvider>
			</QueryClientProvider>
		</Suspense>
	);
}

function MantineApp(): JSX.Element { /*To be able to use LanguageProvider and GuildProvider in the theme this needs to be its own component*/
	const {language} = useLanguage();

	const router = createBrowserRouter(routes);

	return (
		<MantineProvider theme={useGetThemeOverride()} defaultColorScheme={'dark'}>
			<ThemeLoader/>
			<Notifications/>
			<DatesProvider settings={{locale: language}}>
				<AuthProvider>
					<RouterProvider router={router}/>
				</AuthProvider>
			</DatesProvider>
		</MantineProvider>
	);
}
