import React from 'react';
import {useSelector} from 'react-redux';
import {Table} from 'react-bootstrap';

const UserList = () => {
  const users = useSelector(state => state.users);
  const user = useSelector(state => state.user);
  //const dispatch = useDispatch();

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2> Users </h2>

      <Table striped>
        <tbody>
          <tr>
            <th>
              User
            </th>
            <th>
              # Blogs
            </th>
          </tr>

          {users.map(u =>
            <tr key={u.id}>
              <td>
                {u.name}
              </td>
              <td>
                {u.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;