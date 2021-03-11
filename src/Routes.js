import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import IntradayPrices from "./components/IntradayPrices";

const Routes = () => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/intraday" component={IntradayPrices} />
			</Switch>
		</Router>
	);
};

export default Routes;
