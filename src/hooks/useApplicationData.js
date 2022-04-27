import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
	const SET_DAY = "SET_DAY";
	const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
	const SET_INTERVIEW = "SET_INTERVIEW";

	const [state, dispatch] = useReducer(reducer, {
		day: "Monday",
		days: [],
		appointments: {},
	});

	function reducer(state, action) {
		switch (action.type) {
			case SET_DAY: {
				return { ...state, day: action.day };
			}
			case SET_APPLICATION_DATA: {
				return {
					...state,
					days: action.days,
					appointments: action.appointments,
					interviewers: action.interviewers,
				};
			}
			case SET_INTERVIEW: {
				const appointment = {
					...state.appointments[action.id],
					interview: action.interview,
				};
				const appointments = {
					...state.appointments,
					[action.id]: appointment,
				};
				return {
					...state,
					days: action.days,
					appointments,
				};
			}
			default: {
				throw new Error(
					`Tried to reduce with unsupported action type: ${action.type}`
				);
			}
		}
	}

	const setDay = day => dispatch({ type: SET_DAY, day });

	function bookInterview(id, interview) {
		return axios.put(`/api/appointments/${id}`, { interview }).then(res => {
			dispatch({
				type: SET_INTERVIEW,
				id,
				interview,
				// update days array with return value of updateSpots
				days: updateSpots(id, false)
			});
		});
	}

	function cancelInterview(id) {
		return axios.delete(`/api/appointments/${id}`).then(res => {
			dispatch({
				type: SET_INTERVIEW,
				id,
				interview: null,
				// update days array with return value of updateSpots
				days: updateSpots(id, true)
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
			dispatch({
				type: SET_APPLICATION_DATA,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			});
		});
	}, []);

	return { state, setDay, bookInterview, cancelInterview };
}
