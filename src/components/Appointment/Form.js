import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from 'react';
import "./styles.scss";

export default function Form(props) {


  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");



  const reset = function () {
    setName("");
    setInterviewer(null);
    return;
  }

  const cancel = function () {
    props.onCancel();
    reset();
  }

  const save = () => {

    function validate() {
      if (name === "") {
        setError("Student name cannot be blank");
        return;
      }

      props.onSave(name, interviewer);
    }


    const result = validate();
    if (result) {
      setError("");
      props.onSave(name, interviewer);
    } else {
      setError("Please provide a student name and interviewer");
      reset();
    }
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>

          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            placeholder="Enter Student Name"
            value={props.name}
            type="text"
            onChange={(event) => {
              setName(event.target.value)
            }}
            data-testid="student-name-input"
          />

          <section className="appointment__validation">{error}</section>

        </form>

        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />

      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={props.onCancel} danger>Cancel</Button>
          <Button onClick={props.onSave} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}
