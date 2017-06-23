// info for formatting javascript new date string
export const dateStringMonths = {
  'Jan': '01',
  'Feb': '02',
  'Mar': '03',
  'Apr': '04',
  'May': '05',
  'Jun': '06',
  'Jul': '07',
  'Aug': '08',
  'Sep': '09',
  'Oct': '10',
  'Nov': '11',
  'Dec': '12',
}

export const numberToMonth = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
}

export const daysInMonths = {
  '01': 32,
  '02': 29,
  '03': 32,
  '04': 31,
  '05': 32,
  '06': 31,
  '07': 32,
  '08': 32,
  '09': 31,
  '10': 32,
  '11': 31,
  '12': 32
}

export const currentDateToDateNo = () => {
  const dateString = new Date().toString().split(' ');
  const month = dateObj[dateString[1]];
  const day = dateString[2];
  const year = dateString[3];
  return parseInt(year + month + day);
}

// export const addDays = (dateNo, days) => {
//   let date = dateNo;
//   if (!typeof dateNo === 'string') {
//     date = date.toString();
//   }
//   let month = date.slice(4, 6);
//   let day = parseInt(date.slice(6));
//
//   const daysInMonth = daysInMonths[month] - 1;
//
//   // if day + days > days in month, add the amount it's greater than to next month's days
//   const remainder = (day + days) - daysInMonth;
//   day = remainder > 0 ? remainder : (day + days);
//   month = remainder > 0 ? parseInt(month) + 1 : parseInt(month);
//
//   const leadingZero = `${parseInt(month) < 10 ? '0' : ''}`;
//   const leadingZeroDay = `${parseInt(day) < 10 ? '0' : ''}`;
//   return `${date.slice(0, 4)}${leadingZero}${month}${leadingZeroDay}${day}`;
// }

export const nextDay = (dateNo) => {
  let date = (parseInt(dateNo) + 1).toString();
  let year = date.slice(0, 4);
  let month = date.slice(4, 6);
  let day = date.slice(6);
  let nextMonthInt = parseInt(month) + 1 < 10 ? '0' + (parseInt(month) + 1).toString() : (parseInt(month) + 1).toString();
  let atMax = daysInMonths[month] === parseInt(day);
  month = atMax ? nextMonthInt : month;
  day = atMax ? '01' : day;
  let formatted = `${year}${month}${day}`;
  return parseInt(formatted);
}

export const previousDay = (dateNo) => {
  let date = (parseInt(dateNo) - 1).toString();
  let year = date.slice(0, 4);
  let month = date.slice(4, 6);
  let day = date.slice(6);
  let prevMonthInt = parseInt(month) - 1 < 10 ? '0' + (parseInt(month) - 1).toString() : (parseInt(month) - 1).toString();
  let atMin = parseInt(day) < 1;
  month = atMin ? prevMonthInt : month;
  day = atMin ? daysInMonths[prevMonthInt.toString()] - 1 : day;
  let formatted = `${year}${month}${day}`;
  return parseInt(formatted);
}

export const formatDateString = () => {
  const dateString = new Date().toString();
  const year = dateString.split(' ')[3];
  const month = dateStringMonths[dateString.split(' ')[1]];
  const day = dateString.split(' ')[2];
  return parseInt(`${year}${month}${day}`);
}

export const makeDateNoPretty = (dateNo) => {
  const string = dateNo.toString();
  const year = string.slice(0, 4);
  const month = numberToMonth[string.slice(4, 6)];
  const day = string.slice(6);
  return `${month} ${day}, ${year}`
}
