import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js";



export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "fill all Details"
            })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exits'
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password should be minimum 6 character'
            })
        }

        const bcryptPass = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: bcryptPass
        });

        const token = generateToken(user._id);

        return res.status(201).json({
            success: true,
            message: "User register successfully",
            token,
            user: {
                name: user.username,
                email: user.email
            }

        })

    } catch (error) {
        console.log(error);
        return res.json(500).json({
            success: false,
            message: error
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email && !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            })
        }

        const comparePass = await bcrypt.compare(password, user.password)

        if (!comparePass) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        const token = generateToken(user._id);

        // Add cookies logic

        return res.status(201).json({
            success: true,
            token,
            user: {
                name: user.username,
                email: user.email
            },
        })

    } catch (error) {
        console.log(error);
        return res.json(500).json({
            success: false,
            message: error
        })
    }
}