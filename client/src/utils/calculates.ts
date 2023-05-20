export const calculateOffPercent = (price: string, offPercent: number) => {
  const numberString = price.replace(/[$,]/g, "");
  const amount = parseFloat(numberString);
  const discount = amount * (offPercent / 100);
  const offPrice = amount - discount;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(offPrice);
};
