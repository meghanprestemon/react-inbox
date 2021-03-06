import React, { Component } from 'react';

class Toolbar extends Component {
  toggleShowCompose() {
    this.props.updateShowCompose();
  }

  selectAllMessages() {
    if(this.props.calculateSelected !== 'check-') {
      this.props.updateAll({selected: true})
    } else {
      this.props.updateAll({selected: false})
    }
  }

  markReadMessages() {
    this.props.updateReadState({read: true})
  }

  markUnreadMessages() {
    this.props.updateReadState({read: false})
  }

  addLabel(event) {
    let newLabel = event.target.value;
    if(newLabel === 'Apply label') {
      return;
    }
    this.props.updateLabelState(newLabel, 'add');
  }

  deleteLabel(event) {
    let selectedLabel = event.target.value;
    if(selectedLabel === 'Remove label') {
      return;
    }
    this.props.updateLabelState(selectedLabel);
  }

  deleteMessages() {
    this.props.updateRemovedMessages();
  }

  render () {

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.unreadMessageCount}</span>
            unread messages
          </p>

          <a className="btn btn-danger" onClick={() => this.toggleShowCompose()}>
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={() => this.selectAllMessages()}>
            <i className={`fa fa-${this.props.calculateSelected}square-o`}></i>
          </button>

          <button className="btn btn-default" disabled={this.props.disableButton} onClick={() => this.markReadMessages()}>
            Mark As Read
          </button>

          <button className="btn btn-default" disabled={this.props.disableButton} onClick={() => this.markUnreadMessages()}>
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled={this.props.disableButton} onChange={(event) => this.addLabel(event)}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled={this.props.disableButton} onChange={(event) => this.deleteLabel(event)}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled={this.props.disableButton} onClick={() => this.deleteMessages()}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Toolbar;
