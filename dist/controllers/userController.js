import User from '../models/user.js';
import Thought from '../models/thought.js';
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        await Thought.deleteMany({ userId: req.params.id });
        res.json({ message: 'User and associated thoughts deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
export const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const user = await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const removeFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to remove friend' });
    }
};
// Get all users
export const getAllUsers = async (_, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};
// Create a new user
export const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const newUser = await User.create({ username, email });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
};
// Get a single user by ID and populate thought and friend data
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('thoughts')
            .populate('friends');
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get user' });
    }
};
