const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")
//update user
// allows the use any userId
router.put("/:id" , async (req, res) => {
    //Verify if the user ID matches with the particular ID and also checkd if the user is an admin
    if(req.body.userId === req.params.id || req.body.isAdmin){
        //updating and generating new password for the user
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                // Updaying request
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch(err){
                return res.status(500).json(err);

            }
        }
        //Finding User and Updating
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body,});

            res.status(200).json("Account Updated")
        } catch(err) {
            return res.status(500).json(err);
        }

    }else {
        return res.status(403).json("You do not have access to  this account")
    }
})

//delete user
router.delete("/:id" , async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
     
        //Finding User and Deleting
        try{
            await User.findByIdAndDelete(req.params.id);

            res.status(200).json("Account Has  been Deleted")
        } catch(err) {
            return res.status(500).json(err);
        }

    }else {
        return res.status(403).json("You do not have access to  this account")
    }
})

//get a user
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        const {password,updatedAt, ...other} = user._doc
        res.status(200).json(other)

    }catch(err){
        res.status(500).json(err)

    }
})
//follow a user

router.put("/:id/follow", async (req, res)=> {
    // Checks if the users are the same
    if(req.body.userId !== req.params.id){
        // Authorizing and checking if the users can follow each other
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{ followers: req.body.userId}});
                await currentUser.updateOne({$push:{ following: req.body.userId}});
                res.status(200).json("You are now following this account")




            }else{
                res.status(500).json("You already follow this account")
            }

        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("You cannot follow this account")
    }
})

// Unfollow a user

router.put("/:id/unfollow", async (req, res)=> {
    // Checks if the users are the same
    if(req.body.userId === req.params.id){
        // Authorizing and checking if the users has already unfollowed each other
        try{
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{ followers: req.body.userId}})
                await currentUser.updateOne({$pull:{ following: req.body.userId}});
                res.status(200).json("You have unfollowed this account")




            }else{
                res.status(500).json("You do not follow this account")
            }

        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("You cannot unfollow this account")
    }
})



module.exports = router;