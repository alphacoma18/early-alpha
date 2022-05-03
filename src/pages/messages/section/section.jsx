import React, { useState, useContext } from "react";
import AuthContext from "../../../context/AuthProvide";
import styles from "./section.module.css";
import { axios } from "../../../context/axios";
import { useNavigate, useLocation } from "react-router-dom";
const ENTER_URI = "/enter_chat";

const Section = props => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const { user, chatIdSetter } = useContext(AuthContext);

	const [value, setValue] = useState(props.subjectId);
	async function handleEnterChat(e) {
		e.preventDefault();
		await axios
			.post(ENTER_URI, {
				user_section: user.user_section_id,
				subject_id: value,
			})
			.then(res => {
				chatIdSetter(res.data.chat_id, res.data.subject_name);
				navigate(state?.from?.pathname ?? `/messages/chat/${res.data.chat_id}`, { replace: true });
			})
			.catch(err => {
				/* ignore */
			});
	}

	return (
		<>
			<form className={styles.chatItem}>
				<button
					onClick={handleEnterChat}
					className={styles.enterChat}
				>
					{props.subject}
				</button>
			</form>
		</>
	);
};

export default Section;
