import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Toolbar from './components/Toolbar.js';
import MessageList from './components/MessageList.js';
import Compose from './components/Compose.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className='container'>
            <Route path="/" component={Toolbar} />
            <Route exact path="/compose" component={Compose} />
            <Route path="/" component={MessageList} />
          </div>
        </div>
      </Router>
    )  
  }
}

export default App;
