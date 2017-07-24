import React, { Component } from 'react';
import Message from './Message.js';
import { connect } from 'react-redux';
import { getMessages } from '../actions';
import { bindActionCreators } from 'redux';

class MessageList extends Component {
  componentDidMount() {
    this.props.getMessages();
  }

  render () {
    return (
      <a href="#">
        {this.props.messages.map(message =>
          <Message
            key={message.id}
            id={message.id}
            labels={message.labels}
            selected={message.selected}
            starred={message.starred}
            read={message.read}
            subject={message.subject}
            // selectAll={this.props.selectAll}
            // updateToggle={this.props.updateToggle}
          />
        )}
      </a>
    );
  }
}

const mapStateToProps = state => {
  const messages = state.messages;
  return {
    messages
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getMessages
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList)

// export default MessageList;
