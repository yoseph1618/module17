// src/seeds/data.ts
import { Types } from 'mongoose';
// Sample data for seeding the database
export const users = [
    {
        _id: new Types.ObjectId(),
        username: 'lernantino',
        email: 'lernantino@gmail.com',
        friends: [], // Will add friend IDs here later in `index.ts`
        thoughts: [], // Will add thought IDs here later in `index.ts`
    },
    {
        _id: new Types.ObjectId(),
        username: 'techguru',
        email: 'techguru@example.com',
        friends: [],
        thoughts: [],
    }
];
export const thoughts = [
    {
        _id: new Types.ObjectId(),
        thoughtText: "Here's a cool thought...",
        username: 'lernantino',
        reactions: [],
    },
    {
        _id: new Types.ObjectId(),
        thoughtText: 'This is a thought-provoking statement.',
        username: 'techguru',
        reactions: [],
    }
];
export const reactions = [
    {
        reactionId: new Types.ObjectId(),
        reactionBody: 'Amazing thought!',
        username: 'techguru'
    },
    {
        reactionId: new Types.ObjectId(),
        reactionBody: 'I completely agree!',
        username: 'lernantino'
    }
];
export const friends = [
    {
        username: 'lernantino',
        friends: ['techguru', 'devmaster']
    },
    {
        username: 'techguru',
        friends: ['lernantino']
    },
    {
        username: 'devmaster',
        friends: ['lernantino']
    }
];
