import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import "../../attachables/fontello-alpha/fontello-fba870b0/css/fontello.css";
import Menu from "./menu/menu";
import Rightbar from "./rightbar/rightbar";
const Navbar = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	function handleNavigation(e) {
		e.preventDefault();
		const path = e.currentTarget.getAttribute("href");
		navigate(state?.from?.pathname ?? path, { replace: true });
	}

	return (
		<section>
			<div className={styles.mobileMenuNav}>
				<Menu />
				<Rightbar />
			</div>

			<nav id={styles.stickyHeaderNav}>
				<div className={styles.scrollmenu}>
					<div className={styles.navMenuHandler}>
						<Menu />
					</div>

					<div className={styles.navMain}>
						<a
							title='Home'
							href='/'
							onClick={handleNavigation}
						>
							<i className='icon-home'></i> <p>Home</p>
						</a>
						<a
							title='Messages'
							href='/messages'
							onClick={handleNavigation}
						>
							<i className='icon-chat'></i> <p>Messages</p>
						</a>
						<a
							title='School Forum'
							href='/school-forum'
							onClick={handleNavigation}
						>
							<i className='icon-tasks'></i> <p>School Forum</p>
						</a>
						<a
							title='Class Schedule'
							href='/class-schedule'
							onClick={handleNavigation}
						>
							<i className='icon-calendar'></i>{" "}
							<p>Class Schedule</p>
						</a>
						<a
							title='News and Events'
							href='/news-and-events'
							onClick={handleNavigation}
						>
							<i className='icon-info-circled'></i>{" "}
							<p>News and Events</p>
						</a>
					</div>

					<div className={styles.navProfileHandler}>
						<Rightbar />
					</div>
				</div>
			</nav>
		</section>
	);
};
export default Navbar;
