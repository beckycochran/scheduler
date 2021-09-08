import React from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import { useState } from "react";
import Appointment from "components/Appointment/index.js";


//import helper functions to help with loops

export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);

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

  // const days = [
  //   {
  //     id: 1,
  //     name: "Monday",
  //     spots: 2,
  //   },
  //   {
  //     id: 2,
  //     name: "Tuesday",
  //     spots: 5,
  //   },
  //   {
  //     id: 3,
  //     name: "Wednesday",
  //     spots: 0,
  //   },
  // ];

  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "7pm",
      interview: {
        student: "Becarooski",
        interviewer: {
          id: 1,
          name: "Rebe Parker",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    }
  ];


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
            days={days}
            day={day}
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
