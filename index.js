document.addEventListener('DOMContentLoaded', () => {
// Fetch Activity Function
const fetchActivity = () => {
    fetch('https://www.boredapi.com/api/activity/')
    .then(res => res.json())
    .then(data => showActivity(data))
}


// Global Variables
const navbarLogo = document.getElementById('navbar-logo')
const statsIcon = document.getElementById('icon-stats-graph')
const userContent = document.getElementById('user-content')
const favoriteActivityContainer = document.getElementById('favorite-activity-container')
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
    addButton.dataset.bsToggle = 'modal'
    addButton.dataset.bsTarget = '#statsModal'
    addButton.addEventListener('click', (e) => addButtonHandler(e, data))
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


// Add Button Function
function addButtonHandler(e, data) {
    fetch(`http://localhost:3000/users?name=${getCookie('username')}`)
    .then(res => res.json())
    .then(user => patchActivity(user, data))
}


// Patch user's selected activity to DB
function patchActivity(user, data) {
    let activitiesArray = user[0].activities
    activitiesArray.push(data)
    fetch(`http://localhost:3000/users/${user[0].id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        activities: activitiesArray
        })
    })
    .then(res => res.json())
    .then(() => {
        fetchUserActivities()
        displayMostPopularActivity()
    })
}


// Display user activitie's name/modal section title
function showUserActivityTitle() {
    const userActivityTitle = document.getElementById('user-activity-title')
    userActivityTitle.textContent = `${getCookie('username')}'s Activity List`
}
showUserActivityTitle()


// Fetch and Display All User's Activities
function fetchUserActivities() {
    fetch(`http://localhost:3000/users?name=${getCookie('username')}`)
    .then(res => res.json())
    .then(data => {
        if(data[0].activities.length === 0) {
            let activityItemContainer = document.createElement('div')
            activityItemContainer.classList.add('mb-3', 'bg-light', 'p-3')
            let activityItemTitle = document.createElement('p')
            activityItemTitle.classList.add('display-6', 'fs-4')
            activityItemTitle.textContent = 'No activities yet!'
            activityItemContainer.appendChild(activityItemTitle)
            userContent.appendChild(activityItemContainer)
        } else {
            userContent.innerHTML = ''
            let userActivities = data[0].activities
            userActivities.forEach(element => {
                let activityItemContainer = document.createElement('div')
                activityItemContainer.classList.add('mb-3', 'bg-light', 'p-3')
                let x = document.createElement('p')
                x.classList.add('p-1', 'px-2', 'border', 'border-secondary', 'text-secondary', 'float-right', 'cursor-pointer')
                x.textContent = 'X'
                x.addEventListener('click', (e) => removeItem(e, element))
                let activityItemTitle = document.createElement('p')
                activityItemTitle.classList.add('display-6', 'fs-4')
                let activityItemType = document.createElement('p')
                activityItemType.classList.add('no-margin')
                let activityItemParticipants = document.createElement('p')
                const googleLink = document.createElement('a')
                const googleLinkContainer = document.createElement('p')
                googleLink.href = `https://www.google.com/search?q=${element.activity}`
                googleLink.target = '_blank'
                googleLink.text = 'Learn More'
                activityItemParticipants.classList.add('no-margin')
                activityItemType.textContent = `Type: ${element.type[0].toUpperCase()}${element.type.slice(1)}`
                activityItemParticipants.textContent = `# of Participants: ${element.participants}`
                activityItemTitle.textContent = element.activity
                googleLinkContainer.appendChild(googleLink)
                activityItemContainer.append(x, activityItemTitle, activityItemType, activityItemParticipants, googleLinkContainer)
                userContent.appendChild(activityItemContainer)
            });
        }
    })
}

fetchUserActivities()



// Remove Item From User Activity List
function removeItem(e, element) {
    console.log(e, element)
    e.target.parentNode.remove()
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
    postUser(user)
}


// Check for user in DB and, if no user exists, post new user
function postUser(user) {
    fetch(`http://localhost:3000/users?name=${user}`)
    .then(res => res.json())
    .then(data => {
        if (data.length === 0) {
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                name: user,
                activities: []
                })
            })
            .then(res => res.json())
            .then(() => {
                showUserActivityTitle()
                fetchUserActivities()
                form.reset()
                formContainer.remove()
                statsIcon.classList.remove('disabled')
                greeting.textContent = `Welcome, ${user}!`
                tryButtonContainer.classList.remove('hide')
            })
        } else {
            showUserActivityTitle()
            fetchUserActivities()
            form.reset()
            formContainer.remove()
            statsIcon.classList.remove('disabled')
            greeting.textContent = `Welcome, ${user}!`
            tryButtonContainer.classList.remove('hide')
        }
    })
}


// Fetch All Activities For Stats Section
function getAllActivities() {
    let allActivitiesArray = []
    let count = {}
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => {
        data.forEach(obj => obj.activities.forEach(item => allActivitiesArray.push(item.activity)))
        for (const element of allActivitiesArray) {
            if (count[element]) {
                count[element] += 1
            } else {
                count[element] = 1
            }
        }
    })
    return count
}


// Find and display most popular activity
function displayMostPopularActivity() {
    let obj = getAllActivities()
    setTimeout(() => {
        favoriteActivityContainer.innerHTML = ''
        let favoriteActivityTitle = document.createElement('p')
        favoriteActivityTitle.classList.add('display-6', 'fs-4')
        favoriteActivityTitle.textContent = `${Object.keys(obj).reduce((a,b) => obj[a] > obj[b] ? a : b)}`
        let favoriteActivityCount = document.createElement('p')
        favoriteActivityCount.textContent = `Added ${Math.max(...Object.values(obj))} times`
        favoriteActivityContainer.append(favoriteActivityTitle, favoriteActivityCount)
    }, 1000)
}

displayMostPopularActivity()


// Primary Event listeners
navbarLogo.addEventListener('click', resetContentSection)
form.addEventListener('submit', submitHandler)
tryButton.addEventListener('click', fetchActivity)
})