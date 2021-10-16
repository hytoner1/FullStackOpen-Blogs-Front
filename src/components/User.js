import React from 'react';

import {Table} from 'react-bootstrap';

const User = ({user}) => {
  if (!user) {
    return null;
  }

  return (
    <div id='user'>
      <h1>{user.name}</h1>

      <br />
      <h3>Your Blogs</h3>

      <Table striped>
        <tbody>
          <tr>
            <th>
              Title
            </th>
            <th>
              By
            </th>
          </tr>

          {user.blogs
            .map(b =>
              <tr key={b.id}>
                <td>
                  {b.title}
                </td>
                <td>
                  {b.author}
                </td>
              </tr>
            )}
        </tbody>
      </Table>

    </div>
  );
};

export default User;