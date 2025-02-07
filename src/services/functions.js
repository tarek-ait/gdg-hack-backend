import User from '../db/models/userSchema.js';
import Project from '../models/projectSchema.js'

export const createProject = async (req,res)=>{
    try{
            const {title,description,skillsRequired} =req.body;
            if (!title || !description) {
                return res.status(400).json({message:'Title and description are required'});
            }
            const newProject=new Project({
                title,
                description,
                skillsRequired,
                createBy:req.user._id,
                contributors:[req.user._id]
            });

            await newProject.save();

            res.status(201).json({message:'Project created successfully', project:newProject})
    }catch(error){
        consol.error(error.message);
        res.status(500).json({message:'Server error'});
    }
}

export const joinProject=async (req,res)=>{
    try {
        const projectId=req.params.id;
        const userId=req.user.id;

        const project =await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({message:'Project not found'});
        }
        if (project.contributors.includes(userId)) {
            return res.status(400).json({message:'You are already a contributor'})
        }
        const user=await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const hasRequiredSkills = project.skillsRequired.some(skill => user.skills.includes(skill));

    if (!hasRequiredSkills) {
        return res.status(403).json({ message: 'You do not have the required skills to join this project' });
    }

    // Add user to contributors list
    project.contributors.push(userId);
    await project.save();


    res.status(200).json({ message: 'You have successfully joined the project', project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}