const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user
// allows the use any userId
router.put("/:id" , async (req, res) => {
    //Verify if the user ID matches with the particular ID and also checkd if the user is an admin
    if(req.body.userId === req.params.id || req.user.isAdmin){
        if(req.body.password){
            //
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch(err){
                return res.status(500).json(err);

            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id.at, {$set: req.body,});

            res.status(200).json("account has beem updated")
        } catch(err) {
            return res.json(500).json(err);
        }

    }else {
        return res.status(403).json("You can only update your account")
    }
})
//delete user
//get a user
//follow a user
module.exports = router;