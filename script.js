function generateResume() {
    // Get form values
    const name = document.getElementById('name').value || 'Your Name Here';
    const email = document.getElementById('email').value || '';
    const phone = document.getElementById('phone').value || '';
    const address = document.getElementById('address').value || '';
    
    const jobTitle = document.getElementById('jobTitle').value || 'Job Title';
    const company = document.getElementById('company').value || 'Company Name';
    const duration = document.getElementById('duration').value || 'Duration';
    const jobDescription = document.getElementById('jobDescription').value || 'Job responsibilities will appear here...';
    
    const degree = document.getElementById('degree').value || 'Degree/Course';
    const college = document.getElementById('college').value || 'College/University';
    const educationDuration = document.getElementById('educationDuration').value || 'Duration';
    
    const skills = document.getElementById('skills').value || 'Your skills will appear here...';

    // Update preview
    document.getElementById('previewName').textContent = name;
    
    // Contact information
    const contactInfo = [email, phone, address].filter(info => info).join(' | ');
    document.getElementById('previewContact').textContent = contactInfo || 'Email | Phone | Address';

    // Work experience
    document.getElementById('previewExperience').innerHTML = `
        <p><strong>${jobTitle}</strong> at ${company} (${duration})</p>
        <p>${jobDescription}</p>
    `;

    // Education
    document.getElementById('previewEducation').innerHTML = `
        <p><strong>${degree}</strong> from ${college} (${educationDuration})</p>
    `;

    // Skills
    document.getElementById('previewSkills').innerHTML = `
        <p>${skills}</p>
    `;

    alert('Resume updated successfully! Now you can download it.');
}

function downloadResume() {
    const resumeElement = document.getElementById('resumePreview');
    
    // Simple print to PDF functionality
    const originalContents = document.body.innerHTML;
    
    // Create print-friendly version
    const printContents = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>My Professional Resume</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                .resume-header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 20px; }
                .resume-section { margin-bottom: 20px; }
                .resume-section h3 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
                @media print { body { margin: 0; } }
            </style>
        </head>
        <body>
            ${resumeElement.outerHTML}
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(function() {
                        window.close();
                    }, 1000);
                }
            <\/script>
        </body>
        </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContents);
    printWindow.document.close();
}

// Auto-save functionality
let autoSaveTimer;
const inputs = document.querySelectorAll('input, textarea');

inputs.forEach(input => {
    input.addEventListener('input', () => {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(generateResume, 1000);
    });
});

// Initialize with sample data
window.onload = function() {
    // You can remove this if you don't want sample data
    document.getElementById('name').value = 'Amit Kumar';
    document.getElementById('email').value = 'amit.kumar@email.com';
    document.getElementById('phone').value = '+91 9876543210';
    document.getElementById('jobTitle').value = 'Web Developer';
    document.getElementById('company').value = 'Tech Solutions Pvt Ltd';
    document.getElementById('duration').value = '2022-Present';
    document.getElementById('jobDescription').value = 'Website development, client coordination, project management';
    document.getElementById('degree').value = 'Bachelor of Computer Science';
    document.getElementById('college').value = 'Delhi University';
    document.getElementById('educationDuration').value = '2018-2022';
    document.getElementById('skills').value = 'HTML, CSS, JavaScript, React, Node.js, MongoDB';
    
    generateResume();
};