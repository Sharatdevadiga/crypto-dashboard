/**
 * Renders the Dashboard page, by bringing together all the components.
 */
import CoinExchange from "../features/coinExchange/CoinExchange";
import DataChart from "../features/dataChart/DataChart";
import BaseCurrencyDropDown from "../features/coinDropdown/BaseCurrencyDropDown";
import Searchbar from "../features/searchBar/Searchbar";
import Logo from "../ui/Logo";
import Portfolio from "../features/portfolio/Portfolio";
import Sidebar from "../features/sidebar/Sidebar";
import Footer from "../ui/Footer";

function Dashboard() {
  return (
    <div>
      <div className="w=screen relative flex h-auto flex-col">
        <Logo />

        {/* section after logo */}
        <div className="mt-5 grid h-auto gap-6 rounded-md bg-gray-50 px-2 py-4 sm:px-12 md:mx-12 lg:grid-cols-4">
          {/* left section */}
          <div className="gap-3 space-y-4 lg:col-span-3">
            <div className="space-y-4">
              <div className="flex gap-3 ">
                <BaseCurrencyDropDown />
                <Searchbar />
              </div>
              <DataChart />
            </div>

            <div className="gap-3 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
              <Portfolio />
              <CoinExchange />
            </div>
          </div>

          {/* side bar */}
          <Sidebar />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Dashboard;
