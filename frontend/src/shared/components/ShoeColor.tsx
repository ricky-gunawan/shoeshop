type ShoeColorProps = {
  color: string;
};

const ShoeColor = ({ color }: ShoeColorProps) => {
  return (
    <span
      className={`rounded-md px-1 ${
        color === "black"
          ? "bg-black text-white"
          : color === "blue"
          ? "bg-blue-600 text-white"
          : color === "green"
          ? "bg-green-600 text-white"
          : color === "red"
          ? "bg-red-600 text-white"
          : color === "white"
          ? "border bg-white text-black"
          : ""
      }`}
    >
      {color}
    </span>
  );
};

export default ShoeColor;
