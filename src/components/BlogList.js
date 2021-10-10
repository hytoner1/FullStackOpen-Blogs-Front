import React from 'react';
import {useSelector} from 'react-redux';

import {
  Link
} from 'react-router-dom';

import {Table} from 'react-bootstrap';

const BlogList = () => {
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);

  if (!user) {
    return null;
  }

  return (
    <div>
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

          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(b =>
              <tr key={b.id}>
                <td>
                  <Link to={`/blogs/${b.id}`}>
                    {b.title}
                  </Link>
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

export default BlogList;