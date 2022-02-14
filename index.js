const fetchActivity = () => {
    fetch('https://www.boredapi.com/api/activity/')
    .then(res => res.json())
    .then(data => showActivity(data))
}


const navbarLogo = document.getElementById('navbar-logo')
const statsIcon = document.getElementById('icon-stats-graph')
const contentSection = document.getElementById('content')
const tryButtonContainer = document.getElementById('try-button-container')
const tryButton = document.getElementById('try-button')
const form = document.getElementById('submit-name')
const formContainer = document.getElementById('name-prompt-container')


function showActivity(data) {
    contentSection.innerHTML = ''
    const activityContainer = document.createElement('div')
    activityContainer.classList.add('activity-container', 'bg-light', 'py-5', 'px-3', 'my-3', 'shadow')
    const activityTitle = document.createElement('h2')
    activityTitle.classList.add('mb-3')
    activityTitle.textContent = data.activity
    const activityType = document.createElement('p')
    activityType.textContent = `Activity Type: ${data.type[0].toUpperCase() + data.type.slice(1)}`
    const activityParticipants = document.createElement('p')
    activityParticipants.textContent = `# of Participants: ${data.participants}`
    const googleLink = document.createElement('a')
    const googleLinkContainer = document.createElement('p')
    googleLink.href = `https://www.google.com/search?q=${data.activity}`
    googleLink.target = '_blank'
    googleLink.text = 'Learn More'
    const addButton = document.createElement('button')
    addButton.classList.add('btn', 'btn-outline-primary', 'mt-2')
    addButton.textContent = 'Add To My Activities'
    googleLinkContainer.appendChild(googleLink)
    activityContainer.append(activityTitle, activityType, activityParticipants, googleLinkContainer, addButton)
    contentSection.appendChild(activityContainer)
}

tryButton.addEventListener('click', fetchActivity)