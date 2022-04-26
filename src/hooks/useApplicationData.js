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
					// update days array with return value of updateSpots
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
					// update days array with return value of updateSpots
					days: updateSpots(id, true),
					appointments,
				};
			});
		});
	}

	// Function returns a new days array with updated spots using client state data
	function updateSpots(id, add = true) {
		// if add truthy, cancelling appointment means potential 0 spots left.
		// (6 - 5 potential apts = updated spot of 1)
		// !add, creating will reduce spots. There has to be 1 spot min left.
		// (4 - 4 potential apts = updated spot of 0)
		let newSpots = add ? 6 : 4;

		//find day object in days array
		const currentDay = state.days.find(day => {
			return state.day === day.name;
		});

		// for each interview, newSpots - 1
		currentDay.appointments.forEach(app => {
			if (state.appointments[app].interview) {
				newSpots = newSpots - 1;
			}
		});

		// creating new day object by cloning day, updating spots with newSpots
		const newDay = { ...currentDay, spots: newSpots };

		// find the index of day object within days array using appointment id
		const index = state.days.findIndex(index => {
			return index.appointments.indexOf(id) > -1;
		});

		// create clone of days array
		const newDays = [...state.days];

		// using the index, update the clone of days with the new day object
		newDays[index] = newDay;

		// return the new days array, to be used in setState
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
