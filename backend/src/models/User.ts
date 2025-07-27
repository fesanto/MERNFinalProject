import mongoose, { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface for TypeScript
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

// The blueprint for the User model
const userSchema = new Schema<IUser>({ 
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false // do not return password by default
    },
}, {
    timestamps: true // automatically adds createdAt and updatedAt fields
});

// Middleware to hash the password before saving the user
userSchema.pre<IUser>('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    
    //if the password is new or modified, hash it
    const salt = await bcrypt.genSalt(10); // generate a salt
    this.password = await bcrypt.hash(this.password as string, salt); // hash the password
        next(); // proceed to save the user
});

const User = model<IUser>('User', userSchema); // create the User model
export default User;