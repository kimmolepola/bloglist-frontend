import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, List } from 'semantic-ui-react';

/* eslint-disable react/prop-types */
const OneUser = ({ user }) => (
  <div>
    <h2>{user.name}</h2>
    <b>added blogs</b>
    <List bulleted>
      {user.blogs.map((x) => (<List.Item key={x.id}>{x.title}</List.Item>))}
    </List>
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
    <h2>Users</h2>
    <Table striped celled>
      <Table.Body>
        <Table.Row>
          <Table.Cell />
          <Table.Cell><b>blogs created</b></Table.Cell>
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

// div table
/*
const cellStyle = {
  display: 'table-cell',
  paddingRight: '10px',
};

const AllUsersRow = ({ user }) => (
  <div style={{ display: 'table-row' }}>
    <Link style={cellStyle} to={`/users/${user.id}`}>{user.name}</Link>
    <div style={cellStyle}>{user.blogs.length}</div>
  </div>
);

const AllUsers = ({ users }) => (
  <div>
    <h1>Users</h1>
    <div style={{ display: 'table' }}>
      <div style={{ display: 'table-row' }}>
        <div style={cellStyle} />
        <div style={cellStyle}><b>blogs created</b></div>
      </div>
      {users === undefined ? null : users.map((x) => <AllUsersRow key={x.id} user={x} />)}
    </div>
  </div>
);
*/

// table
/*
const Row = ({ user }) => (
  <tr>
    <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
    <td>{user.blogs.length}</td>
  </tr>
);

const AllUsers = ({ users }) => (
  <div>
    <h1>Users</h1>
    <table>
      <tbody>
        <tr>
          <td />
          <th>blogs created</th>
        </tr>
        {users === undefined ? null : users.map((x) => <Row key={x.id} user={x} />)}
      </tbody>
    </table>
  </div>
);
*/
