export const setUser = (user) => (dispatch) => {
  dispatch({
    type: 'SET_USER',
    data: user,
  });
};

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    default:
      return state;
  }
};

export default reducer;
