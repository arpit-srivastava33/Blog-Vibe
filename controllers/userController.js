const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');

// create user / register user
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // validation
        if (!username || !email || !password) {
            return res.status(400).send({
                message: "Please fill all fields",
                success: false
            })
        }
        // existing email check
        const isExist = await userModel.findOne({ email });
        if (isExist) {
            return res.status(401).send({
                message: "User Already Exists!",
                success: false
            })
        }
        // add to db
        const hashPassword = await bcrypt.hash(password, 10);
        const data = new userModel({ username, email, password: hashPassword });
        await data.save();
        return res.status(200).send({
            success: true,
            message: "New User Created",
            data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error is register Callback',
            success: false,
            error
        })
    }
}


// get all user
exports.getAllUser = async (req, res) => {
    // get user from db
    try {
        const data = await userModel.find({});
        return res.status(200).send({
            userCount: data.length,
            success: true,
            message: "all user data",
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error is register Callback',
            success: false,
            error
        })
    }
}


//Login
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: 'Please provide email or password'
            })
        }
        // email check
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Email is not registered"
            })
        }
        // password check
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        return res.status(200).send({
            success: 'true',
            message: 'Successfully Login',
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error is Login Callback',
            success: false,
            error
        })
    }
}