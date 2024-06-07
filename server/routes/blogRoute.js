import { Router } from "express";
import { deleteBlog, filterByAuthor, filterByCategory, getAllBlogs, getOneBlog, newBlogPost, updateBlog } from "../controllers/blog.controller.js";
import { isLoggedIn } from "../middlewares/authentication.js";

const router = Router();

// Route for creating a new blog post // only logged in user as author
router.post('/newPost', isLoggedIn, newBlogPost);

// Route for deleting a blog post // only logged in user as author
router.delete('/deleteBlog', isLoggedIn, deleteBlog);

// Route for getting all blogs
router.get('/getAllBlogs', getAllBlogs);

router.get('/filterByCategory' , filterByCategory);

router.get('/filterByAuthor' , filterByAuthor)

// Route for getting a specific blog by ID
router.get('/:blogId', getOneBlog);

export default router;
