/**
 * Renders the Portfolio component which displays the Global mCap% of majour cryptocurrencies.
 * The component fetches portfolio data from the server and renders a pie chart
 * representing the market capitalization percentage of each cryptocurrency in the portfolio.
 * It also displays the total value of the portfolio.
 */
import { useEffect } from "react";
import { fetchPortfolioData } from "./portfolioSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";
import { pieChartOptions, getPiechartData } from "./PieChart";
import { Pie } from "react-chartjs-2";

function Portfolio() {
  const dispatch = useDispatch();
  const { status, marketCapData, error } = useSelector(
    (state) => state.portfolio,
  );

  useEffect(() => {
    dispatch(fetchPortfolioData());
  }, []);

  return (
    <div className="h-80 rounded-lg bg-white p-6 dark:bg-slate-950">
      <div className="flex justify-between gap-12">
        <p className="text-lg font-bold">Portfolio (Global m.cap %)</p>
        <p>
          <span className="opacity-40">Total value: </span>{" "}
          <span className="font-bold">100%</span>
        </p>
      </div>
      <div className="flex h-full items-center justify-center self-center">
        {status === "loading" && <Loader />}
        {status === "error" && <Error message={error} />}
        {marketCapData && (
          <Pie
            data={getPiechartData(marketCapData)}
            options={pieChartOptions}
          />
        )}
        ;
      </div>
    </div>
  );
}

export default Portfolio;
