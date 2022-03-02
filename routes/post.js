const res = require("express/lib/response");
const { reset } = require("nodemon/lib/utils");
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

//Like and Dislike  post

router.put("/:id/like", async (req, res)=> {
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("liked")
        } else{
            await post.updateOne({$pull:{likes:req.body,userId}});
            res.status(200).json("Disliked");
        }

    }catch(err){
        res.status(500).json(err)
    }

})

//Get post

router.get("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    }catch(err){
        res.status(500).json(err)
    }
});

//get timeline

router.get("/all", async (req, res) =>{
   try{
        const currentUser = await User.findById(reqe.body.userId);
        const userPost = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=> {
                return Post.find({userId: friendId})
            })
        );
        res.json(userPost.concat(...friendPosts))
   }catch(err){
       res.status(500).json(err)
   }
})
module.exports = router;