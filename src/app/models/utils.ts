import {DateTime} from 'luxon';
import {Transaction} from "./transaction";

export const DEFAULT_COLORS = [
  "#ff9d00", "#f73c5c", "#2a8bea", "#48caed"
]

export function formatDate(date: Date): string {
  const inputDate = DateTime.fromJSDate(new Date(date));
  const now = DateTime.now();

  const diff = now.diff(inputDate, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject();
  //console.log(diff);

  if (diff.years >= 1) {
    return inputDate.toFormat('dd/MM/yy');
  } else if (diff.months >= 1) {
    return 'Il y a ' + diff.months + ' mois';
  } else if (diff.days >= 7) {
    return `${Math.floor(diff.days / 7)} semaines`;
  } else if (diff.days >= 1) {
    return `Il y a ${Math.floor(diff.days)} jours`;
  } else if (diff.hours >= 1) {
    return `Il y a ${Math.floor(diff.hours)} heures`;
  } else if (diff.minutes >= 1) {
    return `Il y a ${Math.floor(diff.minutes)} minutes`;
  } else {
    return 'A l\'instant';
  }
}

export function filterTransactions(searchText: string, transactions: Transaction[]) {
  const dataArrays = [];
  transactions.forEach(
    value => {
      if (value.designation.toLowerCase().includes(searchText.toLowerCase()) || value.author.toLowerCase().includes(searchText.toLowerCase())) {
        dataArrays.push(value);
      }
    }
  );
  return dataArrays;
}
