import React from "react";
import styles from "./_background.module.css";
import Navbar from "../components/navbar/navbar";
import Mobilenav from "../components/navbar/mobileNav/mobileNav";
const Background = props => {
	return (
		<section
			className={styles.bambooBackground}
			style={{
				background: `url(${require("../attachables/mnhs-images/main_background.jpg")})`,
			}}
		>
			<Navbar />
			<div className={styles.lightYellowBackground}>{props?.page}</div>
			<Mobilenav />
		</section>
	);
};

export default Background;
