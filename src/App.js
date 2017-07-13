import React, { Component } from 'react';
import Message from './components/Message.js';
import MessageList from './components/MessageList.js';
import Toolbar from './components/Toolbar.js';
import emailData from './emailData.json';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: emailData,
    }

    // this.updateSelectAllIcon = this.updateSelectAllIcon.bind(this);
    this.updateAll = this.updateAll.bind(this);
    this.updateMultipleMessages = this.updateMultipleMessages.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  calculateSelected() {
    let selectAll = 'minus-';
    let selectedMsgs = this.state.messages.filter(msg => msg.selected === true);

    if(!selectedMsgs.length) {
      selectAll = '';
    } else if(selectedMsgs.length === this.state.messages.length) {
      selectAll = 'check-';
    }

    return selectAll;
  }

  updateAll(update) {
    let messages = this.state.messages.map(msg => Object.assign(msg, update));
    this.setState({messages})
  }

  updateMultipleMessages(condition, update) {
    let msgKey = Object.keys(condition)[0];
    let messages = [];

    this.state.messages.forEach(msg => {
      if(msg[msgKey] === Object.values(condition)[0]) {
        messages.push(Object.assign({}, msg, update));
      } else {
        messages.push(msg);
      }
    });

    this.setState({messages})
  }

  updateState(messageId, update) {
    this.setState((prevState) => {
      let message = prevState.messages.find(msg => msg.id === messageId);
      let index = prevState.messages.indexOf(message);
      let msgKey = Object.keys(update)[0];
      return {
        messages: [
          ...prevState.messages.slice(0, index),
          {...message, [msgKey]: update[msgKey]},
          ...prevState.messages.slice(index + 1)
        ]
      }
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <Toolbar
          emailData={this.state.messages}
          selectAll={this.state.selectAll}
          calculateSelected={this.calculateSelected()}
          updateAll={this.updateAll}
          updateMultipleMessages={this.updateMultipleMessages}
        />
        <MessageList
          emailData={this.state.messages}
          selectAll={this.state.selectAll}
          updateState={this.updateState}
        />
      </div>
    );
  }
}

export default App;
