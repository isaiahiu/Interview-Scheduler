import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import propTypes from "prop-types";

export default function InterviewerList({ interviewers, value, onChange }) {
	const list = interviewers.map(person => {
		return (
			<InterviewerListItem
				key={person.id}
				name={person.name}
				avatar={person.avatar}
				selected={value === person.id}
				setInterviewer={() => onChange(person.id)}
			/>
		);
	});
	return (
		<section className='interviewers'>
			<h4 className='interviewers__header text--light'>Interviewer</h4>
			<ul className='interviewers__list'>{list}</ul>
		</section>
	);
}

InterviewerList.propTypes = {
	interviewers: propTypes.array.isRequired,
};
