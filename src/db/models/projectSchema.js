import mongoose from "mongoose";
// add the request schema 
const requestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
    message: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
});


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
    requirements: {
        type: [String], // Array of skills needed
        default: [],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    collaborators: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Contributors are also users
        // add a default value 
        default: [],
    }
    ],
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Completed'],
        default: 'Open',
    },
    projectCategory: {
        type: [String],
        default: [],
    },
    public: {
        type: Boolean,
        default: false,
    },
    // resources array of strings
    resources: [
        {
            type: String,
        }
    ],
    // default value
    requests:{
        type:[requestSchema],
        default:[],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Project = mongoose.model('Project',projectSchema);

export default Project;