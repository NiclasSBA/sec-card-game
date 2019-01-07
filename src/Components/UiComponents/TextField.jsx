import React, { Component, Fragment } from "react";



import { css } from "emotion";

import colors from "../../base-styles/colors";
class TextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      errors: {
          IsOnlyLettersAndNumbers: false,
          
      }, currentName: ""
    };
  }

  handleText = event => {
   
    this.setState({
        name: event.target.value
    })
    // console.log(this.state.name)
};
handleClick = (event) => {
   
    //I probably need some sort of text validation here
    //Its one of the few places that i actually take userinput

    //right now users can be named with a-z, A-Z & 0-9, no special chars is allowed as of 19/12-2018

    if(this.state.name != ""){
        
        // console.log("not empty string")
        if(this.state.name.match(/^[a-zA-Z0-9]+$/)){
            this.setState({
                errors:{
                    IsOnlyLettersAndNumbers: true
                }
            })
            this.props.handleClick(this.state.name)
        }else{
            this.setState({
                errors:{
                    IsOnlyLettersAndNumbers: false
                }
            })
        }
    }

  }
  render() {
  
    
    return (
    
                <Fragment>

                    <input
                      onChange={ this.handleText}
                      type="text"
                      maxLength="20" 
                      placeholder={this.props.currentGame.nickName || "Set your nickname here"}
                    />
                    <p className={container()} onClick={this.handleClick}>Set Name</p> 
                    </Fragment>
                 
    );
  }
}
const container = props => css`
    
            border: none;
            
            padding: 15px 32px;
            max-height:100%;
            text-align: center;
    
`;

const mapStateToProps = state => ({
  // ...
});



export default TextField;
