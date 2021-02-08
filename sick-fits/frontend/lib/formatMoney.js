export default function formatMoney(amount = 0) {
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  // check if it is clean dollar ammount with no cents
  //if the left-over ammount is zero remove the digits after the decimal point
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }
  const formatter = Intl.NumberFormat("en-Us", options);
  return formatter.format(amount / 100);
}
