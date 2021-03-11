import { useEffect, useState } from "react";

import Charts from "./Charts";
import IndustryStock from "./IndustryStock";

import { industriesStock } from "../services/getData";

import Loader from "react-loader-spinner";

const IndustriesStock = () => {
	const [seriesData, setSeriesData] = useState([]);

	const [companyName, setCompanyName] = useState("");
	const [companyPrice, setCompanyPrice] = useState(0);
	const [marketCap, setMarketCap] = useState(0);
	const [averageVolume, setAverageVolume] = useState(0);
	const [peRatio, setPeRatio] = useState(0);

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState("");

	const getData = async (filterData) => {
		setSeriesData([]);
		setCompanyName("");

		setIsLoading(true);
		setIsError(false);

		try {
			const response = await industriesStock(filterData);

			if (response.statusText !== "OK") {
				throw new Error("Error requesting market stock data...");
			}

			if (!filterData) {
				Object.entries(response.data).forEach((data) => {
					setSeriesData((series) => [
						{
							x: data[1].quote.symbol,
							y: data[1].quote.latestPrice.toFixed(2),
						},
						...series,
					]);
				});
			} else {
				response.data.chart.forEach((chart) => {
					setSeriesData((series) => [
						{
							x: chart.date,
							y: [
								chart.open.toFixed(2),
								chart.high.toFixed(2),
								chart.low.toFixed(2),
								chart.close.toFixed(2),
							],
						},
						...series,
					]);
				});

				setCompanyName(response.data.quote.companyName);
				setCompanyPrice(response.data.quote.latestPrice.toFixed(2));
				setMarketCap(response.data.quote.marketCap);
				setAverageVolume(response.data.quote.avgTotalVolume);
				setPeRatio(response.data.quote.peRatio);
			}
		} catch (error) {
			console.error(error);
			setIsError(true);
			setError(error.message);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			{isError && <div className="isError">Error:{error}</div>}

			{isLoading ? (
				<Loader
					type="ThreeDots"
					color="#216fed"
					height={100}
					width={100}
					style={{ textAlign: "center" }}
				/>
			) : (
				<>
					{!companyName ? (
						<Charts
							seriesData={seriesData}
							chartType="bar"
							getData={getData}
						/>
					) : (
						<>
							<IndustryStock
								seriesData={seriesData}
								companyName={companyName}
								companyPrice={companyPrice}
								getData={getData}
								marketCap={marketCap}
								averageVolume={averageVolume}
								peRatio={peRatio}
							/>
						</>
					)}
				</>
			)}
		</>
	);
};

export default IndustriesStock;
