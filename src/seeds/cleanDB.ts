// src/seeds/cleanDB.ts

import User from '../models/user.js';
import Thought from '../models/thought.js';
import db from '../config/connection.js';

export const cleanDB = async () => {
    try {
        await db();
        await User.deleteMany({});
        await Thought.deleteMany({});
    } catch(err) {
        console.log(err);
        throw new Error;
    }
};
