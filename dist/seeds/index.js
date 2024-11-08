import { cleanDB } from './cleanDB.js';
import User from '../models/user.js';
import Thought from '../models/thought.js'; // No need to import IThought for this operation
import { users, thoughts, reactions, friends } from './data.js';
import db from '../config/connection.js'; // Import the database connection
const seedDatabase = async () => {
    try {
        // Ensure the database is connected
        await db(); // Call the db() to connect to MongoDB
        // Clear existing data
        await cleanDB();
        // Insert users and specify the type for insertedUsers
        const insertedUsers = await User.insertMany(users);
        console.log('Users seeded successfully.');
        // Create a map for users
        const userMap = {};
        insertedUsers.forEach(user => {
            userMap[user.username] = user.id.toString(); // Map usernames to their MongoDB ObjectId
        });
        // Map thoughts to include the userId, and insert them into the database
        const thoughtsToInsert = thoughts.map(thought => ({
            ...thought,
            userId: userMap[thought.username], // Associate thoughts with the correct user
        }));
        // Insert thoughts and get the inserted thoughts with their _id
        const insertedThoughts = await Thought.insertMany(thoughtsToInsert); // Now contains _id
        console.log('Thoughts seeded successfully.');
        // Add thought IDs to the respective users
        for (const thought of insertedThoughts) { // Now accessing the _id from insertedThoughts
            const userId = userMap[thought.username];
            await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });
        }
        // Add reactions to thoughts
        for (const [index, reaction] of reactions.entries()) {
            const thoughtId = insertedThoughts[index]._id; // Assume reactions follow the order of thoughts
            await Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: reaction } }); // reactionId is generated automatically
        }
        console.log('Reactions seeded successfully.');
        // Add friends to users
        for (const friendData of friends) {
            const userId = userMap[friendData.username];
            const friendIds = friendData.friends.map(friend => userMap[friend]);
            await User.findByIdAndUpdate(userId, { $push: { friends: { $each: friendIds } } });
        }
        console.log('Friends seeded successfully.');
        console.log('Seed data linked successfully.');
        process.exit(0); // Exit the process once seeding is done
    }
    catch (err) {
        console.error('Error seeding the database:', err);
        process.exit(1); // Exit with failure
    }
};
seedDatabase();
