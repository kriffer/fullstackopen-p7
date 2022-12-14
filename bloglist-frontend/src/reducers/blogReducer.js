import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlog(state, action) {
      const blog = action.payload
      return state.map(b => b.id === blog.id ? { ...b, likes: blog.likes } : b)
    },
    removeBlog(state, action) {
      state.pop(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}


export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}


export const updateBlog = (id, blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, blog)
    dispatch(setBlog(updatedBlog))
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.deleteBlog(blog.id)

    dispatch(removeBlog(blog))
  }

}



export const { setBlogs, appendBlog, removeBlog, setBlog } = blogSlice.actions
export default blogSlice.reducer