//
const getDaysAmountInMonth = (month, year) => {
  switch (month) {
    case 1:
      if (year % 4 === 0) {
        return 29;
      } else {
        return 28;
      };
    case 3:
      return 30;
    case 5:
      return 30;
    case 8:
      return 30;
    case 10:
      return 30;
    default:
      return 31;
  }
}


//
export const getWeekDay = (numberOfDay) => {
  switch (numberOfDay) {
    case 1:
      return 'Mo';
    case 2:
      return 'Tu'
    case 3:
      return 'We'
    case 4:
      return 'Th'
    case 5:
      return 'Fr'
    case 6:
      return 'Sa'
    default:
      return 'Su'
  }
}


//
export const getMonthName = (numberOfMonth) => {
  switch (numberOfMonth) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
}


//
export const getMonthArray = (month, year) => {
  const daysAmount = getDaysAmountInMonth(month, year);
  const monthArray = [];

  for (let i = 1; i <= daysAmount; i++) {
    let weekDay = new Date(year, month, i).getDay();

    if (weekDay === 0) {
      weekDay = 7
    };

    const day = {
      weekDay,
      day: i,
      month,
      year,
    };

    monthArray.push(day);
  };

  return monthArray;
}