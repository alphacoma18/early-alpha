import React, { useState, useContext } from "react";
import styles from "./newResponse.module.css";
import AuthProvider from "../../../../context/AuthProvide";
import { axios } from "../../../../context/axios";

const NewResponse = () => {
	const { user, currentForum } = useContext(AuthProvider);
	const [show, setShow] = useState(false);
	const [plus, setPlus] = useState(true);
	const [response, setResponse] = useState("");
	const [responseLength, setResponseLength] = useState(0);

	function handleShow() {
		setShow(show => !show);
		setPlus(plus => !plus);
	}
	function handleResponse(e) {
		if (e.target.value.length <= 500) {
			setResponse(e.currentTarget.value);
			setResponseLength(e.currentTarget.value.length);
			return;
		}
		return setResponse(response);
	}
	function handleSubmit(e) {
		e.preventDefault();
		axios
			.post("/school-forum/reponses", {
				id: user.user_id,
				forum_id: currentForum,
				response: response,
			})
			.then(res => {
				setResponse("");
				if (show) {
					setShow(show => !show);
					setPlus(plus => !plus);
				}
			})
			.catch(err => {
				setResponse("");
				if (show) {
					setShow(show => !show);
					setPlus(plus => !plus);
				}
			});
	}

	return (
		<>
			<div
				className={styles.outermostNewResponse}
				style={{ display: show ? "flex" : "none" }}
			>
				<div className={styles.secondOutermost}>
					<form
						method='post'
						className={styles.forumForm}
						onSubmit={handleSubmit}
					>
						<textarea
							className={styles.responseBody}
							placeholder='>>> Write your response here
                            [Max. 500 characters]'
							value={response}
							autoFocus
							onChange={handleResponse}
							onKeyPress={event => {
								event.key === "Enter" &&
									event.ctrlKey &&
									handleResponse(event);
							}}
						></textarea>
						<div className={styles.questionButtons}>
							<button type='reset'>Clear Fields</button>
							<button type='submit'>Ask Question</button>
						</div>
					</form>
					<div className={styles.counterDiv}>
						<h4>Current Response Count: {responseLength}</h4>
					</div>
				</div>
			</div>
			<button
				className={styles.mobileAskButton}
				onClick={handleShow}
			>
				<i
					className='icon-minus-circled'
					style={{ display: plus ? "none" : "block" }}
				></i>
				<i
					className='icon-plus-circled'
					style={{ display: plus ? "block" : "none" }}
				></i>
			</button>
		</>
	);
};

export default NewResponse;
