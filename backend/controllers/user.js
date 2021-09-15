import express from 'express';
import mongoose from 'mongoose';

import User from '../models/user.js';
import Order from '../models/order.js';

const router = express.Router();

// Create user
export const createUser = async (req, res) => {
    const { 
        email, 
        password, 
        nameFirst, 
        nameLast, 
        type
    } = req.body;

    const newUser = new User({
        email, 
        password, 
        nameFirst, 
        nameLast, 
        type
    });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(409).json({message: error.message});
    }
}

// Get user
export const getUser = async (req, res) => { 
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (user == null) {
            return res.status(404).send(`No user with id: ${id}`);
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Update user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const {
        email, 
        password, 
        nameFirst, 
        nameLast, 
        type
    } = req.body; 
    
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`Invalid user id: ${id}`);

    const updatedUser = {
        email, 
        password, 
        nameFirst, 
        nameLast, 
        type,
        _id: id
    };

    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    if (user == null) {
        return res.status(404).send(`No user with id: ${id}`);
    }

    res.json(user);
}

// Delete user
export const deleteUser = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No user with id: ${id}`);
    
    const user = await User.findByIdAndRemove(id);
    if (user == null) {
        return res.status(404).send(`No user with id: ${id}`);
    }
    
    res.json({message: "User deleted successfully."});
}

// Get all users
export const getAllUsers = async (req, res) => { 
    try {
        const allUsers = await User.find();
                
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addUserOrder = async (req, res) => {
    const { id } = req.params;
    const { orderId } = req.body;

    try {
        // need to check id and order exist
        const user = await User.findById(id);
        if (user == null) {
            // send error
            return;
        }

        const order = await Order.findById(orderId);
        if (order == null) {
            // send error
            return;
        }

        
        if (user.orders.indexOf(orderId) != -1) {
            // error already in it
            return;
        }

        user.orders.push(orderId);
        user.save();
        res.json(user);

    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

// returns orders as a list of what they are, so that frontend doesnt need
// to make several requests to get a list of orders.
export const getUserOrders = async (req, res) => {
    const { id } = req.params;

    try {
        // need to check id and order exist
        const user = await User.findById(id);
        if (user == null) {
            // send error
        }

        const getOrders = async () => { 
            return Promise.all(
                user.orders.map(async (orderId) => {
                    return await Order.findById(orderId);
                })
            )
        }; 

        getOrders().then((orders) => {
            res.json(orders);
        });
        

    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export default router;