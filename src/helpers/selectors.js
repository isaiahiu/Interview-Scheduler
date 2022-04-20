export function getAppointmentsForDay(state, day) {
	//find object in state.days array where name = name
	const daySearch = state.days.filter(current => {
		return current.name === day;
	});
	// once have days array, iterate and compare id with states.appointment
	if (daySearch.length > 0) {
		const appts = daySearch[0].appointments.map(apptID => {
			return state.appointments[apptID];
		});
		// if match return value
		return appts;
	}
	// if no appointments, return empty array
	return daySearch;
}

export function getInterview(state, interview) {
	if (!interview) {
		return null;
	}
	return {
		...interview,
		interviewer: { ...state.interviewers[interview.interviewer] },
	};
}
