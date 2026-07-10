import User from "../models/user.model.js";

// profile.controller.js
export const getProfile = (req, res) => {
    const user = req.user
    return res.status(200).json({
        success: true,
        data: {
            name: user.username,
            email: user.email
        }
    });
};

export const editProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'user not found'
            })
        }

        const { username } = req.body;

        if (username !== undefined) {
            user.username = username
        }

        return res.status(200).json({
            success: true,
            message: "Username updated successfully",
            data: {
                name: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error)
    }
}