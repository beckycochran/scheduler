import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name is defined", () => {
    //mock onSave qn created
    const onSave = jest.fn();

  //renders the Form with interviewers. Onsave becomes onSave
  const { getByText, queryByText } = render(
    <Form
      interviewers={interviewers}
      onSave={onSave}
      name="Lydia Miller-Jones"
    />
  );
  //clicks the save button
    fireEvent.click(getByText("Save"));


    /* 3. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    /* 4. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);
    /* 5. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });


});
