export const currencyStringToNumber = (str: string): number => {
  const strWithoutDot = str.replaceAll(".", "");
  return Number(strWithoutDot);
};

export default currencyStringToNumber;
