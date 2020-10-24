import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Link, Switch, withRouter,
} from 'react-router-dom';
import {
  Container, Menu, Button, Table, Form,
} from 'semantic-ui-react';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import NewBlogForm from './components/NewBlogForm';
import './App.css';
import { useField } from './hooks';
import { initializeBlogs } from './reducers/blogsReducer';
import { notify } from './reducers/notificationReducer';
import { setUser } from './reducers/userReducer';
import Users from './components/Users';
import { initializeUsers } from './reducers/usersReducer';
import SingleBlogView from './components/SingleBlogView';
import { initializeComments } from './reducers/commentsReducer';

/* eslint-disable react/prop-types */
const App = ({
  blogs, user, notif, setUsr, initBlogs, initUsers, initComments,
}) => {

  const { reset: usernamereset, ...username } = useField('text', 'Username');
  const { reset: passwordreset, ...password } = useField('password', 'Password');

  useEffect(() => { initComments(); }, [initComments]);
  useEffect(() => { initBlogs(); }, [initBlogs]);
  useEffect(() => { initUsers(); }, [initUsers]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const usr = JSON.parse(loggedUserJSON);
      setUsr(usr);
      blogService.setConfig(usr.token);
    }
  }, [setUsr]);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUsr(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const usr = await loginService.login({
        username: username.value, password: password.value,
      });
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(usr),
      );
      blogService.setConfig(usr.token);
      setUsr(usr);
      usernamereset();
      passwordreset();
    } catch (exception) {
      notif('Wrong username or password', 'error');
    }
  };

  const Blogs = () => (
    <Table striped celled>
      <Table.Body>
        {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
          <Table.Row key={blog.id}>
            <Table.Cell>
              <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );

  const SingleBlogViewYesHistory = withRouter(SingleBlogView);

  const AppView = () => (
    <div>
      <Router>
        <Menu>
          <Menu.Item link><Link to="/">home</Link></Menu.Item>
          <Menu.Item link><Link to="/users">users</Link></Menu.Item>
          <Menu.Item><span style={{ paddingRight: '5px' }}>{user.name} logged in</span><Link to="/"><Button data-cy="logout-button" onClick={handleLogout} type="button">logout</Button></Link></Menu.Item>
        </Menu>
        <h2>blog app</h2>
        <Notification />
        <Switch>
          <Route exact path="/" render={() => <div><NewBlogForm /><Blogs /></div>} />
          <Route exact path="/users/:id?" render={({ match }) => <Users id={match.params.id} />} />
          <Route exact path="/blogs/:id" render={({ match }) => <SingleBlogViewYesHistory id={match.params.id} />} />
          <Route path="/" render={() => (<div>404 Page not found</div>)} />
        </Switch>
      </Router>
    </div>
  );

  /* eslint-disable react/jsx-props-no-spreading */
  const LoginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <div>
          username
          <input data-cy="login-username" {...username} />
        </div>
        <div>
          password
          <input data-cy="login-password" {...password} />
        </div>
        <Button data-cy="login-submit" type="submit">Login</Button>
      </Form>
      username: qwer, password: qwer
    </div>
  );
  /* eslint-enable react/jsx-props-no-spreading */
  /* eslint-disable react/jsx-first-prop-new-line, react/jsx-max-props-per-line */

  return (
    <Container>
      {user === null && LoginForm()}
      {user !== null && AppView()}
    </Container>
  );
};

const dispatchToProps = {
  initComments: initializeComments,
  initBlogs: initializeBlogs,
  notif: notify,
  setUsr: setUser,
  initUsers: initializeUsers,
};

const stateToProps = (state) => ({
  blogs: state.blogs,
  user: state.user,
  users: state.users,
});

export default connect(stateToProps, dispatchToProps)(App);
