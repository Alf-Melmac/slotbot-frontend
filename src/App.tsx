import {ColorScheme, ColorSchemeProvider, Global, MantineProvider, Skeleton} from '@mantine/core';
import {Suspense, useState} from 'react';
import {Router} from "./routes/Router";
import {BrowserRouter} from "react-router-dom";
import {theme} from "./contexts/Theme";
import {useColorScheme} from "@mantine/hooks";

export function App(): JSX.Element {
	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	return (
		<Suspense fallback={<Skeleton/>}>
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				<MantineProvider theme={{colorScheme, ...theme}} withGlobalStyles>
					<Global styles={(themes) => ({
						body: {
							backgroundColor: themes.colorScheme !== 'dark' ? themes.colors.gray[0] : themes.colors.dark[7],
							margin: 0 //????
						}
					})}/>
					<BrowserRouter>
						<Router/>
					</BrowserRouter>
				</MantineProvider>
			</ColorSchemeProvider>
		</Suspense>
	);
}
