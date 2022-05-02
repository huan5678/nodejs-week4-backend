const Post = require('../models/post');
const errorHandle = require('../utils/errorHandle');
const successHandle = require('../utils/successHandle');

const postController = {
  getAllPosts: async (req, res) => {
    const timeSort = req.query.timeSort == "asc" ? "createdAt" : "-createdAt"
    const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
    const sort = req.body.sort;
    const getAllPosts = await Post.find(q).populate({
      path: 'user',
      select: 'name photo'
    }).sort(timeSort);
    successHandle(res, '成功取得所有貼文', getAllPosts)
  },
  getPostByID: async (req, res, next) => {
    const id = req.params.id;
    if (id) {
      const post = await Post.findById(id).populate({
        path: 'user',
        select: 'name photo'
      });
      successHandle(res, '成功取得該貼文', post)
    } else {
      errorHandle(res)
    }
  },
  createPost: async (req, res) => {
    try {
      const data = req.body;
      if (data.content) {
        await Post.create(data);
        const getAllPosts = await Post.find().populate({
          path: 'user',
          select: 'name photo'
        });
        successHandle(res, '成功新增一則貼文', getAllPosts)
      } else {
        errorHandle(res)
      }
    } catch (err) {
      errorHandle(res, err)
    }
  },
  updatePost: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      if (data.content) {
        await Post.findByIdAndUpdate(id, data);
        const getAllPosts = await Post.find().populate({
          path: 'user',
          select: 'name photo'
        });
        successHandle(res, '成功更新一則貼文', getAllPosts)
      } else {
        errorHandle(res)
      }
    } catch (err) {
      errorHandle(res, err)
    }
  },
  deleteAllPost: async (req, res) => {
    await Post.deleteMany({})
    successHandle(res, '成功刪除全部貼文')
  },
  deletePost: async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        await Post.findByIdAndDelete(id);
        const getAllPosts = await Post.find().populate({
          path: 'user',
          select: 'name photo'
        });
        successHandle(res, '成功刪除該則貼文', getAllPosts)
      } else {
        errorHandle(res)
      }
    } catch (err) {
      errorHandle(res, err)
    }
  }
}

module.exports = postController;
