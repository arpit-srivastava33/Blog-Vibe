const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const color = require("colors");
const dotenv = require("dotenv");
const path = require('path')
const mongoConn = require("./config/mongodb")
//env config at top always // if env is in other file config({path:"/folder"})
dotenv.config();

//Import routes
const userRoute = require("./routes/userRoute")
const blogRoute = require("./routes/blogRoute")


//db connection
mongoConn();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/blog', blogRoute)
console.log(__dirname);

// static files
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

const PORT = 8000 || process.env.PORT;
//Listening server
app.listen(PORT, () => {
    console.log(`Server is Running at port ${PORT}`.bgCyan);
})