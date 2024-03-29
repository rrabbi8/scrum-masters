import express from "express";
import User from "../models/user.js";
import { ADMIN_USER } from "../models/systemEnums.js";

const router = express.Router();

export const signIn = async (req, res) => {
    const { email, nameFirst, nameLast, profilePic } = req.body;

    if (!req.userId) {
        return res.status(403).json({ message: "Unauthenticated!" });
    }

    try {
        // // 0. First user of the system should just become admin
        // if ((await User.count()) === 0) {
        //     const newUser = new User({
        //         email: email,
        //         nameFirst: nameFirst,
        //         nameLast: nameLast,
        //         profilePic: profilePic,
        //         oauthId: req.userId,
        //         type: ADMIN_USER,
        //     });
        //     await newUser.save();
        //     return res.status(201).json(newUser);
        // }

        // 1. Check if account has already been authenticated with oatuh
        // This is an existing account
        const existingUser = await User.findOne({ oauthId: req.userId });

        if (existingUser) {
            return res.status(201).json(existingUser);
        }

        // // 2. Check if a "blank" account has been created with email by admin
        // // This is a unregistered account but not fully created.
        // const createdUser = await User.findOne({ email: email });
        // if (!createdUser) {
        //     return res.status(403).json({
        //         message:
        //             "An admin needs to register an account with this email!",
        //     });
        // }

        // // 3. Update this unregistered user with oauthId + additional info
        // createdUser.nameFirst = nameFirst;
        // createdUser.nameLast = nameLast;
        // createdUser.profilePic = profilePic;
        // createdUser.oauthId = req.userId;
        // await createdUser.save();
        // return res.status(201).json(createdUser);

        // 2. Check if a "blank" account has been created with email by admin
        // This is a unregistered account but not fully created.
        const createdUser = await User.findOne({ email: email });
        if (createdUser) {
            createdUser.nameFirst = nameFirst;
            createdUser.nameLast = nameLast;
            createdUser.profilePic = profilePic;
            createdUser.oauthId = req.userId;
            await createdUser.save();
            return res.status(201).json(createdUser);
        }

        const newUser = new User({
            email: email,
            nameFirst: nameFirst,
            nameLast: nameLast,
            profilePic: profilePic,
            oauthId: req.userId,
            type: ADMIN_USER,
        });
        await newUser.save();

        const updatedUser = {
            email: newUser.email,
            nameFirst: newUser.nameFirst,
            nameLast: newUser.nameLast,
            type: newUser.type,
            profilePic: newUser.profilePic,
            _id: newUser._id,
            networkId: newUser._id,
        };

        const user = await User.findByIdAndUpdate(newUser._id, updatedUser, {
            new: true,
        });

        return res.status(201).json(user);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export default router;
