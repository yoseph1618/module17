import Thought from '../models/thought.js';
import User from '../models/user.js';
// Get all thoughts
export const getAllThoughts = async (_, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get thoughts' });
    }
};
// Get a single thought by ID
export const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            res.status(404).json({ error: 'Thought not found' });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get thought' });
    }
};
// Create a new thought and associate it with a user
export const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        // Check if userId is provided and valid
        if (req.body.userId) {
            const user = await User.findById(req.body.userId);
            if (!user) {
                // Just call res.status() and .json() without return
                res.status(404).json({ error: 'User not found' });
                return; // You can still keep this return to exit the function
            }
            await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
        }
        res.status(201).json(thought);
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ error: 'Failed to create thought' });
    }
};
// Update a thought by ID
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!thought) {
            res.status(404).json({ error: 'Thought not found' });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update thought' });
    }
};
// Delete a thought by ID
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            res.status(404).json({ error: 'Thought not found' });
            return;
        }
        res.json({ message: 'Thought deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete thought' });
    }
};
// Add a reaction to a thought
export const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
        if (!thought) {
            res.status(404).json({ error: 'Thought not found' });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to add reaction' });
    }
};
// Remove a reaction from a thought
export const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { _id: req.params.reactionId } } }, { new: true });
        if (!thought) {
            res.status(404).json({ error: 'Thought not found' });
            return;
        }
        res.json(thought);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to remove reaction' });
    }
};
