import { Link } from "react-router-dom";

import styles from "./index.module.css";

import Logo from "../../assets/logo.png";

const Header = () => {
	return (
		<header className={styles.container}>
			<div className={styles.logoContainer}>
				<h1>
					<img src={Logo} alt="Mediar Logo" />
					Graphs
				</h1>
			</div>
			<nav className={styles.navContainer}>
				<ul>
					<li>
						<Link to="/">Industries Stocks</Link>
					</li>
					<li>
						<Link to="/intraday">Intraday Prices</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
