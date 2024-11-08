// models/Thought.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IReaction {
  reactionBody: string;
  username: string;
}

export interface IThought extends Document {
  thoughtText: string;
  username: string;
  userId: Types.ObjectId;
  reactions: IReaction[];
}

const reactionSchema = new Schema<IReaction>({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
});

const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reactions: [reactionSchema],
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
