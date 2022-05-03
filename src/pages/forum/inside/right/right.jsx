import React, { useContext } from "react";
import styles from "./right.module.css";
import AuthContext from "../../../../context/AuthProvide";
const Right = ({ data }) => {
	const { currentForum } = useContext(AuthContext);
	return (
		<section className={styles.outermostRight}>
			<div className={styles.responsesSay}>
				<h3>Forum Query #{currentForum} Responses</h3>
			</div>
      {
        data.map((response) => {
          return (
            <div className={styles.responses} key={response.general_id}>
              <p>{response.response_content}</p>
              <p className={styles.meta}>{response.section_grade} {response.section_strand} {response.section_strand} - {response.account_first_name} {response.account_last_name}</p>
              <p className={styles.meta}>{response.response_timestamp}</p>
            </div>
          )
        })
      }
		</section>
	);
};

export default Right;
