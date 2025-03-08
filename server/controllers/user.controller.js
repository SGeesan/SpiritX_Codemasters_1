import User from "../model/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({
            username,
        });
        if (user) {
            return res.status(300).json({
                message: "User already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, Number(process.env.PASSWORD_HASH_SALT));
        const newUser = new User({
            username,
            password: hashedPassword,
        });
        await newUser.save();
        
        res.status(201).json({
            message: "User registered successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
};


const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            username,
        });
        if (!user) {
            return res.status(300).json({
                message: "Invalid username or password",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(300).json({
                message: "Invalid username or password",
            });
        }
        const token = jwt.sign({
            username: user.username,
        }, process.env.JWT_SECRET);
        res.cookie("spiritX", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

const logout = async (req, res) => {
    res.clearCookie("spiritX");
    res.status(200).json({
        message: "Logout successful",
    });
};

const checkAuth = async (req, res) => {
    try {
        const token = req.cookies.spiritX;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({
            message: "Authorized",
            username: decode.username,
        });
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized",
        });
    }
};

export default { register, login, logout, checkAuth };