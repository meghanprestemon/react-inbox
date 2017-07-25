import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  updateReadState,
  updateLabelState,
  deleteMessages,
  toggleSelectAll
} from '../actions';
import { bindActionCreators } from 'redux';

class Toolbar extends Component {
  unreadMessageCount() {
    let unreadMsgs = this.props.messages.filter(msg => msg.read === false);
    return unreadMsgs.length;
  }

	calculateSelected() {
		let selectAll = "minus-";
		let selectedMsgs = this.props.messages.filter(msg => msg.selected === true);

		if (!selectedMsgs.length) {
			selectAll = "";
		} else if (selectedMsgs.length === this.props.messages.length) {
			selectAll = "check-";
		}

		return selectAll;
	}

  disableButton() {
    let selectedMsgs = this.props.messages.filter(msg => msg.selected === true);
    if(!selectedMsgs.length) {
      return 'disabled';
    }
  }

  selectAllMessages() {
    if(this.calculateSelected() !== 'check-') {
      this.props.toggleSelectAll(true)
    } else {
      this.props.toggleSelectAll(false)
    }
  }

  addLabel(event) {
    let selectedLabel = event.target.value;
    if(selectedLabel === 'Apply label') {
      return;
    }
    this.props.updateLabelState(this.props.selectedMsgIds, selectedLabel, 'add');
  }

  deleteLabel(event) {
    let selectedLabel = event.target.value;
    if(selectedLabel === 'Remove label') {
      return;
    }
    this.props.updateLabelState(this.props.selectedMsgIds, selectedLabel);
  }

  render () {
    const { selectedMsgIds, path } = this.props;
    const composePath = path !== '/compose' ? '/compose' : '/';

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.unreadMessageCount()}</span>
            unread messages
          </p>

          <Link to={composePath} className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </Link>

          <button className="btn btn-default" onClick={() => this.selectAllMessages()}>
            <i className={`fa fa-${this.calculateSelected()}square-o`}></i>
          </button>

          <button className="btn btn-default" disabled={this.disableButton()} onClick={() => this.props.updateReadState(selectedMsgIds, true)}>
            Mark As Read
          </button>

          <button className="btn btn-default" disabled={this.disableButton()} onClick={() => this.props.updateReadState(selectedMsgIds, false)}>
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled={this.disableButton()} onChange={(event) => this.addLabel(event)}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled={this.disableButton()} onChange={(event) => this.deleteLabel(event)}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled={this.disableButton()} onClick={() => this.props.deleteMessages(selectedMsgIds)}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const messages = state.messages;
  const selectedMsgIds = state.messages.filter(message => message.selected === true).map(message => message.id);
  const path = ownProps.location.pathname;
  return {
    messages,
    selectedMsgIds,
    path
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateReadState,
  updateLabelState,
  deleteMessages,
  toggleSelectAll
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)
