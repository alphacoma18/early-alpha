import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../../../context/AuthProvide";
import { axios } from "../../../context/axios";
import "../../../attachables/fontello-alpha/fontello-fba870b0/css/fontello.css";
import styles from "./chat.module.css";

const GET_CHAT_URI = "/messages/chat/";
const POST_CHAT_URI = "/messages/chat/";

const _Chat = () => {
	const scrollRef = useRef(!null);
	const { user, chatId, subjectName, socket } = useContext(AuthContext);
	const [chat, setChat] = useState([]);
	const [chatContent, setChatContent] = useState("");
	const [inChatUsers, setInChatUsers] = useState([]);

	useEffect(() => {
		socket.emit("_entered_chat", { chatId });
		socket.emit("_online_users", {
			chatId,
			user_id: user.user_id,
			user_name: `${user.user_f_name} ${user.user_l_name}`,
		});
		axios
			.get(GET_CHAT_URI, {
				params: {
					chatId,
				},
			})
			.then(res => {
				setChat(res.data.result);
				scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
			})
			.catch(err => {});

		return () => {
			socket.emit("_left_chat", {
				chatId,
				user_id: user.user_id,
			});
		};
	}, []);

	useEffect(() => {
		socket.on("message_recieve", data => {
			setChat(chat => [...chat, data]);
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		});
		socket.on("online_users", data => {
			setInChatUsers(data);
		});
		socket.on("left_chat", data => {
			setInChatUsers(data);
		});
		return () => {
			socket.off("message_recieve");
			socket.off("online_users");
			socket.off("left_chat");
		};
	}, [socket]);

	const handleChatContent = (e) => {
		if (e.currentTarget.value.length <= 255) return setChatContent(e.currentTarget.value)
		setChatContent(chatContent)
	};

	async function handleSendChat(e) {
		let timestamp = new Date();
		timestamp.setHours(timestamp.getHours() + 8);
		let data = {
			account_first_name: user.user_f_name,
			account_last_name: user.user_l_name,
			chat_content: chatContent,
			chat_timestamp: timestamp,
		};
		await socket.emit("_send_message", { chatId, data });
		e.preventDefault();
		await axios
			.post(POST_CHAT_URI, {
				chat_id: chatId,
				user_id: user.user_id,
				content: chatContent,
			})
			.then(res => {
				scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
				setChatContent("");
			})
			.catch(err => {
				setChatContent("");
			});
	}

	return (
		<section className={styles.outermostChatSection}>
			<div className={styles.chatPositioner}>
				<div className={styles.chatSection}>
					<div className={styles.chatSidebar}>
						<div className={styles.sidebarPositioner}>
							<div>
								<h2>
									<i className='icon-empire'></i> Class Name:{" "}
								</h2>
								<h3>
									{subjectName
										? subjectName
										: "Error: Go back to messages"}
								</h3>
								<h4>
									{user.user_section_grade} -{" "}
									{user.user_section_strand}{" "}
									{user.user_section_name}
								</h4>
								<hr className='horizontalRuleYellow' />
							</div>

							<h3>
								<i className='icon-podcast'></i> Currently In
								Room:
							</h3>
							<div className={styles.currentlyOnline}>
								<ul className={styles.onlineList}>
									{inChatUsers.map(user => {
										return <li>{user.user_name}</li>;
									})}
								</ul>
							</div>
						</div>
					</div>

					<div
						className={styles.mainChatShow}
						ref={scrollRef}
					>
						{chat.map(message => {
							let you = false;
							if (
								message.account_first_name ===
									user.user_f_name &&
								message.account_last_name === user.user_l_name
							)
								you = true;
							return (
								<div
									className={styles.chatMessage}
									key={message.general_id}
								>
									<p className={styles.senderName}>
										{you ? (
											"You"
										) : (
											<>
												{message.account_first_name}{" "}
												{message.account_last_name}
											</>
										)}
									</p>
									<p>{message.chat_content}</p>
									<p className={styles.timestamp}>
										{message.chat_timestamp}
									</p>
								</div>
							);
						})}
					</div>

					<form className={styles.messageForm}>
						<textarea
							className={styles.textarea}
							placeholder='>>> Enter Your Message'
							value={chatContent}
							onChange={handleChatContent}
							required
							autoFocus
							onKeyPress={event => {
								event.key === "Enter" && event.ctrlKey && handleSendChat(event);
							}}
						></textarea>
						<button
							onClick={handleSendChat}
							type='submit'
							className={styles.sendButton}
						>
							<i className='icon-paper-plane'></i>Send
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default _Chat;
