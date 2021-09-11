import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
//import {prettyDOM} from '@testing-library/dom';
import Blog from './Blog';

const blog = {
  title: 'TestTitle',
  author: 'TestAuthor',
  url: 'TestUrl',
  user: {name: 'admin'},
  likes: 0
};

const mockHandler = jest.fn();

test('renders only blog header', () => {
  const component = render(
    <Blog blog={blog} likeBlog={mockHandler} removeBlog={mockHandler} />
  );

  // Blog header exists
  expect(component.container).toHaveTextContent(
    `${blog.title} - ${blog.author}`
  );

  // Blog url does not exist
  expect(component.container).not.toHaveTextContent(
    `${blog.url}`
  );

  // Blog likes does not exist
  expect(component.container).not.toHaveTextContent(
    'Likes'
  );
});

test('press show button', () => {
  const component = render(
    <Blog blog={blog} likeBlog={mockHandler} removeBlog={mockHandler} />
  );
  component.debug();

  const button = component.getByText('Show');
  fireEvent.click(button);

  // Likes are now shown
  expect(component.container).toHaveTextContent(
    `Likes: ${blog.likes}`
  );

  // Url is now shown
  expect(component.container).toHaveTextContent(
    `${blog.url}`
  );
});

test('like button calls the handler', () => {
  const component = render(
    <Blog blog={blog} likeBlog={mockHandler} removeBlog={mockHandler} />
  );

  const showButton = component.getByText('Show');
  fireEvent.click(showButton);

  const likeButton = component.getByText('Like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});