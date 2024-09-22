import {ErrorPage} from './ErrorPage';
import {JSX} from 'react';
import classes from './NotAllowed.module.css';

export default function NotAllowed(): JSX.Element {
	return (
		<ErrorPage documentTitle={'documentTitle.error.403'}>
			<div className={classes.alarm}/>
			<ErrorPage.Label>403</ErrorPage.Label>
			<ErrorPage.Title title={'error.notAllowed'}/>
			<ErrorPage.BackButton/>
		</ErrorPage>
	);
}
