import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('BlogForm calls the handler with correct params', () => {
  const createBlog = jest.fn();
  const component = render(
    <BlogForm createBlog={createBlog} />
  );

  const form = component.container.querySelector('form');
  const input_title = component.container.querySelector('#Title');

  fireEvent.change(input_title, {
    target: {value: 'TestTitle'}
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('TestTitle');
});