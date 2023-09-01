const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");


// GET all blog
exports.allBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user').sort({ createdAt: "descending" });
        if (!blogs) {
            return res.status(400).send({
                success: false,
                message: "Blogs not found!"
            })
        }
        return res.status(200).send({
            success: true,
            blogCount: blogs.length,
            message: "All blogs list",
            blogs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while getting blogs"
        })
    }
};

//create blog
exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        //validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please fill all fields"
            })
        }

        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.status(200).send({
                success: false,
                message: "User not exist!"
            })
        }
        const blogData = new blogModel({ title, description, image, user });

        const session = await mongoose.startSession();
        session.startTransaction();
        await blogData.save({ session });
        existingUser.blog.push(blogData);
        await existingUser.save({ session });
        await session.commitTransaction();

        return res.status(200).send({
            success: true,
            message: "Blog created",
            blogData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while creating blogs"
        })
    }
}


//update blog
exports.updateController = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBlog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true }).populate('user');
        console.log(updatedBlog);
        return res.status(200).send({
            success: true,
            message: "Blog updated",
            updatedBlog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while creating blogs"
        })
    }
}

//Delete blog
exports.deleteController = async (req, res) => {
    try {
        const deleteBlog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
        await deleteBlog.user.blog.pull(deleteBlog);
        await deleteBlog.user.save();

        if (!deleteBlog) {
            return res.status(400).send({
                success: false,
                message: "Blogs not found to be deleted",
                error
            })
        }
        return res.status(200).send({
            success: true,
            message: "Blog deleted succesfully",
            deleteBlog
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while deleting blogs"
        })
    }
}

// Get single blog
exports.getBlogByIdController = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id);
        if (!blog) {
            return res.status(400).send({
                success: false,
                message: "Blogs not found to be deleted",
                error
            })
        }
        return res.status(200).send({
            success: true,
            message: "Get Blog succesfully",
            blog
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while getting single blogs"
        })
    }
}

//populate is used to make changes in other collections also
// Getting user blog
exports.userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blog").sort({ createdAt: "descending" });
        if (!userBlog) {
            return res.send(400).send({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Blog of User',
            userBlog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error in user blog"
        })
    }
}