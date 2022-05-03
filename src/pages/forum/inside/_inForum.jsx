import React, { useEffect, useContext, useState} from "react";
import AuthContext from "../../../context/AuthProvide";
import "../../../__main/_background";
import { axios } from "../../../context/axios";
import styles from './inForum.module.css';
import Right from "./right/right";
import Left from "./left/left";
import NewResponse from "./newResponse/newResponse";

const _inForum = () => {
	const { currentForum } = useContext(AuthContext);
    const [queries, setQueries] = useState([]);
    const [responses, setResponses] = useState([]);


	useEffect(() => {
        axios.post("/school-forum/forum", {
            currentForum
        }).then(res => {
            setQueries(res.data.result);
            setResponses(res.data.responses);
        }).catch(err => {
            /* Ignore */
        })
    }, []);
	return (
    <section className={styles.outermostInForm}>
        <NewResponse />
        <div className={styles.secondOutermost}>
            <Left data={queries}/>
            <Right data={responses}/>
        </div>
    </section>
    );
};
export default _inForum;