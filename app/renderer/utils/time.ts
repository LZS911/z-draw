import moment from 'moment';

export const getTimeDetail = () => {
  const month = moment().month() + 1;
  const week = moment().weekday();
  const date = moment().date();
  return { month, week, date };
};

export enum TimeFormatEnum {
  dateFormatTime = 'YYYY-MM-DD HH-mm-ss',
  dateFormatDate = 'YYYY-MM-DD',
  dateFormatMonth = 'YYYY-MM',
}
