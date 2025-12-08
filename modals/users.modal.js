import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: 5,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;