const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")

app.listen(6511, ()=> {
    console.log("Backend server is running on port 6511 " );
});

