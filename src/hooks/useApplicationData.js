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

	function reducer(state, action) {
		const { type, day, days, appointments, interviewers, interview, id } =
			action;
		switch (type) {
			case SET_DAY: {
				return { ...state, day };
			}
			case SET_APPLICATION_DATA: {
				return {
					...state,
					days,
					appointments,
					interviewers,
				};
			}

			case SET_INTERVIEW: {
				// create clone of appointment data with new interview data
				const newAppointment = {
					...state.appointments[id],
					interview,
				};

				// create clone of appointments and updating it with new appointment data
				const newAppointments = {
					...state.appointments,
					[id]: newAppointment,
				};

				// find day object in days array
				const currentDay = state.days.find(day => {
					return state.day === day.name;
				});

				let newSpots = 0;

				currentDay.appointments.forEach(app => {
					if (newAppointments[app].interview === null) {
						newSpots += 1;
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

				return {
					...state,
					days: newDays,
					appointments: newAppointments,
				};
			}
			default: {
				throw new Error(
					`Tried to reduce with unsupported action type: ${type}`
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
			});
		});
	}

	function cancelInterview(id) {
		return axios.delete(`/api/appointments/${id}`).then(res => {
			dispatch({
				type: SET_INTERVIEW,
				id,
				interview: null,
			});
		});
	}

	return { state, setDay, bookInterview, cancelInterview };
}
