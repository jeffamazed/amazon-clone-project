export function getDateString(today, addDay, format) {
  const dateString = today.add(addDay, "days").format(format);
  return dateString;
}
