import React, { Component, PropTypes } from 'react';

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

    this.props.handleCheckboxChange(card);
  }

  render() {
    const { card, cardSuit } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
                            type="checkbox"
                            value={card.number || "none"}
                            checked={isChecked}
                            onChange={this.toggleCheckboxChange}
                        />

          {card.number} {card.suit}
        </label>
      </div>
    );
  }
}

// Checkbox.propTypes = {
//   label: PropTypes.string.isRequired,
//   handleCheckboxChange: PropTypes.func.isRequired,
// };

export default Checkbox;