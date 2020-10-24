export const notify = (text, msgClass) => (dispatch) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    data: { text, msgClass },
  });
  setTimeout(() => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
    });
  }, 5000);
};

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'REMOVE_NOTIFICATION':
      return null;
    case 'SET_NOTIFICATION':
      return { message: action.data.text, msgClass: action.data.msgClass };
    default:
      return state;
  }
};

export default reducer;
