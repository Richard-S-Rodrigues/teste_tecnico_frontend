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
						<a href="/">Industries Stocks</a>
					</li>
					<li>
						<a href="/">Intraday Prices</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
