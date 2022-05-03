import React from 'react'
import styles from './aboutUs.module.css'
const _aboutUs = () => {
  return (
    <div className={styles.outermostAboutUs}>
<img
    src={require("../../../attachables/reseachers/bigpp_logo.jpg")}
    alt='Bros In Game Logo'
    className={styles.brosLogo}
/>
<h3>Bros In game: Programming Poggers</h3>
<h4>BIG: PP - @ProgrammingChads</h4>
<hr className='horizontalRule '/>

        <p>Good day!
We are a group of grade 12 ICT researchers in Meycauayan National High School for the S.Y. 2021 - 2022</p>


<p>As a part of final research before graduating, we were tasked to conduct an output based research that solves
a particular problem within our school with connection to our uptaken strand.</p>


<p>As a way to give back to our school, we decided to go balls out and conduct a research about the efficacy of having
our own school managed media platform for the digital advancement in the web and internet.</p>



<h4>Thus came our title...</h4>


<q>The integrated web advancement of Meycauayan Senior High School
 through a school managed media platform</q>

 <p>This research was conducted using the ICT skills that we have learned throughout our education in Meycauayan National High School
and seeks to provide an innovative breakthrough for the betterment of the school community.</p>



    </div>
  )
}

export default _aboutUs