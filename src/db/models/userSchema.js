import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    },
    lastName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    },
    password: {
    type: String,
    required: true,
    minlength:8,
    },
    profilePic: {
        type: String,
        default: "",
    },
    skills: {
        type: [String],
        default: [],
    },
    createdProjects: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Project',     
    }],
    joinedProjects: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }],
    
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;



