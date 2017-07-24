import React, { Component } from 'react';
import Label from './Labels.js';
import { connect } from 'react-redux';
import { toggleSelected, toggleStarred } from '../actions';
import { bindActionCreators } from 'redux';

class Message extends Component {
  render () {
    const { message } = this.props;
    const read = message.read ? 'read' : 'unread';
    const selected = message.selected ? 'selected' : '';
    const checked = message.selected ? 'checked' : '';
    const starred = message.starred ? 'fa-star' : 'fa-star-o';

    return (
      <div className={`row message ${read} ${selected}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={`${checked}`} onChange={() => this.props.toggleSelected(message.id)}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${starred}`} onClick={() => this.props.toggleStarred(message.id, message.starred)}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11">
          {message.labels.map(label => <Label label={label} key={label}/>)}
          <span>
            {message.subject}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const message = state.messages.filter(message => message.id === ownProps.id)[0]
  return {
    message
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleSelected,
  toggleStarred,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)
