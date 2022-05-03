import React from "react";
import styles from "./forum.module.css";
import Left from "./left/left";
import Right from "./right/right";
import NewQuery from "./newQuery/newQuery";
const _Forum = () => {
	return (
		<>
			<section className={styles.outermostForumSection}>
				<Left />
				<Right />
				<NewQuery />
			</section>
		</>
	);
};

export default _Forum;
