import {JSX, lazy, Suspense} from 'react';
import {getGuild, Guild} from './Theme';
import './themeStandard.css';

export function ThemeLoader(): JSX.Element {
	const DAATheme = lazy(() => import('./ThemeDAA'));
	const TTTTheme = lazy(() => import('./ThemeTTT'));

	return <Suspense fallback={<></>}>
		{getGuild() === Guild.DAA && <DAATheme/>}
		{getGuild() === Guild.TTT && <TTTTheme/>}
	</Suspense>;
}
