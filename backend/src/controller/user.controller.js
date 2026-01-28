import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try{
        const {username, email, password} = req.body;

        // basic validation for the fields
        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        // check if user already exists
        const existing = await User.findOne({email: email.toLowerCase()});
        if (existing) {
            return res.status(400).json({message: "User already exists"});
        }

        // create user

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({
            message: "User created successfully",
            user: { id: user._id, email: user.email, username: user.username}
        });

    }catch(error){
        res.status(500).json({message: "Internal Server error", error: error.message});
    }
};
const loginUser = async (req, res) => {
    try{

        // checking if user exist
        const {email, password} = req.body;

        const user = await User.findOne({
            email: email.toLowerCase(),
        });
        
        if(!user) return res.status(400).json({
            message: "User does not exist"
        });


        // compare password
        const isMatch = await user.comparePassword(password);
        // if password does not match
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        })
        // if password match
        res.status(200).json({
            message: "User logged in successfully",
            // return user
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch(error){
        res.status(500).json({message: "Internal Server error"});
    }
};
const logoutUser = async (req, res) => {
    try{
        const { email } = req.body;

        const user = await User.findOne({
            email
        });

        if(!user) return res.status(404).json({
            message: "User does not exist"
        });

        res.status(200).json({
            message: "User logged out successfully"
        })
    }catch(error){
        res.status(500).json({message: "Internal Server error"});
    }
};
export {
    registerUser,
    loginUser,
    logoutUser,
}