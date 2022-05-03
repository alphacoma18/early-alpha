import React, { useState, useEffect, useContext } from "react";
import Section from "../section/section";
import styles from "./messages.module.css";
import { axios } from "../../../context/axios";
import AuthContext from "../../../context/AuthProvide";
import Spinner from "../../../components/spinner/spinner";

const getSection = "/get_section";
const _Messages = () => {
	const { user } = useContext(AuthContext);
	const [mainSubjects, setMainSubjects] = useState([]);
	useEffect(() => {
		axios
			.post(getSection, { section_id: user.user_section_id })
			.then(res => {
				setMainSubjects(res.data.zipped);
			})
			.catch(err => {
				/* ignore */ 
			});
	}, []);

	const sectionAppear = mainSubjects.length > 0;

	return (
		<>
			{sectionAppear ? (
				<section className={styles.arrangeClasses}>
					{mainSubjects.map((subject, index) => {
						return (
							<Section
								key={index}
								subject={subject[0]}
								subjectId={subject[1]}
							/>
						);
					})}
				</section>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default _Messages;
