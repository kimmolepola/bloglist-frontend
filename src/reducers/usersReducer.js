import userService from '../services/users';

export const removeBlogFromUser = (blogId, userId) => async (dispatch) => {
  dispatch({
    type: 'REMOVE_BLOG',
    data: {
      blogId,
      userId,
    },
  });
};

export const addBlogForUser = (blog, userId) => async (dispatch) => {
  dispatch({
    type: 'ADD_BLOG_FOR_USER',
    data: {
      blog,
      userId,
    },
  });
};

export const initializeUsers = () => async (dispatch) => {
  const users = await userService.getAll();
  dispatch({
    type: 'INIT_USERS',
    data: users,
  });
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'REMOVE_BLOG': {
      const newState = [...state];
      const newUser = newState.find((x) => x.id.toString() === action.data.userId.toString());
      newUser.blogs = newUser.blogs.filter((x) => x.id.toString() !== action.data.blogId);
      return newState;
    } case 'ADD_BLOG_FOR_USER': {
      const newState = [...state];
      const newUser = newState.find((x) => x.id.toString() === action.data.userId.toString());
      newUser.blogs = newUser.blogs.concat(action.data.blog);
      return newState;
    } case 'INIT_USERS':
      return action.data;
    default:
      return state;
  }
};

export default reducer;
