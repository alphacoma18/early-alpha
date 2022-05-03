import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthProvide";
import { axios } from "../../context/axios";

const _Home = () => {
	const { user, userToken } = useContext(AuthContext);
	const [user_id, setUser_id] = useState(null);
	useEffect(() => {
		axios
			.get("/home", {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			})
			.then(res => {
				setUser_id(res.data.user_name); 
			})
			.catch(err => {});
	}, []);

	return (
		<>
			<h1>Hello {user_id}</h1>
			<h2>Welcome {user.user_f_name}</h2>
		</>
	);
};

export default _Home;
