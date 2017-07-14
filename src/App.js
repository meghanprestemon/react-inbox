import React, { Component } from 'react';
import MessageList from './components/MessageList.js';
import Toolbar from './components/Toolbar.js';
import emailData from './emailData.json';

const MESSAGES_URL = 'http://localhost:8181/api/messages';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      // messages: emailData,
    }

    this.updateRemovedMessages = this.updateRemovedMessages.bind(this);
    this.updateLabelState = this.updateLabelState.bind(this);
    this.updateAll = this.updateAll.bind(this);
    this.updateMultipleMessages = this.updateMultipleMessages.bind(this);
    this.updateState = this.updateState.bind(this);
  }

//FETCH AND RENDER MESSAGES
  setMessageState(messages) {
    this.setState({messages});
  }

  fetchMessages() {
    fetch(MESSAGES_URL)
      .then(response => response.json())
      .then(apiObj => this.setMessageState(apiObj._embedded.messages))
      .catch(e => e);
  }

  componentDidMount() {
    this.fetchMessages();
  }


//FUNCTIONS TO CALL DURING RENDER
  unreadMessageCount() {
    let unreadMsgs = this.state.messages.filter(msg => msg.read === false);
    return unreadMsgs.length;
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

  disableButton() {
    let selectedMsgs = this.state.messages.filter(msg => msg.selected === true);
    if(!selectedMsgs.length) {
      return 'disabled';
    }
  }

//HELPER FUNCTIONS

  addNewLabel(msg, newLabel) {
    if(!msg.labels.includes(newLabel)) {
      msg.labels.push(newLabel);
    }
    return {labels: msg.labels};
  }

  deleteSelectedLabel(msg, newLabel) {
    let index = msg.labels.indexOf(newLabel);
    msg.labels.splice(index, 1);
    return {labels: msg.labels};
  }


//SET.STATE FUNCTIONS
  updateRemovedMessages() {
    let messages = [];

    this.state.messages.forEach(msg => {
      if(!msg.selected) {
        messages.push(msg)
      }
    });

    this.setState({messages})
  }

  updateLabelState(newLabel, add) {
    let messages = [];
    let msgLabels;

    this.state.messages.forEach(msg => {
      if(msg.selected === true) {
        if(add === 'add') {
          msgLabels = this.addNewLabel(msg, newLabel);
        } else {
          msgLabels = this.deleteSelectedLabel(msg, newLabel);
        }
        messages.push(Object.assign({}, msg, msgLabels));
      } else {
        messages.push(msg);
      }
    });

    this.setState({messages})
  }

  updateAll(update) {
    let messages = this.state.messages.map(msg => Object.assign(msg, update));
    this.setState({messages})
  }

  updateMultipleMessages(update) {
    let messages = [];

    this.state.messages.forEach(msg => {
      if(msg.selected === true) {
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
          unreadMessageCount={this.unreadMessageCount()}
          calculateSelected={this.calculateSelected()}
          updateRemovedMessages={this.updateRemovedMessages}
          updateLabelState={this.updateLabelState}
          updateAll={this.updateAll}
          updateMultipleMessages={this.updateMultipleMessages}
          disableButton={this.disableButton()}
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
