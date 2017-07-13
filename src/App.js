import React, { Component } from 'react';
import Message from './components/Message.js';
import MessageList from './components/MessageList.js';
import Toolbar from './components/Toolbar.js';
import emailData from './emailData.json';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: emailData
    }
    this.updateAll = this.updateAll.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateAll(update) {
    let messages = this.state.messages.map(msg => Object.assign(msg, update));
    this.setState({messages})
  }

  updateState(messageId, update) {
    let message = this.state.messages.find(msg => msg.id === messageId);
    Object.assign(message, update)
    this.setState({});
  }

  render() {
    return (
      <div className="container-fluid">
        <Toolbar updateAll={this.updateAll}/>
        <MessageList emailData={this.state.messages} updateState={this.updateState}/>
      </div>
    );
  }
}

export default App;
