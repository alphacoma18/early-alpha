import React from "react";
import styles from "./spinner.module.css";
const Spinner = () => {
	return (
		<section className={styles.loadingSpinnerOuter}>
			<div className={styles.loadingSpinnerDiv}>
				<div className={styles.loadingSpinner}></div>
			</div>
		</section>
	);
};

export default Spinner;
