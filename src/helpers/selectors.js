export function getAppointmentsForDay(state, name) {
  let filteredDays = state.days.filter(day => {
    return day.name === name;
  });
  if (filteredDays.length === 0) return [];
  return filteredDays[0].appointments.map(
    appointment => state.appointments[appointment]
  );
}

export function getInterviewersForDay(state, day) {
  let finalArr = []
  let dayObject = state.days.find(days => days.name === day);
  if(!dayObject) {
    return finalArr;
  } else {
    dayObject.interviewers.map(interviewer => finalArr.push(state.interviewers[interviewer]));
  }
  return finalArr;
}


export function getInterview(state, interview) {
  let finalObj = {}
  let interviewObj = state.interviewers;
  let studentObj = interview;
  if(interview === null) {
    return null;
  } else {
    for (let id in state.interviewers){
      if(parseInt(id) === studentObj.interviewer) {
        finalObj = {interviewer: interviewObj[id], student: studentObj.student};
      }
    }
  }
  return finalObj;
}
  