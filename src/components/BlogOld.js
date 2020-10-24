/* import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router, Route, Link, withRouter,
} from 'react-router-dom';

const Blog = ({
  blog, handleBlogUpdate, handleBlogDelete, user,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleLike = () => {
    const content = {
      id: blog.id,
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
    };
    handleBlogUpdate(content);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const showWhenSameUser = {
    display: user.username === blog.user.username ? '' : 'none',
    backgroundColor: 'lightblue',
  };

  const hideWhenExpanded = {
    display: expanded ? 'none' : '',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const showWhenExpanded = {
    display: expanded ? '' : 'none',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  
  //  <div tabIndex="0" role="button" style={hideWhenExpanded} onKeyDown={() => toggleExpanded()} onClick={() => toggleExpanded()}>
  //    {blog.title} {blog.author}
  //  </div>;
 
  return (
    <div>
      <div style={hideWhenExpanded}>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
      </div>
      <div tabIndex="0" role="button" style={showWhenExpanded} onKeyDown={() => toggleExpanded()} onClick={() => toggleExpanded()}>
        {blog.title} {blog.author}<br />
        <a href={blog.url}>{blog.url}</a><br />
        {blog.likes}<button type="button" onClick={() => handleLike()}>like</button> <br />
        added by {blog.user.name}
        <button style={showWhenSameUser} type="button" onClick={() => handleBlogDelete(blog.id, blog.title, blog.author, blog.user.id)}>remove</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleBlogUpdate: PropTypes.func.isRequired,
  handleBlogDelete: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
 */