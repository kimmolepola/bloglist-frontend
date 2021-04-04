import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Table, List, Segment, Header,
} from 'semantic-ui-react';

/* eslint-disable react/prop-types */
const OneUser = ({ user }) => (
  <div>
    <Header style={{ marginBottom: 40 }} as="h3" color="grey" textAlign="center">
      {user.name}
    </Header>
    <Segment textAlign="left">
      <b>Added blogs</b>
      <List bulleted>
        {user.blogs.map((x) => (<List.Item key={x.id}><Link to={`/blogs/${x.id}`}>{x.title}</Link></List.Item>))}
      </List>
    </Segment>
  </div>
);

const AllUsersRow = ({ user }) => (
  <Table.Row>
    <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
    <Table.Cell>{user.blogs.length}</Table.Cell>
  </Table.Row>
);

const AllUsers = ({ users }) => (
  <div>
    <Header style={{ marginBottom: 40 }} as="h2" color="green" textAlign="center">
      Users
    </Header>
    <Table striped celled>
      <Table.Body>
        <Table.Row>
          <Table.Cell><b>Name</b></Table.Cell>
          <Table.Cell><b>Blogs created</b></Table.Cell>
        </Table.Row>
        {users === undefined ? null : users.map((x) => <AllUsersRow key={x.id} user={x} />)}
      </Table.Body>
    </Table>
  </div>
);

const Users = ({ users, id }) => {
  if (!id) {
    return <AllUsers users={users} />;
  }
  const user = users.find((x) => id && x.id.toString() === id.toString());
  if (user) {
    return <OneUser user={user} />;
  }
  return <div>404 Page not found</div>;
};

export default connect((state) => ({ users: state.users }))(Users);
