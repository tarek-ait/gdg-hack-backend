export function projectUpdate(name, projectName, updateDetails) {
    return `<!DOCTYPE html>
    <html>
      <head>
        <title>Project Update</title>
      </head>
      <body>
          <div class="container">
            <h1>Project Update: ${projectName}</h1>

            <p>Dear ${name},</p>

            <p>We have an important update regarding the project "<strong>${projectName}</strong>".</p>

            <p><strong>Update Details:</strong></p>
            <p>${updateDetails}</p>

            <p>Stay involved and check for further updates on your dashboard.</p>

            <p>Click the link below to view the project progress:</p>

            <p><a href="https://your-platform.com/projects/${projectName}">View Project</a></p>

            <p>Thank you for being a valuable contributor!</p>

            <p>Best regards,<br />Your Platform Team</p>
          </div>
      </body>
    </html>`;
}
