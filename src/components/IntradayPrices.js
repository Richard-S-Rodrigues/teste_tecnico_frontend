import { useEffect, useState } from "react";

import Chart from "react-apexcharts";

import Loader from "react-loader-spinner";

import PropTypes from "prop-types";

import { intradayPrices } from "../services/getData";

const IntradayPrices = () => {
	const [companySymbol, setCompanySymbol] = useState("aapl");

	const [openPrice, setOpenPrice] = useState([]);
	const [lowPrice, setLowPrice] = useState([]);
	const [highPrice, setHighPrice] = useState([]);
	const [closePrice, setClosePrice] = useState([]);

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState("");

	const getData = async (companySymbol) => {
		setOpenPrice([]);
		setLowPrice([]);
		setHighPrice([]);
		setClosePrice([]);

		setIsLoading(true);
		setIsError(false);

		try {
			const response = await intradayPrices(companySymbol);

			if (response.statusText !== "OK") {
				throw new Error("Error requesting data");
			}

			response.data.forEach((value) => {
				setOpenPrice((oValue) => [
					{
						x: value.label,
						y: value.open.toFixed(2),
					},
					...oValue,
				]);
				setLowPrice((lValue) => [
					{
						x: value.label,
						y: value.low.toFixed(2),
					},
					...lValue,
				]);
				setHighPrice((hValue) => [
					{
						x: value.label,
						y: value.high.toFixed(2),
					},
					...hValue,
				]);
				setClosePrice((cValue) => [
					{
						x: value.label,
						y: value.close.toFixed(2),
					},
					...cValue,
				]);
			});
		} catch (error) {
			console.error(error.message);
			setIsError(true);
			setError(error.message);
		}

		setIsLoading(false);
	};

	const handleSearch = (event) => {
		event.preventDefault();
		const searchItem = event.target[0].value;

		setCompanySymbol(searchItem);
		getData(searchItem);

		event.target[0].value = "";
	};

	useEffect(() => {
		getData(companySymbol);
	}, [companySymbol]);

	const chartData = {
		series: [
			{
				name: "Open price",
				data: Array.from(openPrice).reverse(),
			},
			{
				name: "High price",
				data: Array.from(highPrice).reverse(),
			},
			{
				name: "Low price",
				data: Array.from(lowPrice).reverse(),
			},
			{
				name: "Close price",
				data: Array.from(closePrice).reverse(),
			},
		],

		options: {
			chart: {
				height: 350,
				type: "line",
			},
			colors: ["#262e38", "#4f8ff7", "#216fed", "#de4343"],

			stroke: {
				curve: "smooth",
				width: 2,
			},
			dropShadow: {
				enabled: true,
				top: 3,
				left: 2,
				blur: 4,
				opacity: 1,
			},

			title: {
				text: companySymbol,
				align: "center",
				offsetY: 25,
				offsetX: 20,
				style: {
					fontSize: "26px",
				},
			},
			subtitle: {
				text: "Intraday Prices",
				align: "center",
				offsetY: 55,
				offsetX: 20,
				style: {
					fontSize: "18px",
				},
			},
			markers: {
				size: 6,
				strokeWidth: 0,
				hover: {
					size: 9,
				},
			},
			grid: {
				show: true,
				padding: {
					bottom: 0,
				},
			},

			legend: {
				position: "top",
				horizontalAlign: "right",
				offsetY: -20,
			},
			responsive: [
				{
					breakpoint: 438,
					options: {
						chart: {
							width: "100%",
							height: 500,
						},
					},
				},
			],
		},
	};

	return (
		<>
			{isError && <div className="isError">Error:{error}</div>}

			<form onSubmit={handleSearch}>
				<input type="text" placeholder="Search" />
				<button type="submit">Submit</button>
			</form>
			<div>
				{isLoading ? (
					<Loader
						type="ThreeDots"
						color="#216fed"
						height={100}
						width={100}
						style={{ textAlign: "center" }}
					/>
				) : (
					<Chart
						options={chartData.options}
						series={chartData.series}
						width="85%"
						type="line"
					/>
				)}
			</div>
		</>
	);
};

IntradayPrices.propTypes = {
	companySymbol: PropTypes.string,
};

export default IntradayPrices;
