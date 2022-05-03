import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../../context/AuthProvide";
import styles from "./right.module.css";
import { axios } from "../../../../context/axios";
import { useNavigate } from "react-router-dom";
const get_forum_query = "/school-forum";
const Right = () => {
	const navigate = useNavigate();
	const { getQueryCount, filteredForum, currentForumSetter} = useContext(AuthContext);
	const [queries, setQueries] = useState([]);

	useEffect(() => {
		axios.get(get_forum_query).then(res => {
			getQueryCount(res.data.result.length);
			setQueries(res.data.result);
		});
	}, []);

	useEffect(() => {
		setQueries(filteredForum);
		getQueryCount(filteredForum.length);
	}, [filteredForum]);
	function handleRedirect(e) {
		e.preventDefault();
		let x = e.currentTarget.getAttribute("href");
		currentForumSetter(x);
		navigate(`/school-forum/forum/${x}`);
	}

	return (
		<section className={styles.mainForumDiv}>
			{queries.map(query => {
				return (
					<div
						className={styles.forumQuery}
						key={query.query_id}
					>
						<div className={styles.queryPositioner}>
							<div className={styles.queryMeta}>
								<p>0 Answers</p>
								<p>0 Upvotes</p>
								<p>0 Views</p>
							</div>
							<div className={styles.queryData}>
								<h4 className={styles.queryHeader}>
									<a
										href={query.query_id}
										onClick={handleRedirect}
									>
										{query.query_header}
									</a>
								</h4>
								<p className={styles.queryBody}>
									{query.query_body}
								</p>
								<h5 className={styles.queryAsker}>
									{query.account_first_name}{" "}
									{query.account_last_name} from{" "}
									{query.section_grade} -{" "}
									{query.section_strand}
								</h5>
								<h5 className={styles.queryTimestamp}>
									{query.query_timestamp}
								</h5>
							</div>
						</div>
					</div>
				);
			})}

			<hr className='horizontalRuleYellow' />
		</section>
	);
};

export default Right;
