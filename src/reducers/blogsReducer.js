import blogService from '../services/blogs';

export const addBlog = (blog) => async (dispatch) => {
  dispatch({
    type: 'ADD_BLOG',
    data: blog,
  });
};

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({
    type: 'INIT_BLOGS',
    data: blogs,
  });
};

export const updateBlog = (content) => async (dispatch) => {
  const response = await blogService.put(content);
  dispatch({
    type: 'UPDATE_BLOG',
    data: response,
  });
};

export const deleteBlog = (id) => async (dispatch) => {
  const response = await blogService.remove(id);
  if (response.status === 204) {
    dispatch({
      type: 'DEL_BLOG',
      data: id,
    });
    return true;
  }
  return false;
};

export const setBlogs = (blogs) => (dispatch) => {
  dispatch({
    type: 'SET_BLOGS',
    data: blogs,
  });
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return state.concat(action.data);
    case 'INIT_BLOGS':
      return action.data;
    case 'UPDATE_BLOG':
      return state.map((blg) => {
        if (blg.id === action.data.id) {
          const newBlog = { ...action.data };
          newBlog.user = blg.user;
          return newBlog;
        }
        return blg;
      });
    case 'DEL_BLOG':
      return state.reduce((result, x) => {
        if (x.id !== action.data) {
          result.push(x);
        }
        return result;
      }, []);
    case 'SET_BLOGS':
      return action.data;
    default:
      return state;
  }
};

export default reducer;
