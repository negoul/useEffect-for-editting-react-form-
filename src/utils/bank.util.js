import {isNumber, isString} from 'utils/functions.util';

export function splitDigit(number, digitSplit = 4) {
  const st = '(\\d{' + digitSplit + '}(?!\\s))';
  const regexp = new RegExp(st, 'g');
  const num = number.trim().replace(regexp, '$1 ').trimEnd();
  return num.split(' ');
}

export function getCardFormat(number) {
  number = splitDigit(number);
  return number.join(' ');
}

export function getMoney(number = '', digitSplit = 3, symbol = '٬') {
  const defaultNumber = isNumber(number) ? number.toString() : isString(number) ? number : '';
  const st = '(\\d{' + digitSplit + '}(?!\\s))';
  const regexp = new RegExp(st, 'g');
  const num = [...defaultNumber].reverse().join('');
  let money = num.trim().replace(regexp, `$1${symbol}`);
  money = money.lastIndexOf(symbol) === money.length - 1 ? money.slice(0, money.length - 1) : money;
  return [...money].reverse().join('');
}