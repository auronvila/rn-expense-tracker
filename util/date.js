import dayjs from 'dayjs';

export function getFormattedDate(date){
  return dayjs(date).format('DD.MM.YYYY')
}