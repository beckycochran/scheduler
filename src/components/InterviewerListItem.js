import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";

export default function InterviewerListItem(props) {
  const interviewer = classnames("interviewers_item", {
    "day-list__item--id": props.selected,
    "day-list__item--name": props.name,
    "day-list__item--avatar": props.avatar,
    "day-list__item--selected": props.selected,
  })

  return (
    <li className={interviewer} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );

}