/* 
    *************
    Time services 
    *************
*/

// Time varibales
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
let currentTime = 0;

// Function that displays the time in correct order
function displayTime(time) {

    const hour = Math.floor(time / (1000 * 60 * 60))
    const minute = Math.floor(time % (1000 * 60 * 60) / (1000 * 60))
    const second = Math.floor(time % (1000 * 60) / (1000))

    hours.textContent = hour < 10 ? '0' + hour : hour;
    minutes.textContent = minute < 10 ? '0' + minute : minute;
    seconds.textContent = second < 10 ? "0" + second: second;
}

// Function that returns string time
function returnTime(time) {
    const hour = Math.floor(time / (1000 * 60 * 60))
    const minute = Math.floor(time % (1000 * 60 * 60) / (1000 * 60))
    const second = Math.floor(time % (1000 * 60) / (1000))

    let timeLeft = ''

    hour > 0 ? timeLeft += ` ${hour}h`: ""
    minute > 0 ? timeLeft += ` ${minute}m` : ""
    second > 0 ? timeLeft += ` ${second}s` : ""

    return timeLeft.length > 0 ? timeLeft.replace(timeLeft[0], "") : " " + 0 + "s"
}

// Function that counts and display each second
function count() {
    let theCounter = setInterval(function() {
        displayTime(currentTime)
        currentTime += 1000
        if(currentTime > (1000* 3600 * 24)) {
            clearInterval(theCounter)
            alert('SORRY BRO BUT U TOOK A LOT OF TIME TO GUESS THE NUMBER, RESTART !')
            window.location.reload()
        }
    }, 1000)
}

// Start couting
count()



/*

    *************
    Game services
    *************

*/

// Html varibales
const tryButton = document.getElementById('tryButton')
const inputField = document.getElementById('inputField')
const formSubmit = document.getElementById("formSubmit")
let tries = 0

// Multiplicator and game length
let multiplier = 100
let length = 3 // length -> difficulty
const gameDifficulty = document.getElementById('gameDifficulty').textContent.toLowerCase()
if(gameDifficulty === 'hard') {
    multiplier *= 100 * 100
    length = 9
} else if(gameDifficulty === 'normal') {
    multiplier *= 100
    length = 6
}

/* Game function section */
// ! - Funciton to push number to array
function pushNumber(value, array) {
    array.push(value)
}

let fullNumber = []
for(let i = 0; i < length;i ++) {
    let randomNumber = Math.floor(Math.random() * 9)
    pushNumber(randomNumber, fullNumber)
}

// Function to update the tries
function updateTries() {
    const tryElem = document.getElementById('tries')
    tryElem.textContent = tries
}


// Funciton to execute when it's submit
formSubmit.addEventListener('submit', () => {

    // Check
    if(isNaN(parseInt(inputField.value))) {
        showPopup('Error', 'Please enter a valid number !', true)
        inputField.value = ''
    } else {

        // Input of user
        const input = inputField.value
        let inputNumber = []
        input.toString().split('').forEach((number) => {
            pushNumber(Number(number), inputNumber)
        })


        // Get the similaritys between numbers
        let similarity = []
        let copyOfNumber = fullNumber.slice()
        for(let i = 0; i < inputNumber.length; i++) {
            let indexOfNum = copyOfNumber.indexOf(inputNumber[i])

            if(indexOfNum != -1)  {
                similarity.push(inputNumber[i])
                copyOfNumber.splice(indexOfNum, 1)
            } else {}
        }
        let orderSimilarity = inputNumber.filter((x, index) => fullNumber[index] == x)

        let messageToShow 
        if(similarity.length > 0) {
    
            if(similarity.length == fullNumber.length) {
                messageToShow = 'All numbers are correct !'
            }else messageToShow = similarity.length == 1 ? '1 digit is correct' : `${similarity.length} digits are correct`

            if(orderSimilarity.length > 0) {
                messageToShow += `${orderSimilarity.length == 1 ?'<br>And only 1 digit is': `<br>And only ${orderSimilarity.length} digits are`}` + ` in the right order`
            } else messageToShow += "<br>And the order of the digit(s) is false"

        } else messageToShow = "All numbers are false"


        // Tries update section
        tries ++
        updateTries() 

        let score = Math.floor((1/tries * multiplier) * (1/currentTime*1000 * multiplier)) 

        // Game section
        if(inputNumber.join("") == fullNumber.join("")) showPopup('Sucess !', `You guessed the right number <span style="font-weight:500">${fullNumber.join('')}</span>.<br>Number of tries: ${tries}<br>Time: ${returnTime(currentTime -1000)}<br>Score: ${score}<br>Click okay to get back to menu`, false, function() {window.location.href = '/'})
        else showPopup('Try another time !', messageToShow, true)
    }
 
})

/* Number reveal */ 
const revealText = document.getElementById("clickToReveal")
revealText.addEventListener("click", function() {

    alert(`The number was ${fullNumber.join("")}, click OK to get back to menu`)
    if(window.confirm) window.location.href = '/'
})


/*

    ************
    Popup services
    ************

*/
const popup = document.getElementById('popup')
const popupBody = document.getElementById("bodyPopup")

// Function to remove popup
document.getElementById('body').addEventListener('click', function() {
    

    popup.classList.remove('active')
    popupBody.style = 'opacity: 100%'
    
})

    

// Function to show popup
function showPopup(title, description, isError, action) {
    const titl = document.getElementById("popupTitle")
    const desc = document.getElementById("popupDescription")
    
    titl.textContent = title
    desc.innerHTML = description

    const iconError = document.getElementById('iconError')
    const iconCheck = document.getElementById('iconCheck')

    if(isError == true) {
        iconError.style = 'display: block'
        iconCheck.style = 'display: none'
    } else if(isError === false) {
        iconError.style = 'display: none'
        iconCheck.style = 'display: block'
    } else {
        iconError.style = 'display: none'
        iconCheck.style = 'display: none'
    }

    popup.classList.add('active')
    popupBody.style = 'opacity: 10%'

    document.getElementById("popupBtn").onclick = action == undefined ? '' : action

}

