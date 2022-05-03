import React, { useState, useContext, useEffect } from "react";
import styles from "./rightbar.module.css";
import "../../../attachables/fontello-alpha/fontello-fba870b0/css/fontello.css";
import AuthContext from "../../../context/AuthProvide";
const Rightbar = () => {
	const { user, socket, sectionOnlineSetter, sectionOnline } =
		useContext(AuthContext);
	const [isOpen, setIsOpen] = useState(false);
	const [onlineUsers, setOnlineUsers] = useState([]);
	function openSideBar() {
		setIsOpen(e => !e);
	}
	const openStyle = {
		width: isOpen ? "275px" : "0px",
		borderLeft: isOpen ? "3px solid black" : "none",
	};
	useEffect(() => {
		socket.on("set_user_online", data => {
			sectionOnlineSetter(data);
		});
		socket.on("remove_user_online", data => {
			sectionOnlineSetter(data);
		});
	}, [socket]);

	useEffect(() => {
		setOnlineUsers(sectionOnline);
	}, []);
	return (
		<>
			<button
				className={styles.menuButton}
				onClick={openSideBar}
			>
				<div className={styles.container}>
					<div className={styles.menuBar}></div>
					<div className={styles.menuBar}></div>
					<div className={styles.menuBar}></div>
				</div>
			</button>

			<div
				className={styles.rightSideBar}
				style={openStyle}
			>
				<a
					className={styles.closeMenuRight}
					onClick={openSideBar}
				>
					&times;
				</a>
				<div className={styles.sidemenuFlex}>
					<div className={styles.sidemenuItem}>
						<div>
							<i
								className={[
									`icon-user-circle`,
									styles.profileImage,
								].join(" ")}
							></i>
						</div>
						<h3>
							{user?.user_f_name} {user?.user_l_name}
						</h3>
						<h3>
							{user?.user_section_grade} -{" "}
							{user?.user_section_strand}{" "}
							{user?.user_section_name}
						</h3>
						<hr className={"horizontalRuleYellow"} />
						<h2>
							<i className='icon-users'> Online Friends</i>
						</h2>
						<ul className={styles.sectionOnlineClass}>
							{onlineUsers?.map(user => {
								return <li>{user?.username}</li>;
							})}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Rightbar;
