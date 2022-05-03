import React, { useContext, useEffect, useState } from "react";
import styles from "./left.module.css";
import AuthContext from "../../../../context/AuthProvide";
import { axios } from "../../../../context/axios";
import '../../../../attachables/fontello-alpha/fontello-fba870b0/css/fontello.css'
const filter_uri = "/school-forum/filter";
const Left = () => {
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { socket, queryCount, filteredForumSetter} = useContext(AuthContext);
	const [currentFilter, setCurrentFilter] = useState("");

	useEffect(() => {
		socket.emit("_add_forum_online_user", {});
		return () => {
			socket.emit("_remove_forum_online_user", {});
		};
	}, []);

	useEffect(() => {
		socket.on("add_forum_online_user", data => {
			setOnlineUsers(data);
		});
		socket.on("remove_forum_online_user", data => {
			setOnlineUsers(data);
		});
		return () => {
			socket.off("add_forum_online_user");
			socket.off("remove_forum_online_user");
		};
	}, [socket]);

	function handleFilter(e) {
		e.preventDefault()
		const filter = e?.currentTarget?.getAttribute("value");
		if (currentFilter || filter) {
			axios.post(filter_uri, { filter, currentFilter })
				.then(res => {
					filteredForumSetter(res?.data?.result)
				}).catch(err => {
			})
		}
	}

	return (
		<section className={styles.outermostRightForum}>
			<div className={styles.stickyLeft}>
				<h2><i className="icon-help-circled">All Questions:</i> {queryCount}</h2>
				<h3><i className="icon-podcast">Currently Online:</i> {onlineUsers}</h3>
				<hr className='horizontalRule' />
				<h3><i className="icon-filter">Search Filters</i></h3>

				<form className={styles.mobileFilter} onSubmit={handleFilter}>
					<select
						required
						onChange={e => setCurrentFilter(e.currentTarget.value)}
						value={currentFilter}
					>
						<option value={"newest"}>Newest</option>
						<option value={"oldest"}>Oldest</option>
						<option value={"mostUpvoted"}>Most Upvoted</option>
						<option value={"mostViewed"}>Most Viewed</option>
						<option value={"noAnswers"}>No Answers</option>
						<option value={"highlighted"}>Highlighted</option>
					</select>
					<button type='submit'>Filter</button>
				</form>
				<form className={styles.filterButtons}>
					<button onClick={handleFilter} value={"newest"}>Newest</button>
					<button onClick={handleFilter} value={"oldest"}>Oldest</button>
					<button onClick={handleFilter} value={"mostUpvoted"}>Most Upvoted</button>
					<button onClick={handleFilter} value={"mostViewed"}>Most Viewed</button>
					<button onClick={handleFilter} value={"noAnswers"}>No Answers</button>
					<button onClick={handleFilter} value={"highlighted"}>Highlighted</button>
				</form>
				<div>
					<hr className='horizontalRule' />
				</div>
			</div>
		</section>
	);
};

export default Left;
