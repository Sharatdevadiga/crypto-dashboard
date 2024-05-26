function Select({ type = "default", children, value, onChange }) {
  const className = ` ${type === "baseCurrency" ? "bg-white" : "bg-gray-50"} px-4 py-2 rounded-lg  outline-blue-400 focus:outline`;

  return (
    <select value={value} onChange={onChange} className={className}>
      {children}
    </select>
  );
}

export default Select;
