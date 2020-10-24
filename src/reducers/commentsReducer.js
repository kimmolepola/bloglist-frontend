import commentsService from '../services/comments';

export const initializeComments = () => async (dispatch) => {
  const comments = await commentsService.getAll();
  dispatch({
    type: 'INITIALIZE_COMMENTS',
    data: comments,
  });
};

export const addComment = (blogId, comment) => async (dispatch) => {
  const response = await commentsService.post(blogId, comment);
  dispatch({
    type: 'ADD_COMMENT',
    data: response,
  });
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_COMMENTS':
      return action.data;
    case 'ADD_COMMENT':
      return state.concat(action.data);
    default:
      return state;
  }
};

export default reducer;
