import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
	});

	const setDay = day => setState({ ...state, day });

	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		return axios.put(`/api/appointments/${id}`, appointment).then(res => {
			setState(prev => {
				return {
					...prev,
					days: updateSpots(id, false),
					appointments,
				};
			});
		});
	}

	function cancelInterview(id) {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		return axios.delete(`/api/appointments/${id}`, appointment).then(res => {
			setState(prev => {
				return {
					...prev,
					days: updateSpots(id, true),
					appointments,
				};
			});
		});
	}

	function updateSpots(id, add = true) {
		let newSpots = add ? 6 : 4;
		const currentDay = state.days.find(day => {
			return state.day === day.name;
		});

		currentDay.appointments.forEach(app => {
			if (state.appointments[app].interview) {
				newSpots = newSpots - 1;
			}
		});

		const newDay = { ...currentDay, spots: newSpots };
		const index = state.days.findIndex(index => {
			return index.appointments.indexOf(id) > -1;
		});
		const newDays = [...state.days];
		newDays[index] = newDay;

		return newDays;
	}

	useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers"),
		]).then(all => {
			setState(prev => {
				return {
					...prev,
					days: all[0].data,
					appointments: all[1].data,
					interviewers: all[2].data,
				};
			});
		});
	}, []);

	return { state, setDay, bookInterview, cancelInterview };
}
