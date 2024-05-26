function BaseCurrencyDropDown() {
  return (
    <select
      name=""
      id=""
      className="ring-grey-50 rounded-md px-4 py-2 text-sm font-semibold shadow-sm outline-blue-400 ring-offset-2 hover:ring-0 focus:outline"
    >
      <option value="USD">USD</option>
      <option value="INR">INR</option>
    </select>
  );
}

export default BaseCurrencyDropDown;
