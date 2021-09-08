import React from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import { useState } from "react";
import Appointment from "components/Appointment/index.js";
import axios from "axios";

//import helper functions to help with loops

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const interviewers = getInterviewersForDay(state, state.day);
  const setDay = day => dispatch({ type: "SET_DAY", value: day });
  useEffect(() => {
    Promise.all([
      axios.get("/api/days/"),
      axios.get("/api/appointments/"),
      axios.get("/api/interviewers/")
    ])
      .then(url => {
        dispatch({
          type: "SET_APPLICATION_DATA",
          days: url[0].data,
          appointments: url[1].data,
          interviewers: url[2].data
        });
      })
      .catch(err => err);
      const webSocket = new WebSocket("wss:https://interviewscheduler.netlify.com/");
      webSocket.onopen = function() {
        webSocket.send(`Socket initialized`);
      };
  
      webSocket.onmessage = function(message) {
        let parsedMessage = JSON.parse(message.data);
        if (parsedMessage.type === "SET_INTERVIEW") {
          dispatch({ ...parsedMessage });
        }
      };
    }, []);



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {list}
        <Appointment
          id='last'
          time="5pm"
        />
      </section>
    </main>
  );
}
