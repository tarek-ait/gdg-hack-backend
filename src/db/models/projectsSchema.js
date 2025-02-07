import mongoose from "mongoose";

const projectSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description: {
        type: String,
        required: true,
    },
    skillsRequired: {
        type: [String], // Array of skills needed
        default: [],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    contributors: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Contributors are also users
    }
    ],
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Completed'],
        default: 'Open',
    },  
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Project =mongoose.model('Project',projectSchema);

export default Project;