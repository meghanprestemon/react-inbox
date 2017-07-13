import React, { Component } from 'react';

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectAll: 'minus',
    }
  }

  selectAllMessages() {
    let selectAll
    if(this.state.selectAll === 'minus') {
      selectAll = 'check';
      this.props.updateAll({selected: true})
    } else {
      selectAll = 'minus';
      this.props.updateAll({selected: false})
    }
    this.setState({selectAll});
  }

  render () {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={() => this.selectAllMessages()}>
            <i className={`fa fa-${this.state.selectAll}-square-o`}></i>
          </button>

          <button className="btn btn-default">
            Mark As Read
          </button>

          <button className="btn btn-default">
            Mark As Unread
          </button>

          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    );
  }
}

//bulk select/deselect
//mark message as unread
//delete messages
//add label
//remove label
//unread message count
//select all button state

export default Toolbar;
