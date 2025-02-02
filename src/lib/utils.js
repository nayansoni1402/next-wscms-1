import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatColumnName(columnName) {
  return columnName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, str => str.toUpperCase());
}

export function formatDateMoment(dateString) {
  return moment(dateString).format('MMMM Do YYYY, h:mm:ss a');
}