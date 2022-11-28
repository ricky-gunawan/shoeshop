import { ChangeEvent } from "react";

type FilterProps = {
  brand: "all" | "nike" | "adidas" | "reebok" | "vans" | "new_balance" | "converse" | "puma";
  color: "all" | "black" | "red" | "white" | "blue" | "green";
  handleFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Filter = ({ brand, color, handleFormChange }: FilterProps) => {
  return (
    <div className="w-fit rounded-lg bg-black/30 p-2 text-neutral-50 shadow-md lg:bg-neutral-50 lg:text-black">
      <div className="mx-auto w-fit text-lg font-bold">Filters</div>
      <hr className="border border-gray-300" />
      <form>
        <div className="flex flex-col">
          <span className="m-2 font-semibold">Brand :</span>
          <div className="ml-6 flex flex-col">
            <label className="flex items-center" htmlFor="all">
              <input className="rounded-md text-green-700 focus:ring-1 focus:ring-green-700" type="radio" name="brand" id="all" value="all" checked={brand === "all"} onChange={handleFormChange} />
              <span className="ml-2">All</span>
            </label>
            <label className="flex items-center" htmlFor="adidas">
              <input className="rounded-md text-green-700 focus:ring-1 focus:ring-green-700" type="radio" name="brand" id="adidas" value="adidas" checked={brand === "adidas"} onChange={handleFormChange} />
              <span className="ml-2">Adidas</span>
            </label>
            <label className="flex items-center" htmlFor="converse">
              <input className="rounded-md text-green-700 focus:ring-1 focus:ring-green-700" type="radio" name="brand" id="converse" value="converse" checked={brand === "converse"} onChange={handleFormChange} />
              <span className="ml-2">Converse</span>
            </label>
            <label className="flex items-center" htmlFor="new_balance">
              <input className="rounded-md text-green-700 focus:ring-1 focus:ring-green-700" type="radio" name="brand" id="new_balance" value="new_balance" checked={brand === "new_balance"} onChange={handleFormChange} />
              <span className="ml-2">New Balance</span>
            </label>
            <label className="flex items-center" htmlFor="nike">
              <input className="rounded-md text-green-700 focus:ring-1 focus:ring-green-700" type="radio" name="brand" id="nike" value="nike" checked={brand === "nike"} onChange={handleFormChange} />
              <span className="ml-2">Nike</span>
            </label>
            <label className="flex items-center" htmlFor="puma">
              <input className="rounded-md text-green-700 focus:ring-1 focus:ring-green-700" type="radio" name="brand" id="puma" value="puma" checked={brand === "puma"} onChange={handleFormChange} />
              <span className="ml-2">Puma</span>
            </label>
            <label className="flex items-center" htmlFor="reebok">
              <input className="rounded-md text-green-700 focus:ring-1 focus:ring-green-700" type="radio" name="brand" id="reebok" value="reebok" checked={brand === "reebok"} onChange={handleFormChange} />
              <span className="ml-2">Reebok</span>
            </label>
            <label className="flex items-center" htmlFor="vans">
              <input className="rounded-md text-green-700 focus:ring-1 focus:ring-green-700" type="radio" name="brand" id="vans" value="vans" checked={brand === "vans"} onChange={handleFormChange} />
              <span className="ml-2">Vans</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="m-2 font-semibold">Color :</span>
          <div className="ml-6 flex flex-col">
            <label className="flex items-center" htmlFor="black">
              <input className="rounded-md text-green-700 focus:ring-1 focus:ring-green-700" type="radio" name="color" id="all" value="all" checked={color === "all"} onChange={handleFormChange} />
              <span className="ml-2">All</span>
            </label>
            <label className="flex items-center" htmlFor="black">
              <input className="rounded-md text-green-700 focus:ring-1 focus:ring-green-700" type="radio" name="color" id="black" value="black" checked={color === "black"} onChange={handleFormChange} />
              <span className="ml-2">Black</span>
            </label>
            <label className="flex items-center" htmlFor="white">
              <input className="rounded-md text-green-700 focus:ring-1 focus:ring-green-700" type="radio" name="color" id="white" value="white" checked={color === "white"} onChange={handleFormChange} />
              <span className="ml-2">White</span>
            </label>
            <label className="flex items-center" htmlFor="red">
              <input className="rounded-md text-green-700 focus:ring-1 focus:ring-green-700" type="radio" name="color" id="red" value="red" checked={color === "red"} onChange={handleFormChange} />
              <span className="ml-2">Red</span>
            </label>
            <label className="flex items-center" htmlFor="blue">
              <input className="rounded-md text-green-700 focus:ring-1 focus:ring-green-700" type="radio" name="color" id="blue" value="blue" checked={color === "blue"} onChange={handleFormChange} />
              <span className="ml-2">Blue</span>
            </label>
            <label className="flex items-center" htmlFor="green">
              <input className="rounded-md text-green-700 focus:ring-1 focus:ring-green-700" type="radio" name="color" id="green" value="green" checked={color === "green"} onChange={handleFormChange} />
              <span className="ml-2">Green</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filter;
