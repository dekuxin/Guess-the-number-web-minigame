// ! - Funciton to push number to array
function pushNumber(value, array) {
    array.push(value)
}

let fullNumber = []
let length = 5 // length -> difficulty
for(let i = 0; i < length;i ++) {
    let randomNumber = Math.floor(Math.random() * 9)
    pushNumber(randomNumber, fullNumber)
}

// Input of user
const input = 12345 
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
        messageToShow += `\n${orderSimilarity.length == 1 ?'and only 1 digit is': `and only ${orderSimilarity.length} digits are`}` + ` in the right order`
    } else messageToShow += "\nL'ordre du/des chiffre(s) est faux"

}
else messageToShow = "All numbers are false"

console.log(`Entre ${fullNumber.join('')} et ${inputNumber.join("")} :\n${messageToShow}`)



/* time expression
const displayTime = (time) => {
    const distance = time
    const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 7 * 30 * 12))
    const months = Math.floor(distance % (1000 * 60 * 60 * 24 * 7 * 30 * 12) / (1000 * 60 * 60 * 24 * 7 * 30))
    const weeks = Math.floor(distance % (1000 * 60 * 60 * 24 * 7 * 30) / (1000 * 60 * 60 * 24 * 7))
    const days = Math.floor(distance % (1000 * 60 * 60 * 24 * 7) / (1000 * 60 * 60 * 24))
    const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60))
    const seconds = Math.floor(distance % (1000 * 60) / (1000))
    
    let timeLeft = ""

    years > 0 ? timeLeft += ` ${years}y` : ""
    months > 0 ? timeLeft += ` ${months}mo` : ""
    weeks > 0 ? timeLeft += ` ${weeks}w` : ""
    days > 0 ? timeLeft += ` ${days}d` : ""
    hours > 0 ? timeLeft += ` ${hours}h`: ""
    minutes > 0 ? timeLeft += ` ${minutes}m` : ""
    seconds > 0 ? timeLeft += ` ${seconds}s` : ""

    return timeLeft.length > 0 ? timeLeft.replace(timeLeft[0], "") : " " + 0 + "s"
} */