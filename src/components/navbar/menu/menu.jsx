import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./menu.module.css";
import "../../../attachables/fontello-alpha/fontello-fba870b0/css/fontello.css";
import { axios } from "../../../context/axios";

const Menu = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(null);

	const openMenu = {
		width: isOpen ? "275px" : "0px",
		borderRight: isOpen ? "3px solid black" : "none",
	};

	function handleMenu() {
		setIsOpen(e => !e);
	}
	function handleRedirect(e) {
		e.preventDefault();
		const path = e.currentTarget.getAttribute("href");
		navigate(state?.from?.pathname ?? path, { replace: true });
	}
	async function handleLogout(e) {
		e.preventDefault();
		await axios
			.delete("/logout", {
				withCredentials: true,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			})
			.then(res => {
				navigate(state?.from?.pathname ?? "/login", { replace: true });
			})
			.catch(err => {
				/* Ignore */
			});
	}

	return (
		<>
			<button
				className={styles.menuButton}
				onClick={handleMenu}
			>
				<div className={styles.container}>
					<div className={styles.menuBar}></div>
					<div className={styles.menuBar}></div>
					<div className={styles.menuBar}></div>
				</div>
			</button>

			<div
				className={styles.sidemenu}
				style={openMenu}
			>
				<div className={styles.sidemenuFlex}>
					<a
						className={styles.closeMenu}
						onClick={handleMenu}
					>
						&times;
					</a>
					<div className={styles.sidemenuItem}>
						<img
							loading='lazy'
							className={styles.menuMnhs}
							src={require("../../../attachables/mnhs-images/logos/mnhs_logo.jpg")}
						/>
						<p>Meycauayan National High School</p>
						<p>The Unofficial Website</p>
						<q>Be the best, choose MNHS</q>
						<hr className={"horizontalRuleYellow"} />
						<a
							href='/profile'
							onClick={handleRedirect}
						>
							<i className='icon-user'> Profile</i>
						</a>
						<a
							href='/bookmarks'
							onClick={handleRedirect}
						>
							<i className='icon-bookmark'> Bookmarks</i>
						</a>
						<a
							href='/to-do-list'
							onClick={handleRedirect}
						>
							<i className='icon-th-list'> To Do List</i>
						</a>
						<a
							href='/word-process'
							onClick={handleRedirect}
						>
							<i className='icon-doc-text-inv'> Word Process</i>
						</a>
						<a
							href='/settings'
							onClick={handleRedirect}
						>
							<i className='icon-cog'> Settings</i>
						</a>

						<a
							href='/logout'
							onClick={handleLogout}
						>
							<i className='icon-logout'> Logout</i>
						</a>

						<hr className={"horizontalRuleYellow"} />
						<a
							href='/about-us'
							onClick={handleRedirect}
						>
							<i className='icon-bank'> About Us</i>
						</a>
						<a
							href='/site-updates'
							onClick={handleRedirect}
						>
							<i className='icon-code'> Site Updates</i>
						</a>
						<a
							href='/privacy-policy'
							onClick={handleRedirect}
						>
							<i className='icon-shield'> Privacy Policy</i>
						</a>
						<a
							href='/usage-tutorial'
							onClick={handleRedirect}
						>
							<i className='icon-desktop'> Usage Tutorial</i>
						</a>
						<a
							href='/contact-us'
							onClick={handleRedirect}
						>
							<i className='icon-mail-alt'> Contact Us</i>
						</a>

						<hr className={"horizontalRuleYellow"} />
						<p>Copyright &copy; 2022.</p>
						<p>Meycauayan National High School</p>
						<p>All Rights Reserved</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Menu;
