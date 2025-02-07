import {sendEmail} from '../mail/templates/emailService.js'
import { projectAccepted } from '../mail/templates/projectAcceptanceEmail.js';
import { projectInvitation } from '../mail/templates/projectInvitationEmail.js';
import Project from "../db/models/projectsSchema.js";
import { projectUpdate } from "../mail/templates/projectUpdate.js";

export const invite=async (req,res)=>{
    const{email,name,projectName}=req.body;
        const inviteName=req.user.name;
    
        try {
            const subject = "You're Invited to Join a Project!";
            const emailContent = projectInvitation(name, projectName, inviteName);
            
            await sendEmail(email, subject, emailContent);
            res.status(200).json({ message: "Invitation sent successfully" });
        } catch (error) {
            res.status(500).json({ message: "Error sending invitation email" });
        }
}

export const accept= async (req,res)=>{
    const {email,name,projectName}=req.body;
    try {
        const subject = `Welcome to ${projectName}!`;
        const emailContent = projectAccepted(name, projectName);

        // Send confirmation email
        await sendEmail(email, subject, emailContent);

        res.status(200).json({ message: "Project acceptance email sent successfully" });
    } catch (error) {
        console.error("❌ Error sending acceptance email:", error);
        res.status(500).json({ message: "Error sending acceptance email" });
    }
}

export const update = async (req, res) => {
    const { projectId, updateMessage } = req.body;

    try {
        // Find the project and its contributors
        const project = await Project.findById(projectId).populate("contributors");

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Send update email to all contributors
        const subject = `Update on ${project.name}`;
        
        for (const contributor of project.contributors) {
            const emailContent = projectUpdate(contributor.name, project.name, updateMessage);
            await sendEmail(contributor.email, subject, emailContent);
        }

        res.status(200).json({ message: "Project update emails sent successfully" });
    } catch (error) {
        console.error("❌ Error sending update emails:", error);
        res.status(500).json({ message: "Error sending update emails" });
    }
};