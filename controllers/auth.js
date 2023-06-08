import User from '../models/user.js';
import { generateVerificationToken } from "../utils/auth.js"
import nodemailer from "nodemailer";
import asyncHandler from 'express-async-handler';
import bcrypt from "bcryptjs"

export const registerUser = async (req, res) => {
    const { firstName, lastName, email,  country, city, address, password, role } = req.body
    const existedUser = await User.findOne({ email: req.body.email })
    // const hashedPassword = await bcrypt.hash(password, 12)
    try {
        if (!firstName || !lastName|| !email ||  !country || !city || !password) {
            return res.status(400).json({ success: false, error: true, message: "Please fill all fields" })
        }
        if (existedUser) {
            return res.status(400).json({ success: false, error: true, message: "User already exists please try another email" })
        }
        // Generate a salt to use for hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
        console.log("hello")
        // generate verification token
        const verificationToken = generateVerificationToken();
        console.log(verificationToken)
        const user = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            role,
            address,
            city,
            country,
            verificationToken: verificationToken,
            //isVerified
        });
        console.log("hi")
        //res.status(200).json({ verificationToken, message: "Chal ja" });
        //send verification email
        await sendVerificationEmail(user.email, user.verificationToken, user._id);
        const createdUser = await user.save();
        const message = "Signup successful. Please check your email to verify your account.";
        const data = [{
            _id: createdUser._id,
            verificationToken
        }];
        res.status(200).json({ data: data, message: message });
    } catch (err) {
        res.status(400).json({ success: false, error: err });
    }
}

export const sendVerificationEmail = async (to, token, id) => {
    console.log(to, token);
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'cory.wisoky@ethereal.email',
                pass: 'eReUAUK6GTdDzZNagk'
            }
        });
        await transporter.sendMail({
            from: "admin@gmail.com",
            to: "mariasaleem896@gmail.com",
            subject: 'Verify Your Account',
            html: `<p>Please click the following link to verify your account:</p><p><a href="http://localhost:3000/email-verification/${id}/${token}">Verify Now`
        });
        console.log("Email sent");
    } catch (error) {
        console.log("Email not sent", error);
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).json("Invalid link");
        await user.updateOne({ _id: user._id, isVerified: true });
        res.status(200).json({ message: "Your email has been verified successfully" });
    } catch (error) {
        res.status(400).json({ message: "error" });
    }
};

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log(user)
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, error: true, message: "Email and Password is required" })
        }
        if (!user) {
            return res.status(400).json({ success: false, error: true, message: "Email is not registered" })
        }
        if (!( user.ComparePassword(user.password,password))) {
            return res.status(400).json({ success: false, error: true, message: "Wrong Password" })
        }
        // if (!user.isVerified) {
        //     return res.status(400).json({ success: false, error: true, message: "Please verify your email" })
        // }
        res.status(200).json({
            success: true,
            error: false,
            _id: user._id,
            token: user.CreateToken(),
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error, message: "network error" })
    }
});