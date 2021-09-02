import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  // const interviewerProfile = props.item.map(
  //   (item) => {
  //     return (
  //       <InterviewerListItem
  //         id={item.id}
  //         name={item.name}
  //         avatar={item.avatar}
  //         selected={item.selected}
  //         setInterviewer={item.setInterviewer}
  //       />
  //     )
  //   }
  // );

  // return <ul>{interviewerProfile}</ul>
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  )
}