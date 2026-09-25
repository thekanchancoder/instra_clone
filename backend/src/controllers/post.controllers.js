const PostModel = require("../models/post.models")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,


})

async function createPostController(req, res) {

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"), // ye code file ko server se imagekit {cloud storage provider} tk pahuchata h
        fileName: "test ",
        folder: "post-instra_clone"
    })


    const post = await PostModel.create({
        caption: req.body.caption,
        img_url: file.url,
        user: req.user._id
    })
    res.status(201).json({
        message: "post created successfully",
        post
    })


}

async function getPostController(req, res) {

    const userId = req.user._id;
    const posts = await PostModel.find({
        user: userId
    })
    res.status(200).json({
        message: "post fetched successfully",
        posts
    })


}

async function getPostDetailsController(req, res) {

    const decodedId = req.user._id;
    const postId = req.params.postId

    const post = await PostModel.findById(postId)
    if (!post) {
        return res.status(404).json({ message: "post not found" })
    }

    const isValidUser = post.user.toString() === decodedId

    if (!isValidUser) {
        return res.status(403).json({ message: "forbidden content" })
    }

    res.status(200).json({
        message: "post details fetched successfully",
        post
    })

}

module.exports = {
    createPostController, getPostController, getPostDetailsController
}