const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
  {
    return [...state, action.data];
  }
  case 'INIT_BLOGS':
  {
    return action.data;
  }
  case 'LIKE_BLOG':
  {
    const id = action.data;
    const blogToChange = state.find(b => b.id === id);
    const changedBlog = {...blogToChange, likes: blogToChange.likes + 1};
    return state.map(b => b.id === id ? changedBlog : b);
  }
  case 'REMOVE_BLOG':
  {
    const id = action.data;
    console.log('Remove,', id);
    return state.filter(b => b.id !== id);
  }
  default:
  {
    return state;
  }
  }
};

export const createBlog = (data) => {
  return {
    type: 'NEW_BLOG',
    data
  };
};

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  };
};

export const likeBlog = (id) => {
  return {
    type: 'LIKE_BLOG',
    data: id
  };
};

export const removeBlog = (id) => {
  return {
    type: 'REMOVE_BLOG',
    data: id
  };
};

export default blogsReducer;