import {Grid, Stack} from '@mantine/core';
import {IconSwitch} from '../../../../components/Form/IconSwitch';
import {faEye, faEyeSlash, faUsers, faUsersSlash} from '@fortawesome/free-solid-svg-icons';
import {ElementWithInfo} from '../../../../components/Text/ElementWithInfo';
import {EventAction, EventActionPageProps} from '../EventActionPage';
import {EventTitle} from './EventTitle';

export type RequiredInformationProps<FormReturnType = EventAction> =
	EventActionPageProps<FormReturnType> & { canRevokeShareable?: boolean; }

export function RequiredInformation<FormReturnType extends EventAction>(props: RequiredInformationProps<FormReturnType>): JSX.Element {
	return (
		<Grid>
			<Grid.Col md={9} span={12}>
				<EventTitle {...props}/>
			</Grid.Col>
			<Grid.Col md={3} span={12}>
				<Stack align={'flex-start'} spacing={'xs'}>
					<EventShareableAndHidden {...props}/>
				</Stack>
			</Grid.Col>
		</Grid>
	);
}

function EventShareableAndHidden<FormReturnType extends EventAction>(props: RequiredInformationProps<FormReturnType>): JSX.Element {
	const {canRevokeShareable = true} = props; //TODO respect canRevokeShareable

	return <>
		<IconSwitch onIcon={faUsers} offIcon={faUsersSlash}
					label={<ElementWithInfo text={'Teilen erlauben'}
											tooltip={'Ermöglicht es anderen Gruppen diese Event in ihren Kalender einzufügen und darüber Teilnehmer einzutragen.'}/>}
					useFormReturn={props.form} inputProp={'shareable'}/>

		<IconSwitch onIcon={faEye} offIcon={faEyeSlash}
					label={<ElementWithInfo text={'Sichtbarkeit'}
											tooltip={'Berechtigt alle Interessierten das Event im Kalender zu sehen.'}/>}
					useFormReturn={props.form} inputProp={'hidden'}/>
	</>;
}
