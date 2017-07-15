import React, { Component } from 'react';

class Compose extends Component {
  constructor(props) {
    super(props)

    this.state = {
      subject: '',
      body: ''
    }
  }

  updateSubject(event) {
    this.setState({subject: event.target.value})
  }

  updateBody(event) {
    this.setState({body: event.target.value})
  }

  handleSubmit(event) {
    let newMessage = {
      subject: this.state.subject,
      body: this.state.body
    }
    this.props.addNewMessage(newMessage);
    event.preventDefault();
  }

  render () {
    return (
      <form className="form-horizontal well" onSubmit={(event) => this.handleSubmit(event)}>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" value={this.state.subject} onChange={(event) => this.updateSubject(event)}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea name="body" id="body" className="form-control" value={this.state.body} onChange={(event) => this.updateBody(event)}></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary"/>
          </div>
        </div>
      </form>
    );
  }
}

export default Compose;
