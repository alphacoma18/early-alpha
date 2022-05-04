import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./login.module.css";
import AuthContext from "../../context/AuthProvide";
import { useLocation, useNavigate } from "react-router-dom";
import { axios } from "../../context/axios";
const LOGIN_URI = "/login";

const Login = () => {
	const { state } = useLocation();
	const navigate = useNavigate();

	const { login, socket } = useContext(AuthContext);
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [error, setError] = useState("");
	const [errorShow, setErrorShow] = useState(false);

	const errorRef = useRef();

	useEffect(() => {
		setError("");
		setErrorShow(false);
	}, [userEmail, userPassword]);

	function checkToken() {
		axios
			.post(
				"/check_refresh_token",
				{},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			)
			.then(res => {
				login(res.data.userInfo, res.data.accessToken);
			})
			.catch(err => {
				if (err.response.status === 418)
					return (window.location.href = "/login");
			});
	}

	useEffect(() => {
		async function autoLogUser() {
			await axios
				.post(
					"/check_refresh_token",
					{},
					{
						withCredentials: true,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
						},
					}
				)
				.then(res => {
					socket.emit("_set_user_online", {
						section_id: res.data.userInfo.user_section_id,
						username: `${res.data.userInfo.user_f_name} ${res.data.userInfo.user_l_name}`,
					});
					login(res.data.userInfo, res.data.accessToken);
					navigate(state?.from?.pathname ?? "/", { replace: true });
				})
				.catch(err => {
					// do nothing
				});
		}
		autoLogUser();

		setInterval(() => {
			checkToken();
		}, 1000 * 60 * 14); // 14 minutes
	}, []);

	const loginStyle = {
		background: `url(${require("../../attachables/campus-images/image1.jpg")})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
	};
	const errorStyle = {
		textAlign: "center",
		padding: "10px",
		background: "yellow",
		color: "black",
		borderRadius: "5px",
		marginBottom: "10px",
		fontWeight: "bold",
	};

	function handleSubmit(e) {
		e.preventDefault();
		axios
			.post(
				LOGIN_URI,
				{
					email: userEmail,
					password: userPassword,
				},
				{
					withCredentials: true,
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				}
			)
			.then(response => {
				if (response.data.error) return setError(response.data.error);
				socket.emit("_set_user_online", {
					section_id: response.data.userInfo.user_section_id,
					username: `${response.data.userInfo.user_f_name} ${response.data.userInfo.user_l_name}`,
				});
				login(response.data.userInfo, response.data.accessToken);
				navigate(state?.from?.pathname ?? "/", { replace: true });
			})
			.catch(error => {
				console.log(error.response);
				console.log(error.response?.message);
				if (!error?.response) {
					setError("NO SERVER RESPONSE");
					setErrorShow(true);
				} else if (error.response?.status === 400) {
					setErrorShow(true);
					setError("MISSING EMAIL OR PASSWORD");
				} else if (error.response?.status === 401) {
					setError("UNAUTHORIZED ACCESS");
					setErrorShow(true);
				} else {
					setError(error.response.data.error);
					setErrorShow(true);
				}
				errorRef.current.focus();
			});
	}

	function resetForm() {
		setUserEmail("");
		setUserPassword("");
	}
	function signupRedirect() {
		navigate("/signup", { replace: true });
	}

	return (
		<section style={loginStyle}>
			<div className={styles.loginHolder}>
				<div className={styles.loginFormat}>
					<form
						action='/login'
						method='post'
						onSubmit={handleSubmit}
					>
						<img
							src={require("../../attachables/mnhs-images/logos/mnhs_favicon_og.ico")}
							alt='Meycauayan National High School - School Logo'
							className={"mnhsLogo"}
						/>
						<h2>Student Log In Form</h2>
						<hr className={"horizontalRule"} />

						<div
							ref={errorRef}
							aria-live='assertive'
							className={styles.loginError}
							style={errorShow ? errorStyle : { display: "none" }}
						>
							{error}
						</div>

						<label htmlFor='user_email'>
							Account Email Address:
						</label>
						<input
							type='email'
							name='user_email'
							id='user_email'
							placeholder='>>> Enter your email'
							autoComplete='off'
							minLength={10}
							maxLength={30}
							autoFocus
							required
							value={userEmail}
							onChange={e => setUserEmail(e.target.value)}
						/>
						<label htmlFor='user_password'>Account Password:</label>
						<input
							type='password'
							name='user_password'
							id='user_password'
							placeholder='>>> Enter your password'
							required
							minLength={10}
							maxLength={30}
							value={userPassword}
							onChange={e => setUserPassword(e.target.value)}
						/>
						<button
							type='button'
							onClick={signupRedirect}
						>
							Need an account?
						</button>
						<button
							type='reset'
							onClick={resetForm}
						>
							Clear Fields
						</button>
						<button type='submit'>Link Start!</button>
					</form>
				</div>
			</div>
		</section>
	);
};
export default Login;
