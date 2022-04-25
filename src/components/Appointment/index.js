import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const SAVING = "SAVING";
	const DELETING = "DELETING";
	const CONFIRM = "CONFIRM";
	const EDIT = "EDIT";
	const ERROR_SAVE = "ERROR_SAVE";
	const ERROR_DELETE = "ERROR_DELETE";

	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVING);
		props
			.bookInterview(props.id, interview)
			.then(() => {
				transition(SHOW);
			})
			.catch(err => {
				transition(ERROR_SAVE, true);
			});
	}

	function destroy() {
		transition(DELETING, true);
		props
			.cancelInterview(props.id)
			.then(() => {
				transition(EMPTY);
			})
			.catch(err => {
				transition(ERROR_DELETE, true);
			});
	}
	return (
		<article className='appointment'>
			<Header time={props.time} />
			{mode === SAVING && <Status message='Saving' />}
			{mode === DELETING && <Status message='Deleting' />}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === ERROR_DELETE && (
				<Error message='Delete failed.' onClose={() => back()} />
			)}
			{mode === ERROR_SAVE && (
				<Error message='Saving failed.' onClose={() => back()} />
			)}
			{mode === CONFIRM && (
				<Confirm
					message='Delete the appointment?'
					onConfirm={() => destroy()}
					onCancel={() => back()}
				/>
			)}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onEdit={() => transition(EDIT)}
					onDelete={() => transition(CONFIRM)}
				/>
			)}
			{mode === CREATE && (
				<Form
					interviewers={props.interviewers}
					onSave={save}
					onCancel={() => back()}
				/>
			)}
			{mode === EDIT && (
				<Form
					student={props.interview.student}
					interviewer={props.interview.interviewer.id}
					interviewers={props.interviewers}
					onSave={save}
					onCancel={() => back()}
				/>
			)}
		</article>
	);
}
