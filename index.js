const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post")
clearInterval
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {useNewParser: true,}, () => {
    console.log("Connected");
});


//MIDDLEWARES
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/post", postRoute)


app.listen(6511, ()=> {
    console.log("Backend server is running on port 6511 " );
});

