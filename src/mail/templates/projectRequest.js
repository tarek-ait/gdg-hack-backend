export function projectRequest(ownerName, applicantName, projectName) {
    return `<!DOCTYPE html>
    <html>
      <head><title>New Project Join Request</title></head>
      <body>
        <h1>New Request to Join ${projectName}</h1>
        <p>Dear ${ownerName},</p>
        <p><strong>${applicantName}</strong> has requested to join your project "<strong>${projectName}</strong>".</p>
        <p>You can review their profile and decide whether to accept or reject their request.</p>
        <p>Click below to manage requests:</p>
        <p><a href="https://your-platform.com/dashboard">View Requests</a></p>
        <p>Thank you for managing your project on our platform!</p>
      </body>
    </html>`;
}
