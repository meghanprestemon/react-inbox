export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';
export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';
export const TOGGLE_STARRED = 'TOGGLE_STARRED';
export const UPDATE_READ_STATE = 'UPDATE_READ_STATE';
export const TOGGLE_SELECT_ALL = 'TOGGLE_SELECT_ALL';
export const UPDATE_LABEL_STATE = 'UPDATE_LABEL_STATE';
export const DELETE_MESSAGES = 'DELETE_MESSAGES';
export const TOGGLE_SHOW_COMPOSE = 'TOGGLE_SHOW_COMPOSE';

export function getMessages() {
  return (dispatch, getState, { Api }) => {
    return Api.fetchMessages()
      .then(msgObj => msgObj.messages)
      .then(messages => dispatch({
        type: MESSAGES_RECEIVED,
        messages
      }))
  }
}

export function toggleSelected(messageId) {
  return (dispatch, getState) => {
    return dispatch({
        type: TOGGLE_SELECTED,
        messageId
      })
  }
}

export function toggleStarred(messageId, starStatus) {
  let bodyObj = {
      "messageIds": [messageId],
      "command": "star",
      "star": !starStatus
    }

  return (dispatch, getState, { Api }) => {
    Api.updateApiState('PATCH', bodyObj)

    dispatch({
        type: TOGGLE_STARRED,
        messageId
    })
  }
}

export function updateReadState(selectedMsgIds, readStatus) {
  let bodyObj = {
    "messageIds": selectedMsgIds,
    "command": 'read',
    "read": readStatus
  }

  return (dispatch, getState, { Api }) => {
    Api.updateApiState('PATCH', bodyObj)

    dispatch({
        type: UPDATE_READ_STATE,
        selectedMsgIds,
        readStatus
    })
  }
}

export function updateLabelState(selectedMsgIds, selectedLabel, added) {
  let bodyObj = {
    "messageIds": selectedMsgIds,
    "command": (added === 'add' ? 'addLabel' : 'removeLabel'),
    "label": selectedLabel
  }

  return (dispatch, getState, { Api }) => {
    Api.updateApiState('PATCH', bodyObj)

    dispatch({
      type: UPDATE_LABEL_STATE,
      selectedMsgIds,
      selectedLabel,
      added
    })
  }
}

export function deleteMessages(selectedMsgIds) {
  let bodyObj = {
    "messageIds": selectedMsgIds,
    "command": 'delete'
  }

  return (dispatch, getState, { Api }) => {
    Api.updateApiState('PATCH', bodyObj)

    dispatch({
      type: DELETE_MESSAGES
    })
  }
}

export function toggleSelectAll(selectStatus) {
  return (dispatch, getState) => {
    return dispatch({
      type: TOGGLE_SELECT_ALL,
      selectStatus
    })
  }
}

// export function updateShowCompose(composeState) {
//   console.log(composeState);
//   return (dispatch, getState) => {
//     return dispatch({
//         type: TOGGLE_SHOW_COMPOSE,
//       })
//   }
// }
