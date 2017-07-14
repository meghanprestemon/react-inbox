import React, { Component } from 'react';
import Label from './Labels.js';

class Message extends Component {

  toggleStarred() {
    let isStarred = !this.props.starred;
    this.props.updateState(this.props.id, {starred: isStarred});
  }

  toggleChecked() {
    let isSelected = !this.props.selected;
    this.props.updateState(this.props.id, {selected: isSelected});
  }

  render () {
    const read = this.props.read ? 'read' : 'unread';
    const selected = this.props.selected ? 'selected' : '';
    const checked = this.props.selected ? 'checked' : '';
    const starred = this.props.starred ? 'fa-star' : 'fa-star-o';

    return (
      <div className={`row message ${read} ${selected}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={`${checked}`} onChange={() => this.toggleChecked()}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${starred}`} onClick={() => {this.toggleStarred(); this.manageSelectAllIcon();}}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {this.props.labels.map(label => <Label label={label} key={label}/>)}
          <span>
            {this.props.subject}
          </span>
        </div>
      </div>
    );
  }
}

//Starring **
//Selecting individual messages **

export default Message;
