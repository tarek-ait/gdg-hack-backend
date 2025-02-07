export function projectInvitation(name, projectName, inviterName) {
    return `<!DOCTYPE html>
    <html>
      <head>
        <title>Project Invitation</title>
      </head>
      <body>
          <div class="container">
            <h1>You're Invited to Join a Project!</h1>

            <p>Dear ${name},</p>

            <p>We hope you're doing well!</p>

            <p><strong>${inviterName}</strong> has invited you to collaborate on the project "<strong>${projectName}</strong>".</p>

            <p>This project matches your skills, and we'd love to have you onboard!</p>

            <p>Click the link below to view the project details and accept the invitation:</p>

            <p><a href="https://your-platform.com/projects/${projectName}">View Project</a></p>

            <p>We look forward to working with you!</p>

            <p>Best regards,<br />Your Platform Team</p>
          </div>
      </body>
    </html>`;
}
