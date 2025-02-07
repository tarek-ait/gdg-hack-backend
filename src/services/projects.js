import User from '../db/models/userSchema.js';
import Project from '../db/models/projectSchema.js';
import {projectAccepted} from '../mail/templates/projectAccept.js'
import { sendEmail } from '../mail/send.js';

// function to create a new project
export const createProject = async (req, res) => {
  try {
    // the data we must provide,
    // the status, title, description, project category, wether its public or private, requirements, and resources (array of string

    const {
      title,
      description,
      projectCategory,
      isPublic,
      requirements,
      resources,
    } = req.body;
    // the owner is the user id
    const owner = req.user.id;
    // create a new project
    const project = new Project({
      title,
      description,
      requirements,
      owner,
      projectCategory,
      isPublic,
      resources,
    });
    // save the project
    await project.save();
    // add the project to the user joined projects
    const user = await User.findById(owner);
    user.joinedProjects.push(project._id);
    await user.save();
    // return the project
    res.status(201).json({ message: 'Project created successfully', project });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
};

// send request, and save it in the project
export const joinProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.id;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (project.collaborators.includes(userId)) {
      return res.status(400).json({ message: 'You are already a contributor' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // push the user to the project requestslist , and a message and the created at
    project.requests.push({
      userId,
      status: 'Pending',
      message: 'requested to join',
      createdAt: new Date(),
    });
    await project.save();

    res
      .status(200)
      .json({ message: 'You have successfully joined the project', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// accept a request, use the middleware to get the user information, and only th owner is allowed to accept request
export const acceptRequest = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.body.userId;
    const ownerId = req.user.id; // use the middleware protected route

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== ownerId) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to accept requests' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const requestIndex = project.requests.findIndex(
      (request) => request.userId.toString() === userId,
    );
    if (requestIndex === -1) {
      return res.status(404).json({ message: 'Request not found' });
    }

    project.requests[requestIndex].status = 'Accepted';
    await project.save();

    // add the user to the collaborators
    project.collaborators.push(userId);
    await project.save();

    user.joinedProjects.push(projectId);
    await user.save();

    //this is the email notification that will be sent to the user
    //commented because of a bug in the email sending probably because of using ESI local network

    // const subject = `Welcome to ${project.title}!`;
    // const emailContent = projectAccepted(user.userName, project.title);
    // await sendEmail(user.email, subject, emailContent);

    res.status(200).json({ message: 'Request accepted successfully', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// function to get all the projects 
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// other functions may be implemented later 


export const refuseRequest = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.body.userId;
    const ownerId = req.user.id; // use the middleware protected route

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.owner.toString() !== ownerId) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to refuse requests' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const requestIndex = project.requests.findIndex(
      (request) => request.userId.toString() === userId,
    );
    if (requestIndex === -1) {
      return res.status(404).json({ message: 'Request not found' });
    }

    project.requests[requestIndex].status = 'Refused';
    await project.save();


    res.status(200).json({ message: 'Request Refused', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const invite= async (req,res)=>{
  try {
    const projectId = req.params.id;
    const {userName} = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
   

    const user = await User.findById(userName);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (project.collaborators.includes(user._id)) {
      return res.status(400).json({ message: 'You are already a contributor' });
    }
    // push the user to the project requestslist , and a message and the created at
    project.requests.push({
      user:user._id,
      status: 'Pending',
      message: 'requested to join',
      createdAt: new Date(),
    });
    await project.save();

    res
      .status(200)
      .json({ message: 'You have successfully joined the project', project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}