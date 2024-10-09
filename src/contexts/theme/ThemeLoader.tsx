import {JSX, lazy, Suspense} from 'react';
import {Guild, useGetGuild} from './Theme';
import './themeStandard.css';

export function ThemeLoader(): JSX.Element {
	const DAATheme = lazy(() => import('./ThemeDAA'));
	const TTTTheme = lazy(() => import('./ThemeTTT'));

	return <Suspense fallback={<></>}>
		{useGetGuild() === Guild.DAA && <DAATheme/>}
		{useGetGuild() === Guild.TTT && <TTTTheme/>}
	</Suspense>;
}
