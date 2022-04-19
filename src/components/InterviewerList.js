import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
	const list = props.interviewers.map(person => {
		return (
			<InterviewerListItem
				key={person.id}
				name={person.name}
				avatar={person.avatar}
				selected={props.interviewer === person.id}
				setInterviewer={() => props.setInterviewer(person.id)}
				interviewer={props.interviewer}
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
