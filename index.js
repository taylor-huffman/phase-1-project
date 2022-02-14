const fetchActivity = () => {
    fetch('https://www.boredapi.com/api/activity/')
    .then(res => res.json())
    .then(data => console.log(data))
}

fetchActivity()


const navbarLogo = document.getElementById('navbar-logo')
const statsIcon = document.getElementById('icon-stats-graph')
const contentSection = document.getElementById('content')
const tryButtonContainer = document.getElementById('try-button-container')
const tryButton = document.getElementById('try-button')
const form = document.getElementById('submit-name')
const formContainer = document.getElementById('name-prompt-container')