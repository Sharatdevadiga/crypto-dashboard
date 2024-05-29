/**
 * Renders a dropdown component for selecting the base currency.
 * The selected base currency is stored in the Redux store.
 *
 * @returns {JSX.Element} The rendered BaseCurrencyDropDown component.
 */
import { useDispatch, useSelector } from "react-redux";
import CoinDropdown from "./CoinDropdown";
import { setBaseCurrency } from "./coinDropdownSlice";

function BaseCurrencyDropDown() {
  const dispatch = useDispatch();
  const { baseCurrency } = useSelector((state) => state.coinDropdown);

  return (
    <CoinDropdown
      type="baseCurrency"
      onChange={(e) => dispatch(setBaseCurrency(e.target.value))}
      selectedCoin={baseCurrency}
    />
  );
}
export default BaseCurrencyDropDown;
