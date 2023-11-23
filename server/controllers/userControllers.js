const asyncHandler = require('express-async-handler');
const User = require("../model/userModel");
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Fill out all the Fields");
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        const user = await User.create({
            name,
            email,
            password,
            pic,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(400);
        console.error(error)
        throw new Error("Failed to create User");
    }
});

const authUseer = asyncHandler(async (req,res) =>{
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && ()){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else{
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
})

module.exports = { registerUser };
