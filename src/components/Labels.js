import React, { Component } from 'react';

class Labels extends Component {

  render () {
    return (
      <span className="label label-warning">
        {this.props.label}
      </span>
    );
  }
}

//Message Display

export default Labels;
