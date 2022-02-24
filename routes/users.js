const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("It is the user")
});

module.exports = router;