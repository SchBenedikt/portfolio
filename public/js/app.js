document.addEventListener('DOMContentLoaded', () => {
  const registrationForm = document.getElementById('registration-form');
  const loginForm = document.getElementById('login-form');

  registrationForm.addEventListener('submit', handleRegistration);
  loginForm.addEventListener('submit', handleLogin);

  fetchUserProfile();
});

const handleRegistration = async (event) => {
  event.preventDefault();

  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Registration successful');
    } else {
      alert(`Registration failed: ${data.message}`);
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert('An error occurred during registration. Please try again.');
  }
};

const handleLogin = async (event) => {
  event.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      alert('Login successful');
      fetchUserProfile();
    } else {
      alert(`Login failed: ${data.message}`);
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login. Please try again.');
  }
};

const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const response = await fetch('/api/users/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      displayUserProfile(data);
    } else {
      alert(`Failed to fetch profile: ${data.message}`);
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    alert('An error occurred while fetching the profile. Please try again.');
  }
};

const displayUserProfile = (profile) => {
  document.getElementById('name').textContent = `${profile.personalInfo.firstName} ${profile.personalInfo.lastName}`;
  document.getElementById('email').textContent = profile.personalInfo.email;
  document.getElementById('profile-picture').querySelector('img').src = profile.personalInfo.profilePicture;

  const workExperienceList = document.getElementById('work-experience-list');
  workExperienceList.innerHTML = '';
  profile.workExperience.forEach((experience) => {
    const li = document.createElement('li');
    li.textContent = `${experience.title} at ${experience.company} (${experience.from} - ${experience.to})`;
    workExperienceList.appendChild(li);
  });

  const educationList = document.getElementById('education-list');
  educationList.innerHTML = '';
  profile.education.forEach((education) => {
    const li = document.createElement('li');
    li.textContent = `${education.degree} from ${education.school} (${education.from} - ${education.to})`;
    educationList.appendChild(li);
  });

  const skillsList = document.getElementById('skills-list');
  skillsList.innerHTML = '';
  profile.skills.forEach((skill) => {
    const li = document.createElement('li');
    li.textContent = skill.name;
    skillsList.appendChild(li);
  });
};
