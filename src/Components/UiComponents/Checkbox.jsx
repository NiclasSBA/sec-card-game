import React, { Component, PropTypes } from 'react';
import { css } from 'emotion'
class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = (evt) => {
    // evt.stopPropagation();
    // evt.preventDefault();
    const { handleCheckboxChange, card } = this.props;
  

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
    // console.log(card)
if(!this.props.cards){
    this.props.handleCheckboxChange(card);
  }else{
    this.props.toggleAllCheckboxes(this.props.cards, this.props.cardSuit)
  }
}

  render() {
    const { card, cardSuit, cards } = this.props;
    const { isChecked } = this.state;

    return (
      <div className={container()}>
        <label>
          <input
                            type="checkbox"
                            value={card.number || "none"}
                            checked={this.props.isChecked}
                            onChange={this.toggleCheckboxChange }
                        />

         <p> {card.number} {this.props.text}</p>
        </label>
      </div>
    );
  }
}
const container = () => css `
display:flex;
flex-basis: 33%;
justify-content:center;
label{
  min-width: 40px;
  display:flex;
 align-items: baseline;
}
`
// Checkbox.propTypes = {
//   label: PropTypes.string.isRequired,
//   handleCheckboxChange: PropTypes.func.isRequired,
// };

export default Checkbox;