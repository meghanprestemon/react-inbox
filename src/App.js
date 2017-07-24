import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Toolbar from './components/Toolbar.js';
import MessageList from './components/MessageList.js';
import Compose from './components/Compose.js';

const App = () => (
  <div>
    <div className="container-fluid">
      <Toolbar />
      <Compose />
      <MessageList />
    </div>
  </div>
)

export default App;
