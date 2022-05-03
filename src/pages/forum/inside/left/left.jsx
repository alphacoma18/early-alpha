import React from "react";
import styles from "./left.module.css";
const Left = ({ data }) => {
	return (
		<>
			<div className={styles.outermostLeft}>
				<div className={styles.secondOuter}>
					<div className={styles.header}>
						<h3>
							{data?.query_header || "Error: Go back to forum"}
						</h3>
					</div>
					<hr className='horizontalRuleYellow' />
					<div className={styles.body}>
						<p>{data?.query_body}</p>
						<div className={styles.meta}></div>
					</div>
					<hr className='horizontalRuleYellow' />
					<div className={styles.meta}>
						<p>
							{data?.section_grade} {data?.section_strand}{" "}
							{data?.section_name} - {data?.account_first_name}{" "}
							{data?.account_last_name}
						</p>
						<p>{data?.query_timestamp}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Left;
