export const currencyNumberToString = (num: number): string => {
  const s = num.toString();
  const a = s.split("").reverse().join("");
  const b = a.replace(/(.{3})/g, "$1.");
  const c = b.split("").reverse().join("");
  return c.charAt(0) === "." ? c.slice(1) : c;
};

export default currencyNumberToString;
