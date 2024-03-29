import React from "react";
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment/index.js";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import { useApplicationData } from "./hooks/useApplicationData";





export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);
  const days = getAppointmentsForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <a className="created-by" href="http://chenliang.ca">Built By: Chen Liang</a>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={day => setDay(day)}
          />
        </nav>
      </section>
      <section className="schedule">
        {days.map(appointment => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment
              key={appointment.id}
              {...appointment}
              day={state.day}
              interview={interview}
              interviewers={interviewers}
              bookInterview={(id, interview) => bookInterview(id, interview).catch(err => {
                throw err
              })}
              cancelInterview={id => cancelInterview(id).catch(err => {
                throw err
              })}
            />
          );
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}