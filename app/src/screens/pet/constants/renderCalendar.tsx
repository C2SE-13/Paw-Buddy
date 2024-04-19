export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const RenderCalendar = (
  dateCurrent?: Date | string | undefined,
  currentDay?: string,
  monthIndex?: number,
  currentYear?: number,
) => {
  let date: Date;

  if (typeof dateCurrent === 'string') {
    date = new Date(dateCurrent);
  } else {
    date = dateCurrent || new Date();
  }

  let currYear = currentYear ?? date.getFullYear();
  let currMonth = monthIndex ?? date.getMonth();
  let data = [];

  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); // getting first day of month
  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of month
  let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); // getting last day of month
  let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month

  for (let i = firstDayofMonth; i > 0; i--) {
    data.push({
      name: 'inactive',
      value: lastDateofLastMonth - i + 1,
    });
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday = i === (currentDay ?? date.getDate()) ? true : false;
    data.push({
      name: isToday ? 'active' : 'day',
      value: i,
    });
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    data.push({
      name: 'inactive',
      value: i - lastDayofMonth + 1,
    });
  }

  return data;
};
