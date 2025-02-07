export function projectAccepted(name, projectName) {
    return `<!DOCTYPE html>
    <html>
      <head><title>Project Accepted</title></head>
      <body>
        <h1>Welcome to ${projectName}!</h1>
        <p>Dear ${name},</p>
        <p>Congratulations! You have been accepted into "<strong>${projectName}</strong>".</p>
        <p>Click below to get started:</p>
        <p><a href="https://your-platform.com/dashboard">Go to Dashboard</a></p>
      </body>
    </html>`;
}
