import { useEffect, useState } from "react";

import Charts from "./Charts";

import { industriesStockData } from "../services/getData";

import Loader from "react-loader-spinner";

const IndustriesStock = () => {
	const [seriesData, setSeriesData] = useState([]);

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState("");

	const getData = async () => {
		setSeriesData([]);

		setIsLoading(true);
		setIsError(false);

		try {
			const response = await industriesStockData();

			if (response.statusText !== "OK") {
				throw new Error("Error requesting market stock data...");
			}

			Object.entries(response.data).forEach((data) => {
				setSeriesData((series) => [
					{
						x: data[1].quote.symbol,
						y: data[1].quote.latestPrice.toFixed(2),
					},
					...series,
				]);
			});
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
				<Charts seriesData={seriesData} chartType="bar" />
			)}
		</>
	);
};

export default IndustriesStock;
