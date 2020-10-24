import React from 'react';
import { connect } from 'react-redux';
import {
  deleteBlog, updateBlog,
} from '../reducers/blogsReducer';
import { removeBlogFromUser } from '../reducers/usersReducer';
import { notify } from '../reducers/notificationReducer';
import { useField } from '../hooks';
import { addComment } from '../reducers/commentsReducer';

/* eslint-disable react/prop-types */
const SingleBlogView = ({
  blog, user, updBlg, delBlg, rmvBlgFromUser, notif, history, addCmmnt, comments,
}) => {
  const { reset: commentreset, ...comment } = useField('text', 'Comment');

  const handleComment = async (event) => {
    event.preventDefault();
    addCmmnt(blog.id, comment.value);
    commentreset();
  };

  const handleBlogDelete = async () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) { // eslint-disable-line no-alert
      if (await delBlg(blog.id)) {
        rmvBlgFromUser(blog.id, blog.user.id);
        history.push('/');
      } else {
        notif('failed to delete', 'error');
      }
    }
  };

  const handleLike = () => {
    const content = {
      id: blog.id,
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
    };
    updBlg(content);
  };

  const showWhenSameUser = {
    display: user && blog && user.username === blog.user.username ? '' : 'none',
    backgroundColor: 'lightblue',
  };

  const ThisBlogComments = () => {
    if (comments && blog) {
      return comments.reduce((result, x) => {
        if (x.blogId === blog.id) {
          result.push(<li key={x.id}>{x.comment}</li>);
        }
        return result;
      }, []);
    }
    return null;
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return (blog && user ? (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a><br />
      {blog.likes}<button data-cy="blog-like-button" type="button" onClick={() => handleLike()}>like</button> <br />
      added by {blog.user.name}
      <button data-cy="blog-remove-button" style={showWhenSameUser} type="button" onClick={() => handleBlogDelete()}>remove</button>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input {...comment} />
        <button data-cy="blog-add-comment-button" type="submit">add comment</button>
      </form>
      <ul>
        <ThisBlogComments />
      </ul>
    </div>
  ) : (<div>404 Page not found</div>));
};

const mapStateToProps = (state, props) => {
  const blog = state.blogs.find((x) => x.id === props.id);
  return {
    comments: state.comments,
    blog,
    user: state.user,
    blogs: state.blogs,
  };
};

const mapDispatchToProps = {
  addCmmnt: addComment,
  delBlg: deleteBlog,
  updBlg: updateBlog,
  rmvBlgFromUser: removeBlogFromUser,
  notif: notify,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleBlogView);
