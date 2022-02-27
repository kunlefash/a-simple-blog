const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
//Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    try{
        const user = await newUser.save();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err)
    }

    
});
//LOGIN
router.post("/login", async (req, res) => {
    try{   
        // Check if the user exists
        const user = await User.findOne({email:req.body});
        !user && res.status(404).json("User is not found")
        // Compares to confirm if the password inputed is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong password");
        // returns user if the user exists
        res.status(200).json(user);
    } catch(err)  {
    res.status(500).json(err)
    }
})

module.exports = router;