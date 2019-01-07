import React, { Component, Fragment } from "react";




import { css } from "emotion";

class About extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <div>   
           <p> This project was made as part of an assignment, It's a lightweight way of integrating security into your development.</p>
           <h2>Disclaimer</h2>
           <p>No organisation endorses this project in any way, shape or form. This project was solely created to demonstrate knowledge within technologies used, </p>
           <h2>License</h2>
           <p>The cards used as reference in this project belongs to OWASP: 
               OWASP Cornucopia is free to use. It is licensed under the Creative Commons Attribution-ShareAlike 3.0 license, so you can copy, distribute and transmit the work, and you can adapt it, and use it commercially, but all provided that you attribute the work and if you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.</p>

            <h3>Contact</h3>
            <p>Github Repo:  <a target="_blank" href="https://github.com/NiclasSBA/sec-card-game">https://github.com/NiclasSBA/sec-card-game</a></p>
            <p>LinkedIn:  <a  target="_blank" href="https://www.linkedin.com/in/niclasandersen/">https://www.linkedin.com/in/niclasandersen/</a></p>
           </div>
    )
  }
}
const container = () => css`
  .current-card {
    padding: 0 3rem;
    max-height: 200px;
    min-height: 200px;
    overflow: hidden;
    position: relative;
    p {
      padding: 0 5rem;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: -17px;
      overflow-y: scroll;
    }
  }
`;
const mapStateToProps = state => ({
  // ...
});



export default About;
