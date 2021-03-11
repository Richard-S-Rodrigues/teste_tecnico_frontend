import api from "./api";

export const intradayPricesData = (companySymbol = "aapl") => {
	return api.get(`/stock/${companySymbol}/intraday-prices?chartLast=5`);
};

export const industriesStockData = (companySymbol) => {
	return api.get(
		companySymbol
			? `/stock/${companySymbol}/batch?types=quote,chart&range=1m`
			: "/stock/market/batch?symbols=aapl,amzn,msft,googl,fb,nvda&types=quote,chart&range=1m"
	);
};
