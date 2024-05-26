import BaseCurrencyDropDown from "./BaseCurrencyDropDown";
import Searchbar from "./Searchbar";

function Header() {
  return (
    <div className={`flex items-center gap-3`}>
      <BaseCurrencyDropDown />
      <Searchbar />
    </div>
  );
}

export default Header;
