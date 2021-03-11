import { useState, useEffect } from "react";

import { industriesStockData } from "../../services/getData";

import Charts from "../Charts.js";

import Loader from "react-loader-spinner";

import styles from "./index.module.css";

const IndustryStock = () => {
	const [seriesData, setSeriesData] = useState([]);

	const [companyName, setCompanyName] = useState("");
	const [companyPrice, setCompanyPrice] = useState(0);
	const [marketCap, setMarketCap] = useState(0);
	const [averageVolume, setAverageVolume] = useState(0);
	const [peRatio, setPeRatio] = useState(0);

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const getData = async () => {
			setIsError(false);
			setCompanyName("");
			setSeriesData([]);

			setIsLoading(true);

			const symbolFromPath = window.location.pathname
				.replace(/^\/stocks/g, "")
				.replace("/", "");

			try {
				const response = await industriesStockData(symbolFromPath);

				if (response.statusText !== "OK") {
					throw new Error("Error requesting market stock data...");
				}
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
			} catch (error) {
				console.error(error);
				setIsError(true);
				setError(error.message);
			}

			setIsLoading(false);
		};

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
					<section className={styles.cardsContainer}>
						<div className={styles.card}>
							<span>${marketCap}</span>
							<small>Market Cap</small>
						</div>
						<div className={styles.card}>
							<span>{averageVolume}</span>
							<small>Average Volume</small>
						</div>
						<div className={styles.card}>
							<span>{peRatio}</span>
							<small>P/E Ratio</small>
						</div>
					</section>
					<section className={styles.chartContainer}>
						<Charts
							seriesData={seriesData}
							chartType="candlestick"
							title={`${companyName} - $${companyPrice}`}
						/>
					</section>
				</>
			)}
		</>
	);
};

export default IndustryStock;
