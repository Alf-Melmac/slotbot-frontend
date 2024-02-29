import {JSX, lazy, Suspense} from 'react';
import {getGuild, Guild} from './Theme';

export function ThemeLoader(): JSX.Element {
	const AMBTheme = lazy(() => import('./ThemeAMB'));
	const DAATheme = lazy(() => import('./ThemeDAA'));
	const TTTTheme = lazy(() => import('./ThemeTTT'));

	return <Suspense fallback={<></>}>
		{getGuild() === Guild.AMB && <AMBTheme/>}
		{getGuild() === Guild.DAA && <DAATheme/>}
		{getGuild() === Guild.TTT && <TTTTheme/>}
	</Suspense>;
}
