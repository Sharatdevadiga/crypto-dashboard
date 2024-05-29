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
    <div className="p-6 bg-white h-80">
      <div className="flex justify-between gap-12">
        <p className="text-lg font-bold">Portfolio (Global m.cap %)</p>
        <p>
          <span className="opacity-40">Total value: </span>{" "}
          <span className="font-bold">100%</span>
        </p>
      </div>
      <div className="flex items-center self-center justify-center h-full">
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
