// Global variables
let skills = [];
let selectedTemplate = 'professional';

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 2000);

    // Initialize photo upload
    initializePhotoUpload();
    
    // Generate initial resume preview
    generateResume();
});

// Photo upload functionality
function initializePhotoUpload() {
    const photoUpload = document.getElementById('photoUpload');
    const photoPreview = document.getElementById('photoPreview');

    photoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                photoPreview.innerHTML = `<img src="${e.target.result}" alt="Profile Photo">`;
                photoPreview.style.backgroundImage = `url(${e.target.result})`;
                photoPreview.style.backgroundSize = 'cover';
                photoPreview.style.backgroundPosition = 'center';
            }
            reader.readAsDataURL(file);
        }
    });
}

// Tab navigation
function openTab(tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    // Show current tab and activate button
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Skills management
function addSkill() {
    const skillInput = document.getElementById('skillInput');
    const skill = skillInput.value.trim();
    
    if (skill && !skills.includes(skill)) {
        skills.push(skill);
        updateSkillsList();
        skillInput.value = '';
        skillInput.focus();
    }
}

function removeSkill(skill) {
    skills = skills.filter(s => s !== skill);
    updateSkillsList();
}

function updateSkillsList() {
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = skills.map(skill => `
        <div class="skill-tag">
            ${skill}
            <i class="fas fa-times" onclick="removeSkill('${skill}')"></i>
        </div>
    `).join('');
}

// Generate resume preview
function generateResume() {
    // Get form values
    const formData = {
        name: document.getElementById('fullName').value || 'Your Name',
        jobTitle: document.getElementById('jobTitle').value || 'Professional Title',
        email: document.getElementById('email').value || 'email@example.com',
        phone: document.getElementById('phone').value || '+91 9876543210',
        location: document.getElementById('location').value || 'City, Country',
        linkedin: document.getElementById('linkedin').value || '',
        summary: document.getElementById('summary').value || 'Professional summary will appear here...',
        skills: skills.length ? skills : ['Communication', 'Teamwork', 'Problem Solving']
    };

    // Get photo if uploaded
    const photoPreview = document.getElementById('photoPreview');
    const photoImg = photoPreview.querySelector('img');
    const photoSrc = photoImg ? photoImg.src : '';

    // Generate resume HTML based on template
    const resumeHTML = generateResumeHTML(formData, photoSrc);
    
    // Update preview
    const resumePreview = document.querySelector('.resume-preview .resume');
    resumePreview.innerHTML = resumeHTML;
    
    // Show success animation
    showSuccessAnimation();
}

function generateResumeHTML(data, photoSrc) {
    const templates = {
        professional: `
            <div class="resume-header" style="display: flex; align-items: center; gap: 30px; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #4361ee;">
                ${photoSrc ? `<div style="width: 100px; height: 100px; border-radius: 50%; overflow: hidden;">
                    <img src="${photoSrc}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">
                </div>` : ''}
                <div style="flex: 1;">
                    <h1 style="color: #4361ee; margin: 0 0 5px 0; font-size: 2.2rem;">${data.name}</h1>
                    <h2 style="color: #666; margin: 0 0 15px 0; font-size: 1.3rem; font-weight: normal;">${data.jobTitle}</h2>
                    <div style="display: flex; gap: 15px; flex-wrap: wrap; font-size: 0.9rem;">
                        <span>📧 ${data.email}</span>
                        <span>📱 ${data.phone}</span>
                        <span>📍 ${data.location}</span>
                        ${data.linkedin ? `<span>💼 ${data.linkedin}</span>` : ''}
                    </div>
                </div>
            </div>
            
            <div class="resume-section">
                <h3 style="color: #4361ee; border-bottom: 2px solid #4361ee; padding-bottom: 5px; margin-bottom: 15px;">PROFESSIONAL SUMMARY</h3>
                <p style="line-height: 1.6; color: #555;">${data.summary}</p>
            </div>
            
            <div class="resume-section">
                <h3 style="color: #4361ee; border-bottom: 2px solid #4361ee; padding-bottom: 5px; margin-bottom: 15px;">SKILLS</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${data.skills.map(skill => `<span style="background: #4361ee; color: white; padding: 5px 15px; border-radius: 15px; font-size: 0.9rem;">${skill}</span>`).join('')}
                </div>
            </div>
        `,
        
        modern: `
            <div class="resume-header" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 40px; border-radius: 15px; margin-bottom: 30px; text-align: center;">
                ${photoSrc ? `<div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; margin: 0 auto 20px; border: 4px solid white;">
                    <img src="${photoSrc}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">
                </div>` : ''}
                <h1 style="margin: 0 0 10px 0; font-size: 2.5rem;">${data.name}</h1>
                <h2 style="margin: 0 0 20px 0; font-size: 1.4rem; opacity: 0.9;">${data.jobTitle}</h2>
                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                    <span>📧 ${data.email}</span>
                    <span>📱 ${data.phone}</span>
                    <span>📍 ${data.location}</span>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
                <div>
                    <div class="resume-section">
                        <h3 style="color: #667eea; margin-bottom: 15px;">SUMMARY</h3>
                        <p style="line-height: 1.6; color: #555;">${data.summary}</p>
                    </div>
                </div>
                
                <div>
                    <div class="resume-section">
                        <h3 style="color: #667eea; margin-bottom: 15px;">SKILLS</h3>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            ${data.skills.map(skill => `<span style="background: #667eea; color: white; padding: 8px 15px; border-radius: 8px; text-align: center;">${skill}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        creative: `
            <div class="resume-header" style="display: flex; gap: 30px; margin-bottom: 30px;">
                ${photoSrc ? `<div style="width: 120px; height: 120px; border-radius: 50%; overflow: hidden; border: 4px solid #f72585;">
                    <img src="${photoSrc}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">
                </div>` : ''}
                <div style="flex: 1;">
                    <h1 style="color: #f72585; margin: 0 0 10px 0; font-size: 2.5rem; font-weight: bold;">${data.name}</h1>
                    <h2 style="color: #7209b7; margin: 0 0 15px 0; font-size: 1.4rem;">${data.jobTitle}</h2>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.9rem;">
                        <div>📧 ${data.email}</div>
                        <div>📱 ${data.phone}</div>
                        <div>📍 ${data.location}</div>
                        ${data.linkedin ? `<div>💼 ${data.linkedin}</div>` : '<div></div>'}
                    </div>
                </div>
            </div>
            
            <div class="resume-section">
                <h3 style="color: #f72585; border-left: 4px solid #f72585; padding-left: 15px; margin-bottom: 15px;">ABOUT ME</h3>
                <p style="line-height: 1.6; color: #555; background: #fff5f7; padding: 20px; border-radius: 10px;">${data.summary}</p>
            </div>
            
            <div class="resume-section">
                <h3 style="color: #f72585; border-left: 4px solid #f72585; padding-left: 15px; margin-bottom: 15px;">EXPERTISE</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                    ${data.skills.map(skill => `<div style="background: linear-gradient(135deg, #f72585, #7209b7); color: white; padding: 15px; border-radius: 10px; text-align: center; font-weight: bold;">${skill}</div>`).join('')}
                </div>
            </div>
        `
    };

    return templates[selectedTemplate] || templates.professional;
}

// Template change
function changeTemplate() {
    selectedTemplate = document.getElementById('templateSelect').value;
    generateResume();
}

// Success animation
function showSuccessAnimation() {
    const button = document.querySelector('.generate-btn');
    button.innerHTML = '<i class="fas fa-check"></i> Resume Generated!';
    button.style.background = 'linear-gradient(135deg, #4cc9f0, #4895ef)';
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-magic"></i> Generate Resume';
        button.style.background = 'linear-gradient(135deg, var(--primary), var(--accent))';
    }, 2000);
}

// Reset form
function resetForm() {
    if (confirm('Are you sure you want to reset all data?')) {
        document.getElementById('resumeForm').reset();
        skills = [];
        updateSkillsList();
        document.getElementById('photoPreview').innerHTML = '<i class="fas fa-camera"></i><span>Upload Photo</span>';
        generateResume();
    }
}

// Download PDF
function downloadPDF() {
    alert('PDF download functionality would be implemented with a library like jsPDF');
    // In real implementation, use jsPDF library
}

// Print resume
function printResume() {
    window.print();
}

// Add enter key support for skills
document.getElementById('skillInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addSkill();
    }
});