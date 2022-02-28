const res = require("express/lib/response");
const Post = require("../models/Post")
const router = require("express").Router();

//Create post

router.post("/", async (req, res) =>{
    const newPost = new Post(req.body);
    try{
        const savedPost =await newPost.save();
        res.status(200).json(savedPost)

    }catch(err){
        res.status(500).json(err)
    }
})
//Update post

router.put("/:id", async (req, res) =>{
    try{
        
        
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).json("Post has beem updated")


        }else{
            res.status(403).json("You cannot update this post")
        }


    }catch(err){
        res.status(500).json(err)
    }
    
})
//Delete post

router.delete("/:id", async (req, res) =>{
    try{
        
        
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("Post has been deleted")


        }else{
            res.status(403).json("You cannot delete this post")
        }


    }catch(err){
        res.status(500).json(err)
    }
    
})

//Like post
//Get post
module.exports = router;