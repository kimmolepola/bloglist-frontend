import React from 'react';
import { connect } from 'react-redux';
import {
  deleteBlog, updateBlog,
} from '../reducers/blogsReducer';
import { removeBlogFromUser } from '../reducers/usersReducer';
import { notify } from '../reducers/notificationReducer';
import { useField } from '../hooks';
import { addComment } from '../reducers/commentsReducer';
import {
  Container, Button, Form, Header, Comment
} from 'semantic-ui-react';


/* eslint-disable react/prop-types */
const SingleBlogView = ({
  blog, user, updBlg, delBlg, rmvBlgFromUser, notif, history, addCmmnt, comments,
}) => {
  const { reset: commentreset, ...comment } = useField('text', 'Comment');

  const handleComment = async (event) => {
    event.preventDefault();
    console.log("handle commoent")
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
  };

  const ThisBlogComments = () => {
    if (comments && blog) {
      return comments.reduce((result, x) => {
        if (x.blogId === blog.id) {
          result.push(
            <li key={x.id}>
              {x.comment}
            </li>);
        }
        return result;
      }, []);
    }
    return null;
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return (blog && user ? (
    <div>
      <Header style={{ marginBottom: 40 }} as='h3' color='grey' textAlign='center'>
        {blog.title} by {blog.author}
      </Header>
      Added by {blog.user.name}
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        Likes {blog.likes}
      </div>
      <div style={{ marginTop: 20 }}>
        <Button primary data-cy="blog-like-button" type="button" onClick={() => handleLike()}>Like</Button>
        <Button negative data-cy="blog-remove-button" style={showWhenSameUser} type="button" onClick={() => handleBlogDelete()}>remove</Button>
      </div>
      <Container style={{ marginTop: 60 }} textAlign="left">
        <Comment.Group>
          <Header as='h3' dividing>Comments</Header>
          <ul>
            <ThisBlogComments />
          </ul>
          <Form style={{ marginTop: 30 }} onSubmit={handleComment}>
            <Form.TextArea value={comment.value} onChange={comment.onChange}>
            </Form.TextArea>
            <Form.Button primary data-cy="blog-add-comment-button">Add comment</Form.Button>
          </Form>
        </Comment.Group>
      </Container>
    </div >
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


//<Form.Button primary data-cy="blog-add-comment-button" type="submit">add comment</Form.Button>
//            <input {...comment} />