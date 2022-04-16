import moment from 'moment';

export const getTimeDetail = () => {
  const month = moment().month() + 1;
  const week = moment().weekday();
  const date = moment().date();
  return { month, week, date };
};
