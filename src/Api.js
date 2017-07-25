export default class Api {
  static fetchMessages() {
    return fetch('http://localhost:8181/api/messages')
      .then(response => response.json())
      .then(json => json._embedded)
      .catch(e => {throw e;});
  }

  static updateApiState(method, bodyObj) {
    return fetch('http://localhost:8181/api/messages', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: method,
      body: JSON.stringify(bodyObj)
    })
    .then(response => {
      if (response.status === 200) {
        return response;
      }
    })
    .catch(e => {
      throw e;
    });
  }
}
