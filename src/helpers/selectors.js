export function getAppointmentsForDay(state, name) {
  let filteredDays = state.days.filter(day => {
    return day.name === name;
  });
  if (filteredDays.length === 0) return [];
  return filteredDays[0].appointments.map(
    appointment => state.appointments[appointment]
  );
}