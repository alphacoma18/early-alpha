import React, { useState } from "react";
import { createContext } from "react";
import io from "socket.io-client";
const socket = io.connect("https://mnhs-shs.herokuapp.com");
const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null); // includes f_name, l_name and section information
	const [userToken, setUserToken] = useState(null); // includes access_token
	const [authed, setAuthed] = useState(false); // true if user is logged in

	const [queryCount, setQueryCount] = useState(0); // number of questions
	function getQueryCount(count) {
		setQueryCount(count);
	}

	function login(user, token) {
		setUser(user);
		setUserToken(token);
		setAuthed(true);
	}

	const [chatId, setChatId] = useState(null); // includes chat_id
	const [subjectName, setSubjectName] = useState(null); // includes subject_name

	function chatIdSetter(chatId, subjectName) {
		setChatId(chatId);
		setSubjectName(subjectName);
	}

	const [sectionOnline, setSectionOnline] = useState([]);
	function sectionOnlineSetter(sectionOnline) {
		setSectionOnline(sectionOnline);
	}

	const [filteredForum, setFilteredForum] = useState([]);
	function filteredForumSetter(filteredForum) {
		setFilteredForum(filteredForum);
	}

	const [currentForum, setCurrentForum] = useState("");
	function currentForumSetter(currentForum) {
		setCurrentForum(currentForum);
	}

	return (
		<AuthContext.Provider
			value={{
				login,
				user,
				authed,
				userToken,
				chatIdSetter,
				chatId,
				subjectName,
				socket,
				sectionOnlineSetter,
				sectionOnline,
				getQueryCount,
				queryCount,
				filteredForumSetter,
				filteredForum,
				currentForumSetter,
				currentForum
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
