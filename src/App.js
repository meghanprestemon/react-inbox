import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Toolbar from './components/Toolbar.js';
import MessageList from './components/MessageList.js';
import Compose from './components/Compose.js';

const Home = props => (
  <div>
    <div className='Toolbar'>
      <Toolbar match={props.match} />
    </div>

    <div>
      {props.match.url === '/compose' && <Compose />}
    </div>

    <div className="MessageList">
      <MessageList match={props.match} />
    </div>
  </div>
)

const App = () => (
  <Router>
    <div className='container-fluid'>
      <Route exact path="/" component={Home} />
      <Route exact path="/compose" component={Home} />
      <Route path="/messages/:id" component={Home} />
    </div>
  </Router>
)

export default App;
