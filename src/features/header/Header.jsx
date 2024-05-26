import BaseCurrencyDropDown from "./BaseCurrencyDropDown";
import Searchbar from "./Searchbar";

function Header({ styles }) {
  return (
    <div className={`${styles} flex items-center gap-3`}>
      <BaseCurrencyDropDown />
      <Searchbar />
    </div>
  );
}

export default Header;
