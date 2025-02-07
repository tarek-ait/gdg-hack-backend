export function projectInvitation(name, projectName, inviterName) {
    return `<!DOCTYPE html>
    <html>
      <head>
        <title>Project Invitation</title>
      </head>
      <body>
          <h1>You're Invited to Join a Project!</h1>
          <p>Dear ${name},</p>
          <p><strong>${inviterName}</strong> has invited you to collaborate on "<strong>${projectName}</strong>".</p>
          <p>Click the link below to view details:</p>
          <p><a href="https://your-platform.com/projects/${projectName}">View Project</a></p>
      </body>
    </html>`;
}
