export function projectRefused(name, projectName) {
    return `<!DOCTYPE html>
    <html>
      <head><title>Project Application Update</title></head>
      <body>
        <h1>Update on Your Application for ${projectName}</h1>
        <p>Dear ${name},</p>
        <p>We appreciate your interest in joining "<strong>${projectName}</strong>".</p>
        <p>After careful consideration, we regret to inform you that your application has not been accepted at this time.</p>
        <p>We encourage you to continue exploring other exciting projects that match your skills and interests.</p>
        <p>You can find more opportunities here:</p>
        <p><a href="https://your-platform.com/projects">Browse Projects</a></p>
        <p>Thank you for your enthusiasm, and we hope to see you apply again in the future!</p>
      </body>
    </html>`;
}

