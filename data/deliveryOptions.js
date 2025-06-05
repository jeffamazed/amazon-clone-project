export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  const chosenDeliveryOpt = deliveryOptions.find(
    (option) => option.id === deliveryOptionId
  );

  return chosenDeliveryOpt || deliveryOptions[0];
}

function isWeekend(date) {
  const dayOfWeek = date.day();
  return dayOfWeek === 0 || dayOfWeek === 6;
}

export function calculateDeliveryDate(today, deliveryOptDay) {
  let remainingDays = deliveryOptDay;
  let totalDays = 0;
  let date = today;

  while (remainingDays > 0) {
    date = date.add(1, "days");

    if (isWeekend(date)) {
      totalDays++;
      continue;
    }
    remainingDays--;
    totalDays++;
  }

  const deliveryDate = today.add(totalDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

  return dateString;
}
