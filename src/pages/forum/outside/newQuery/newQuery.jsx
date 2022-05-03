import React, { useState, useContext } from "react";
import AuthContext from "../../../../context/AuthProvide";
import styles from "./newQuery.module.css";
import { axios } from "../../../../context/axios";
const new_query_uri = "/school-forum";
const NewQuery = () => {
	const { user } = useContext(AuthContext);
	const [questionHeader, setQuestionHeader] = useState("");
	const [questionBody, setQuestionBody] = useState("");
	const [questionHeaderLength, setQuestionHeaderLength] = useState(0);
	const [questionBodyLength, setQuestionBodyLength] = useState(0);

	function handleQuestionHeader(e) {
		if (e.currentTarget.value.length <= 100) {
			setQuestionHeader(e.currentTarget.value);
			setQuestionHeaderLength(e.currentTarget.value.length);
		} else {
			setQuestionHeader(questionHeader);
		}
	}
	function handleQuestionBody(e) {
		if (e.currentTarget.value.length <= 1000) {
			setQuestionBody(e.target.value);
			setQuestionBodyLength(e.target.value.length);
		} else {
			setQuestionBody(questionBody);
		}
	}
	const [show, setShow] = useState(false);
	const [plus, setPlus] = useState(true);
	function handleShow() {
		setShow(show => !show);
		setPlus(plus => !plus);
	}

	function handleSubmit(e) {
		e.preventDefault();
		axios
			.post(new_query_uri, {
				id: user.user_id,
				section_id: user.user_section_id,
				header: questionHeader,
				body: questionBody,
			})
			.then(res => {
				setQuestionHeader("");
				setQuestionBody("");
				if (show) {
					setShow(show => !show);
					setPlus(plus => !plus);
				}
			})
			.catch(err => {
				setQuestionHeader("");
				setQuestionBody("");
			});
	}
	function handleReset() {
		setQuestionHeader("");
		setQuestionBody("");
		setQuestionHeaderLength(0);
		setQuestionBodyLength(0);
	}

	return (
		<>
			<section className={styles.outermostRight} style={{display: show ? "flex" : "none"}}>
				<div className={styles.secondOutermost}>
					<form
						method='post'
						className={styles.forumForm}
						onSubmit={handleSubmit}
					>
						<textarea
							className={styles.questionHeader}
							placeholder='>>> Enter Question Header
						[max. 100 Characters]'
							autoFocus
							value={questionHeader}
							onChange={handleQuestionHeader}
						/>
						<textarea
							className={styles.questionBody}
							placeholder='>>> Enter Question Body
						[max. 1000 Characters]'
							value={questionBody}
							onChange={handleQuestionBody}
							onKeyPress={event => {
								event.key === "Enter" &&
									event.ctrlKey &&
									handleSubmit(event);
							}}
						></textarea>
						<div className={styles.questionButtons}>
							<button
								type='reset'
								onClick={handleReset}
							>
								Clear Fields
							</button>
							<button type='submit'>Ask Question</button>
						</div>
					</form>
					<div className={styles.counterDiv}>
						<h4>Current Header Count: {questionHeaderLength}</h4>
						<h4>Current Body Count: {questionBodyLength}</h4>
					</div>
				</div>
			</section>
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

export default NewQuery;
