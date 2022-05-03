import React, { useEffect, useState } from "react";
import styles from "./signup.module.css";
import { axios } from "../../context/axios";
import { useLocation, useNavigate } from "react-router-dom";
import Section from "./section";
import Spinner from "../../components/spinner/spinner";

const Signup = () => {
	const { state } = useLocation();
	const navigate = useNavigate();

	const [userFirstName, setUserFirstName] = useState("");
	const [userLastName, setUserLastName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [userGrade, setUserGrade] = useState("");
	const [userSection, setUserSection] = useState("");
	const [userStrand, setUseStrand] = useState("");

	const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
	const [showSpinner, setShowSpinner] = useState(false);

	const signupBackground = {
		background: `url(${require("../../attachables/campus-images/image5.jpg")})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
	};

	const loginRedirect = () =>
		navigate(state?.from?.pathname ?? "/login", { replace: true });
	const handleFirstName = e => setUserFirstName(e.currentTarget.value);
	const handleLastName = e => setUserLastName(e.currentTarget.value);
	const handleUserEmail = e => setUserEmail(e.currentTarget.value);
	const handleUserPassword = e => setUserPassword(e.currentTarget.value);

	const handleUserGrade = e => {
		setUserGrade(e.currentTarget.value);
	};
	const handleUserStrand = e => {
		setUseStrand(e.currentTarget.value);
	};

	const [showSection, setShowSection] = useState([]);
	useEffect(() => {
		setShowSection(Section(userGrade, userStrand).section_get);
	}, [userGrade, userStrand]);

	const handleUserSection = e => setUserSection(e.currentTarget.value);
	const handleUserPasswordConfirm = e =>
		setUserPasswordConfirm(e.currentTarget.value);

	const handleClear = () => {
		setUserFirstName("");
		setUserLastName("");
		setUserEmail("");
		setUserPassword("");
		setUserGrade("");
		setUserSection("");
		setUseStrand("");
		setUserPasswordConfirm("");
	};

	function handleSubmit(e) {
		e.preventDefault();
		if (userPassword !== userPasswordConfirm) {
			return alert("Password does not match");
		} else if (
			userPassword === userPasswordConfirm &&
			userFirstName !== "" &&
			userLastName !== "" &&
			userEmail !== "" &&
			userPassword !== "" &&
			userGrade !== "" &&
			userSection !== "" &&
			userStrand !== ""
		) {
			setShowSpinner(true);
			axios
				.post("/signup", {
					firstName: userFirstName,
					lastName: userLastName,
					email: userEmail,
					password: userPassword,
					grade: userGrade,
					section: userSection,
					strand: userStrand,
				})
				.then(res => {
					if (res.data.error) return alert(res.data.error);
					setShowSpinner(false);
					navigate(state?.from?.pathname ?? "/login", {
						replace: true,
					});
				})
				.catch(err => {
					alert(err.message);
				});
		} else {
			alert("Please fill up all the fields");
		}
	}

	return (
		<>
			{showSpinner ? (
				<Spinner />
			) : (
				<section
					className={styles.signupBackground}
					style={signupBackground}
				>
					<div className={styles.outerSignupDiv}>
						<form
							method='post'
							action='/signup'
							className={styles.mainSignupDiv}
							onSubmit={handleSubmit}
						>
							<div className={styles.flexItem}>
								<div>
									<img
										src={require("../../attachables/mnhs-images/logos/mnhs_favicon_og.ico")}
										alt='Meycauayan National High School - School Logo'
										className={"mnhsLogo"}
										loading='lazy'
									/>
									<hr className={"horizontalRule"} />
									<p>
										Welcome to the sign up for the
										unofficial school website of Meycauayan
										National High School - Senior High
										School. Please fill out the following
										form to sign up for the website.
									</p>
									<button
										type='button'
										onClick={loginRedirect}
									>
										Back to Login
									</button>
								</div>
							</div>

							<hr className={styles.horizontalRuleHidden} />

							<div className={styles.flexItem}>
								<section className={styles.signUpSection}>
									<h2>Student Sign Up Form</h2>
									<h3>
										Please fill out the following fields
									</h3>
									<hr className={"horizontalRule"} />
									<div className={styles.firstLastName}>
										<div>
											<label>Student First Name:</label>
											<input
												type='text'
												autoComplete='off'
												autoFocus
												required
												maxLength={30}
												placeholder='ex. Juan'
												onChange={handleFirstName}
												value={userFirstName}
											/>
										</div>
										<div>
											<label>Student Last Name:</label>
											<input
												type='text'
												autoComplete='off'
												required
												maxLength={30}
												placeholder='ex. Dela Cruz'
												onChange={handleLastName}
												value={userLastName}
											/>
										</div>
									</div>

									<label>Student Email:</label>
									<input
										type='email'
										autoComplete='off'
										required
										minLength={10}
										maxLength={30}
										placeholder='ex. juandelacruz@gmail.com'
										onChange={handleUserEmail}
										value={userEmail}
									/>

									<label>Student Full Password:</label>
									<input
										type='password'
										required
										minLength={10}
										maxLength={30}
										placeholder='ex. password_ni_juan69'
										onChange={handleUserPassword}
										value={userPassword}
									/>

									<label>Double Check Password:</label>
									<input
										type='password'
										required
										minLength={10}
										maxLength={30}
										placeholder='ex. password_ni_juan69'
										onChange={handleUserPasswordConfirm}
										value={userPasswordConfirm}
									/>

									<div className={styles.gradeInformation}>
										<div
											className={
												styles.gradeInformationItem
											}
										>
											<label>Grade</label>
											<select
												required
												onChange={handleUserGrade}
												value={userGrade}
											>
												<option value=''>
													Select Grade
												</option>
												<option value='11'>11</option>
												<option value='12'>12</option>
											</select>
										</div>
										<div
											className={
												styles.gradeInformationItem
											}
										>
											<label>Strand</label>
											<select
												required
												onChange={handleUserStrand}
												value={userStrand}
											>
												<option value=''>
													Select Strand
												</option>
												<option value='STEM'>
													STEM
												</option>
												<option value='HUMMS'>
													HUMMS
												</option>
												<option value='GAS'>GAS</option>
												<option value='ABM'>ABM</option>
												<option value='ICT'>ICT</option>
												<option value='HE'>
													Home Economics
												</option>
											</select>
										</div>
										<div
											className={
												styles.gradeInformationItem
											}
										>
											<label>Section</label>
											<select
												name='sign_up_section'
												required
												disabled={
													userGrade && userStrand
														? false
														: true
												}
												onChange={handleUserSection}
												value={userSection}
											>
												<option value=''>
													Select Section
												</option>
												{showSection ? (
													showSection.map(section => {
														return (
															<option
																key={section.id}
																value={
																	section.id
																}
															>
																{section}
															</option>
														);
													})
												) : (
													<></>
												)}
											</select>
										</div>
									</div>

									<button
										type='button'
										onClick={handleClear}
									>
										Clear Fields
									</button>
								</section>
							</div>

							<hr className={styles.horizontalRuleHidden} />

							<div className={styles.flexItem}>
								<div>
									<p>
										After you have filled out the form, a
										verification email will be sent to you.
										Please click on the link in the email to
										verify your account. Once you have
										verified your account, you will be able
										to login to the system.
									</p>
									<hr className={"horizontalRule"} />
									<p>
										You will be able to access the school's
										online media platform where you can
										chat, post and engage with other
										students and teachers!
									</p>
									<hr className={"horizontalRule"} />
									<p>
										We do not sell, trade, or rent your
										personal information to third parties.
										If you have any questions, please do not
										hesitate to contact us at any time.
									</p>
									<button type='submit'>
										Send Verification Email
									</button>
								</div>
							</div>
						</form>
					</div>
				</section>
			)}
		</>
	);
};
export default Signup;
