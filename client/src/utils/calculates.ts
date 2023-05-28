export const calculateOffPercent = (price: number, offPercent: number) => {
  const discount = price * (offPercent / 100);
  const offPrice = price - discount;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(offPrice);
};
