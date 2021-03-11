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
  notif, users, addBlgForUsr, addBlg, noteFormRef
}) => {
  const { reset: urlreset, ...url } = useField('text', 'Url', 'create-new-blog-url-input');
  const { reset: authorreset, ...author } = useField('text', 'Author', 'create-new-blog-author-input');
  const { reset: titlereset, ...title } = useField('text', 'Title', 'create-new-blog-title-input');

  // const noteFormRef = React.createRef();

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
    <Togglable buttonLabel="New blog" data_cy="create-new-blog-button" ref={noteFormRef}>
      <h3>Create new</h3>
      <Form onSubmit={handleCreateNewBlog}>
        <Form.Field>
          <Form.Group inline>
            <input placeholder="Title" {...title} />
            <Button style={{ marginLeft: 5 }} type="button" onClick={() => titlereset()}>Reset</Button>
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <Form.Group inline>
            <input placeholder="Author" {...author} />
            <Button style={{ marginLeft: 5 }} type="button" onClick={() => authorreset()}>Reset</Button>
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <Form.Group inline>
            <input placeholder="url" {...url} />
            <Button style={{ marginLeft: 5 }} type="button" onClick={() => urlreset()}>Reset</Button>
          </Form.Group>
        </Form.Field>
        <Button primary data-cy="create-new-blog-submit" type="submit">Create</Button>
        <Button style={{ margin: 5 }} type="button" onClick={() => noteFormRef.current.toggleVisibility()}>Cancel</Button>
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

