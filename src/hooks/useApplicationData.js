import { useEffect, useReducer } from "react";
import axios from "axios";



// Our useApplicationData Hook will return an object with four keys.

//     The state object will maintain the same structure.
//     The setDay action can be used to set the current day.
//     The bookInterview action makes an HTTP request and updates the local state.
//     The cancelInterview action makes an HTTP request and updates the local state.


export default function useApplicationData() {
  
  const [state, dispatch] = useReducer(reducer,
    {
      day: "Monday",
      days: [],
      interviewers: {},
      appointments: {}
    })


  const setDay = day => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }
      });
    });
  }, []);

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview
      });
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview: null
      });
    });
  }

  return { state, setDay, cancelInterview, bookInterview }

}