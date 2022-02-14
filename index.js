
// Fetch Activity Function
const fetchActivity = () => {
    fetch('https://www.boredapi.com/api/activity/')
    .then(res => res.json())
    .then(data => showActivity(data))
}

// Global Variables
const navbarLogo = document.getElementById('navbar-logo')
const statsIcon = document.getElementById('icon-stats-graph')
const contentSection = document.getElementById('content')
const greeting = document.getElementById('greeting')
const tryButtonContainer = document.getElementById('try-button-container')
const tryButton = document.getElementById('try-button')
const form = document.getElementById('submit-name')
const formContainer = document.getElementById('name-prompt-container')
const imageArray = ['./media/peep illustration1.svg', './media/peep illustration2.svg', './media/peep illustration3.svg', './media/peep illustration4.svg', './media/peep illustration5.svg', './media/peep illustration6.svg', './media/peep illustration7.svg', './media/peep illustration8.svg']

// Reset Content Section (Activity Suggestions) to initial state
function resetContentSection() {
    contentSection.innerHTML = ''
    contentSection.innerHTML = '<img class="mt-4" src="./media/peep illustration.svg" alt="Goodbye Boredom Logo">'
}

// Show Fetched Activity
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
    const activityImagesContainer = document.createElement('div')
    activityImagesContainer.classList.add('activity-image-container', 'pt-4')
    const imageLeft = document.createElement('img')
    const imageRight = document.createElement('img')
    imageLeft.classList.add('activity-image')
    imageRight.classList.add('activity-image')
    imageLeft.id = 'imageLeft'
    imageRight.id = 'imageRight'
    imageLeft.src = imageArray[Math.floor(Math.random()*imageArray.length)]
    imageRight.src = imageArray[Math.floor(Math.random()*imageArray.length)]
    googleLinkContainer.appendChild(googleLink)
    activityImagesContainer.append(imageLeft, imageRight)
    activityContainer.append(activityTitle, activityType, activityParticipants, googleLinkContainer, addButton, activityImagesContainer)
    contentSection.appendChild(activityContainer)
}


// Cookie Functions
function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
function getCookie(cname) {
let name = cname + "=";
let decodedCookie = decodeURIComponent(document.cookie);
let ca = decodedCookie.split(';');
for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
        c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
    }
}
return "";
}
  
function checkCookie() {
let user = getCookie("username");
if (user != "") {
    formContainer.remove()
    statsIcon.classList.remove('disabled')
    greeting.textContent = `Welcome, ${user}!`
    tryButtonContainer.classList.remove('hide')
    } else {
        if (user != "" && user != null) {
            setCookie("username", user, 90);
        }
    }
}

checkCookie()

// Handles Form Submission 
function submitHandler(e) {
    e.preventDefault()
    setCookie('username', form.name.value, 90)
    user = getCookie('username')
    form.reset()
    formContainer.remove()
    statsIcon.classList.remove('disabled')
    greeting.textContent = `Welcome, ${user}!`
    tryButtonContainer.classList.remove('hide')
}

// Primary Event listeners
navbarLogo.addEventListener('click', resetContentSection)
form.addEventListener('submit', submitHandler)
tryButton.addEventListener('click', fetchActivity)