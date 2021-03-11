import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import IntradayPrices from "./components/IntradayPrices/index.js";
import IndustryStock from "./components/IndustryStock";

const Routes = () => {
	// eslint-disable-next-line
	const stocksPath = window.location.pathname;

	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/intraday" component={IntradayPrices} />
				<Route path="/:stockPath" component={IndustryStock} />
			</Switch>
		</Router>
	);
};

export default Routes;
