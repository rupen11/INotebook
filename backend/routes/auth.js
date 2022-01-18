require('dotenv').config()
const express = require("express");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const fetchuser = require('../middleware/fetchuser');

const router = express.Router();

// Createuser
router.post("/api/auth/createuser", [
    // Authentication using express-validator
    body('username')
        .isLength({ min: 3 })
        .withMessage("Name must be atleast 3 characters"),
    body('email')
        .isEmail()
        .withMessage('Email must be validated'),
    body('password', "Password must be atleast 5 characters")
        .isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    try {
        // If there are any errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, error: errors.array() });
        }

        // check user already exist or not
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            console.log("User with this email is already exist");
            return res.status(400).json({ success, error: "User with this email is already exist" });
        }

        // Bcrypt password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // save user
        const saveUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass
        });

        // data object with registered user id
        const data = {
            user: {
                id: saveUser.id
            }
        }

        if (saveUser) {
            // Generate token
            const jwtToken = jwt.sign(data, process.env.JWT_SECRETKEY);
            console.log("Signup successfully completed");
            success = true;
            res.status(200).json({ success, solve: "Created Account Successfully", jwtToken });
        }
        else {
            console.log("Some error to singup user");
            res.status(400).json({ success, error: "Some error to sigup user" });
        }
    }
    catch (error) {
        console.log("Some error to signup " + error);
        res.status(400).json({ success, error: err })
    }
});


// Loginuser
router.post('/api/auth/login', [
    body('email', 'Email must be validated').isEmail(),
    body('password', 'Password should not be empty').exists()
], async (req, res) => {
    let success = false;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, "This is errors occured": errors.array() });
        }

        // Find user in database
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        // Compare password
        const isPasswordCompare = await bcrypt.compare(password, user.password);
        if (!isPasswordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        // Generate token
        const jwtToken = jwt.sign(data, process.env.JWT_SECRETKEY);
        console.log("Login successfully");
        success = true;
        return res.status(200).json({ success, solve: "Login Successfully", jwtToken });
    }
    catch (err) {
        return res.status(400).json({ success, "Some error to login": err });
    }
});


// Get user
router.get("/api/auth/getuser", fetchuser, async (req, res) => {
    try {
        userId = req.user;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json(user);
    }
    catch (err) {
        console.log("Some error occured to get user data " + err);
        return res.status(400).json("Some error occured to get user data " + err);
    }
});


// Update user detail
router.put("/api/auth/updateuser", fetchuser, async (req, res) => {
    let success = true;
    try {
        if (req.body.username === "" && req.body.email === "" && req.body.password === "") {
            success = true;
            return res.status(404).json({ success, solve: "No any field to update" });
        }
        let updatedObj = {};
        const { username, email, password } = req.body;
        if (username) { updatedObj.username = username; }
        if (email) { updatedObj.email = email; }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);
            updatedObj.password = hashPass;
        }

        const userId = req.user;
        // find user and update
        const findUser = await User.findByIdAndUpdate({ _id: userId }, { $set: updatedObj }, { new: true });
        if (!findUser) {
            return res.status(400).json({ success, error: "User not found" });
        }
        success = true;
        return res.status(200).json({ success, solve: "User profile updated", findUser });
    }
    catch (err) {
        return res.status(400).json({ success, error: "Some error occured to update user detail " + err });
    }
})

module.exports = router;