import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import { joinSocket, joinGameRoom } from "../../actions/index";
import { css } from "emotion";

import colors from "../../base-styles/colors";
class TextFieldCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      errors: {
          IsOnlyLettersAndNumbers: false,
          
      }
    };
  }

  handleText = event => {
   
    this.setState({
        code: event.target.value
    })
    console.log(this.state.code)
};
handleClick = (event) => {
   
    //I probably need some sort of text validation here
    //Its one of the few places that i actually take userinput

    //right now users can be named with a-z, A-Z & 0-9, no special chars is allowed as of 19/12-2018

    if(this.state.code != ""){
        
      
            this.props.handleClick(this.state.code)
      
          
    }

  }
  render() {
  
    
    return (
    
                <Fragment>

                    <input
                      onChange={ this.handleText}
                      type="text"
                      maxLength="32" 
                      placeholder="Put game code here"
                    />
                    <p className={container()} onClick={this.handleClick}>Join Game</p> 
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

const mapDispatchToProps = dispatch => ({
  joinSocket: socket => dispatch(joinSocket(socket)),
  joinGameRoom: socket => dispatch(joinGameRoom(socket))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextFieldCode);
