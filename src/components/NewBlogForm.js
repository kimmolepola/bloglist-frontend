import React from 'react';
import { connect } from 'react-redux';
import { omit } from 'lodash';
import { Form, Button } from 'semantic-ui-react';
import blogService from '../services/blogs';
import Togglable from './Togglable';
import { useField } from '../hooks';
import { addBlog } from '../reducers/blogsReducer';
import { notify } from '../reducers/notificationReducer';
import { addBlogForUser } from '../reducers/usersReducer';

/* eslint-disable react/prop-types */
const NewBlogForm = ({
  notif, users, addBlgForUsr, addBlg,
}) => {
  const { reset: urlreset, ...url } = useField('text', 'Url', 'create-new-blog-url-input');
  const { reset: authorreset, ...author } = useField('text', 'Author', 'create-new-blog-author-input');
  const { reset: titlereset, ...title } = useField('text', 'Title', 'create-new-blog-title-input');

  const noteFormRef = React.createRef();

  const handleCreateNewBlog = async (event) => {
    event.preventDefault();
    noteFormRef.current.toggleVisibility();
    const quickFixUrl = url.value.substring(0, 4) === 'http' ? url.value : 'http://'.concat(url.value);
    try {
      const response = await blogService.create({
        title: title.value, author: author.value, url: quickFixUrl,
      });
      const rsp = { ...response };
      rsp.user = omit(users.find((x) => x.id.toString() === response.user.toString()), 'blogs');
      addBlgForUsr(omit(rsp, 'user', 'likes'), response.user);
      rsp.comments = { id: rsp.comments, content: [] };
      addBlg(rsp);
      urlreset();
      authorreset();
      titlereset();
      notif(`a new blog ${title.value} by ${author.value} added`, 'success');
    } catch (exception) {
      notif('Failed', 'error');
    }
  };
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Togglable buttonLabel="new blog" data_cy="create-new-blog-button" ref={noteFormRef}>
      <h2>create new</h2>
      <Form onSubmit={handleCreateNewBlog}>
        <Form.Field>
            title:
          <Form.Group inline>
            <input {...title} />
            <Button type="button" onClick={() => titlereset()}>reset</Button>
          </Form.Group>
        </Form.Field>
        <Form.Field>
            author:
          <Form.Group inline>
            <input {...author} />
            <Button type="button" onClick={() => authorreset()}>reset</Button>
          </Form.Group>
        </Form.Field>
        <Form.Field>
            url:
          <Form.Group inline>
            <input {...url} />
            <Button type="button" onClick={() => urlreset()}>reset</Button>
          </Form.Group>
        </Form.Field>
        <Button data-cy="create-new-blog-submit" color="grey" type="submit">create</Button>
      </Form>
    </Togglable>
  );
};
/* eslint-enable react/jsx-props-no-spreading, react/prop-types */

const mapDispatchToProps = {
  addBlg: addBlog,
  addBlgForUsr: addBlogForUser,
  notif: notify,
};

const mapStateToProps = (state) => ({
  users: state.users,
});


export default connect(mapStateToProps, mapDispatchToProps)(NewBlogForm);
