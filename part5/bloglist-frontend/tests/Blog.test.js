import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "../src/components/Blog"

test("testing the component Blog", () => {
  const blog = {
    title: "blogTitle",
    author: "blogAuthor",
    url: "blogUrl",
    likes: "blogLikes",
	user: {
		username: "name"
	}
  }
  const updateHandler = jest.fn()
  const removeHandler = jest.fn()
  render(
    <Blog blog={blog} updateBlog={updateHandler} removeBlog={removeHandler} />
  )
  const title = screen.getByText("blogTitle blogAuthor")
  expect(title).toBeDefined()
})
