import {
  MESSAGES_RECEIVED,
  TOGGLE_SELECTED,
  TOGGLE_STARRED,
  UPDATE_READ_STATE,
  UPDATE_LABEL_STATE,
  DELETE_MESSAGES,
  TOGGLE_SELECT_ALL,
  SEND_MESSAGE
} from '../actions';

function addNewLabel(msg, newLabel) {
  if(!msg.labels.includes(newLabel)) {
    msg.labels.push(newLabel);
  }
  return {labels: msg.labels};
}

function deleteSelectedLabel(msg, selectedLabel) {
  let index = msg.labels.indexOf(selectedLabel);
  msg.labels.splice(index, 1);
  return {labels: msg.labels};
}

function messages(state = {messages: []}, action) {
  const {messages, messageId, selectedMsgIds} = action;

  switch(action.type){
    case MESSAGES_RECEIVED:
      return {messages: [...messages]};
    case TOGGLE_SELECTED:
      return {messages: state.messages.map(message => {
        if (message.id === messageId) {
          message.selected = !message.selected;
        }
        return message;
      })}
    case TOGGLE_STARRED:
      return {messages: state.messages.map(message => {
        if (message.id === messageId) {
          message.starred = !message.starred;
        }
        return message;
      })}
    case UPDATE_READ_STATE:
      const { readStatus } = action;
      return {messages: state.messages.map(message => {
        if (selectedMsgIds.indexOf(message.id) !== -1) {
          message.read = readStatus;
        }
        return message;
      })}
    case UPDATE_LABEL_STATE:
      const { selectedLabel, added } = action;
      return {messages: state.messages.map(message => {
        if (message.selected) {
          let msgLabels;
          if (added === 'add') {
            msgLabels = addNewLabel(message, selectedLabel);
          } else {
            msgLabels = deleteSelectedLabel(message, selectedLabel);
          }
          message = Object.assign({}, message, msgLabels);
        }
        return message;
      })}
    case DELETE_MESSAGES:
      return {messages: state.messages.filter(message =>
        !message.selected
      )}
    case TOGGLE_SELECT_ALL:
      const { selectStatus } = action;
      return {messages: state.messages.map(message => {
        message.selected = selectStatus;
        return message;
      })}
    case SEND_MESSAGE:
      const { response } = action;
      return {...state}
    default:
      return state;
  }
}

export default messages
