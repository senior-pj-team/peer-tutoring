export const getDateWithTime = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(":").map(Number);

  const utcDate = new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours - 7, 
    minutes,
    0,
    0
  ));

  return utcDate;
};