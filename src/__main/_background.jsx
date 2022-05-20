import React from "react";
import styles from "./_background.module.css";
import Navbar from "../components/navbar/navbar";
import Mobilenav from "../components/navbar/mobileNav/mobileNav";
import { useLayoutEffect, useState } from 'react';
const Background = props => {
	const [width, windowHeight] = useWindowSize();

	return (
		<section
			className={styles.bambooBackground}
			style={{
				background: `url(${require("../attachables/mnhs-images/main_background.jpg")})`,
			}}
		>
			<Navbar />
			<div className={styles.lightYellowBackground}
			style={{height: windowHeight - 64}}
			>{props?.page}</div>
			<Mobilenav />
		</section>
	);
};

export default Background;



function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

