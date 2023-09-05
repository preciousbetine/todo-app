
export function addOrdinalSuffix(date: Date) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November','December'
  ];

  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  const month = months[date.getMonth()]
  const year = date.getFullYear();

  return `${day}${suffix} ${month}, ${year}`;
}

function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }

  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
