import moment from 'moment';
import { ValueType, isProbablyTimestamp } from '@/data/parser';

export const DATE_FORMAT = 'M/D/YY HH:mm:ss';
export const DATE_FORMAT_NO_HMS = 'M/D/YY';

export const isNumber = (value: string): boolean => {
  return !isNaN(+value);
};

export const fileSizeDisplay = (size: number): string => {
  const base = 1000;
  if (size < base) {
    return size + 'B';
  } else if (size < base * base) {
    return (size / base).toFixed(2) + 'KB';
  } else {
    return (size / base / base).toFixed(2) + 'MB';
  }
};

export const dateDisplay = (value: string | number): string => {
  const valueStr = value.toString().trim();
  if (isNumber(valueStr) && valueStr.match(/^\d{4}$/) !== null) {
    // Note that we cannot create new Date() with UTC time string like
    // '1490285474832', which would throw "Invalid Date".
    // The exception is four-digit string year, which we should keep intact.
    return (+valueStr).toString();
  }
  const date = isProbablyTimestamp(valueStr) ? new Date(+valueStr) : new Date(value);
  if (date.toString() !== 'Invalid Date') {
    // If the date contains no hh:mm:ss values, only display up to day.
    if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0 && date.getMilliseconds() === 0) {
      return moment(date).format(DATE_FORMAT_NO_HMS);
    }
  }
  return moment(date).format(DATE_FORMAT);
};


export const valueDisplay = (value: string | number, type: ValueType): string => {
  if (type === ValueType.FLOAT || type === ValueType.INT) {
    return (+value).toString();
  } else if (type === ValueType.DATE) {
    return dateDisplay(value);
  }
  return value.toString();
};
