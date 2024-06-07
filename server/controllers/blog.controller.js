import Blogs from "../models/blogs.model.js";

export const newBlogPost = async(req , res) => {
    console.log('arrived')
    const blogData = req.body;
    console.log(blogData)
    try{
      await Blogs.create(blogData);
      res.status(200).send({status:true , message:'new blogPost created!'});

    }catch(e){
        res.status(500).send(e.message);
    }
}

export const getAllBlogs = async(req , res) => {
  try{
    const all = await Blogs.find();
    res.status(200).send(all);
  }catch(e){
    res.status(500).send(e.message);
  }
}


export const deleteBlog = async (req, res) => {
  const { blogId } = req.body;
  
  if (!blogId) {
    return res.status(400).send('Blog ID is required');
  }

  try {
    const result = await Blogs.deleteOne({ _id: blogId });

    if (result.deletedCount === 0) {
      return res.status(404).send('Blog not found');
    }

    res.status(200).send(`Blog with ID ${blogId} deleted successfully`);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const getOneBlog = async(req , res) => {
  const { blogId } = req.params;

   try{
     const specificBlog = Blogs.findOne({_id:blogId})
     if(specificBlog){
      res.status(200).send(specificBlog);
     }
   }catch(e){
    res.status(500).send(e.message);
   }
}

export const filterByAuthor = async (req, res) => {
  const { author } = req.body;

  try {
    const blogsByAuthor = await Blogs.find({ author: author });
    if (blogsByAuthor.length > 0) {
      res.status(200).send(blogsByAuthor);
    } else {
      res.status(404).send("No blogs found by this author");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const filterByCategory = async (req, res) => {
  const { category } = req.body;

  try {
    const blogsByCategory = await Blogs.find({ category: category });
    if (blogsByCategory.length > 0) {
      res.status(200).send(blogsByCategory);
    } else {
      res.status(404).send("No blogs found in this category");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};


export const updateBlog = async (req, res) => {
  console.log('arrrived at update')
  const { blogId, updatedContent } = req.body;

  try {
    const updatedBlog = await Blogs.findOneAndUpdate(
      { _id: blogId }, 
      { $set: updatedContent }, 
      { new: true, runValidators: true } 
    );

    if (updatedBlog) {
      res.status(200).send(updatedBlog);
    } else {
      res.status(404).send("Blog not found");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

