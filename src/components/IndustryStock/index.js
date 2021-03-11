import Charts from "../Charts.js";

import styles from "./index.module.css";

const IndustryStock = ({
	seriesData,
	companyName,
	companyPrice,
	getData,
	marketCap,
	averageVolume,
	peRatio,
}) => {
	return (
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
					getData={null}
				/>
			</section>
		</>
	);
};

export default IndustryStock;
