import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Link, Switch, withRouter,
} from 'react-router-dom';
import {
  Container, Menu, Button, Form, Grid, Header, Segment, Message, List, Icon, Image,
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
import logo from './logo.png';
import Lorem from './components/Lorem';

/* eslint-disable react/prop-types */
const App = ({
  blogs, user, notif, setUsr, initBlogs, initUsers, initComments,
}) => {
  const noteFormRef = React.createRef();

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
    <Container style={{ marginTop: 40 }} textAlign="left">
      <List divided relaxed>
        {Object.values(blogs).length !== 0 ? blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
          <List.Item key={blog.id}>
            <List.Content floated="right">
              <br />{blog.likes} <Icon name="thumbs up outline" />
            </List.Content>
            <List.Content>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> <br />by {blog.author}
            </List.Content>
          </List.Item>
        )) : <List.Item>loading...</List.Item>}
      </List>
    </Container>
  );

  const SingleBlogViewYesHistory = withRouter(SingleBlogView);

  const AppView = () => (
    <div>
      <Router>
        <Menu secondary pointing>
          <Menu.Item link><Link onClick={() => (noteFormRef.current ? noteFormRef.current.resetVisibility() : null)} to="/"><Image src={logo} height="50px" /></Link></Menu.Item>
          <Menu.Item><Link to="/users">Users</Link></Menu.Item>
          <Menu.Item><Link to="/lorem">Lorem</Link></Menu.Item>
          <Menu.Item position="right">
            <span style={{ paddingRight: 15 }}>Logged in as <b style={{ color: 'green' }}>{user.name}</b></span>
            <Link to="/">
              <Button data-cy="logout-button" onClick={handleLogout} type="button">Logout</Button>
            </Link>
          </Menu.Item>
        </Menu>
        <Grid textAlign="center" style={{ height: '80vh' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Notification />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <div>
                    <Header style={{ marginBottom: 40 }} as="h2" color="green" textAlign="center">
                  Blog List
                    </Header>
                    <NewBlogForm noteFormRef={noteFormRef} />
                    <Blogs />
                  </div>
                )}
              />
              <Route exact path="/users/:id?" render={({ match }) => <Users id={match.params.id} />} />
              <Route exact path="/lorem" render={() => <Lorem />} />
              <Route exact path="/blogs/:id" render={({ match }) => <SingleBlogViewYesHistory id={match.params.id} />} />
              <Route path="/" render={() => (<div>404 Page not found</div>)} />
            </Switch>
          </Grid.Column>
        </Grid>
      </Router>
    </div>
  );

  /* eslint-disable react/jsx-props-no-spreading */
  const LoginForm = () => (
    <div>
      <Grid textAlign="center" style={{ height: '80vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="green" textAlign="center">
            Log-in to your account
          </Header>
          <Notification />
          <Form onSubmit={handleLogin}>
            <Segment stacked>
              <input autoCapitalize="off" placeholder="Username" data-cy="login-username" {...username} />
              <input autoCapitalize="off" style={{ marginTop: 5 }} placeholder="Password" data-cy="login-password" {...password} />
              <Button style={{ marginTop: 10 }} primary data-cy="login-submit" type="submit">Login</Button>
            </Segment>
          </Form>
          <Message>
            <div>Please use username "qwer" and password "qwer"</div>
          </Message>
        </Grid.Column>
      </Grid>
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
