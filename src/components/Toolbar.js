import React, { Component } from 'react';

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectAll: 'minus-',
    }
  }

  selectAllMessages() {
    let selectAll
    if(this.state.selectAll === '') {
      selectAll = 'check-';
      this.props.updateAll({selected: true})
    } else {
      selectAll = '';
      this.props.updateAll({selected: false})
    }
    this.setState({selectAll});
  }

  markReadMessages() {
    this.props.updateMultipleMessages({selected: true}, {read: true})
  }

  markUnreadMessages() {
    this.props.updateMultipleMessages({selected: true}, {read: false})
  }

  //toolbar checked status box - onClick(selected) loop over messages and check if any single message has {selected: true}
  //      --> return fa-minus-box

  render () {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={() => this.selectAllMessages()}>
            <i className={`fa fa-${this.state.selectAll}square-o`}></i>
          </button>

          <button className="btn btn-default" onClick={() => this.markReadMessages()}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={() => this.markUnreadMessages()}>
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

//bulk select/deselect **
//mark message as read **
//mark message as unread **
//delete messages
//add label
//remove label
//unread message count
//select all button state

export default Toolbar;
