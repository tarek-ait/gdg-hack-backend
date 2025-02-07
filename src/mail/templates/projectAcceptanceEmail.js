export function projectAccepted(name, projectName) {
    return `<!DOCTYPE html>
    <html>
      <head>
        <title>Project Acceptance</title>
      </head>
      <body>
          <div class="container">
            <h1>Welcome to ${projectName}!</h1>

            <p>Dear ${name},</p>

            <p>Congratulations! You have been accepted as a contributor to the project "<strong>${projectName}</strong>".</p>

            <p>We are excited to have you on board and look forward to your contributions!</p>

            <p>Next steps:</p>
            <ul>
              <li>Join the project workspace</li>
              <li>Connect with other contributors</li>
              <li>Start working on assigned tasks</li>
            </ul>

            <p>Click the link below to get started:</p>

            <p><a href="https://your-platform.com/dashboard">Go to Dashboard</a></p>

            <p>Let's create something amazing together!</p>

            <p>Best regards,<br />Your Platform Team</p>
          </div>
      </body>
    </html>`;
}
