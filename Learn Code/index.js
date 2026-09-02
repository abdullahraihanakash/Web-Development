//document.getElementById("counter").innerText = 5
      // Counter 
 /*     
let counter = 0;
let counterElement = document.getElementById("counter");
let saveEl = document.getElementById("save-el");
function incrementCounter() {
    counter = counter + 1;
    counterElement.innerText = counter;
    }
//document.getElementById("increment").addEventListener("click", incrementCounter);
function save() {
    let counterStr = counter + " , ";
    saveEl.textContent += counterStr; // textContent is used to set or return the text content of the specified node, and all its descendants.
    counterElement.textContent = 0;
    counter = 0;
    }
        
let userName = "Akash";
let massage = "you have three new notifications";
console.log(userName + ", " + massage + "!");

let wish = "I'd love to see the \"The Lion King\" movie.";
console.log(wish);

let welcomeEl = document.getElementById("welcome-el");
let name1 ="Abdullah Raihan Akash";
let greeting1 = "Welcome back ";
welcomeEl.innerText = greeting1 + name1;
welcomeEl.innerText = welcomeEl.innerText + " 👋";

let firstName = "Abdullah";
let lastName = "Raihan";
let fullName = firstName + " " + lastName;
console.log(fullName);
let name2 = "Abdullah Raihan Akash";
let greeting2 = "Hi there";
function greetUser() {
    console.log(greeting2 + " , " + name2 + "!");
}
greetUser();
let myPoints = 3;
function add3points() {
    myPoints += 3;
}
function remove1point() {
    myPoints -= 1;
}
add3points();
add3points();
add3points();
remove1point();
remove1point();
console.log(myPoints);
    
         //Reading an error message
let errorParagraph = document.getElementById("error");
console.log(errorParagraph)
function purchase() {
    console.log("button clicked");
    errorParagraph.textContent = "Something went wrong.please try again!";
}

        //Calculator 

let Result = document.getElementById("result")
function add() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    Result.textContent = "Result: " + (num1 + num2);
}
function subtract() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    Result.textContent = "Result: " + (num1 - num2);
}
function multiply() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    Result.textContent = "Result: " + (num1 * num2);
}
function divide() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    Result.textContent = "Result: " + (num1 / num2);
}

//Guest and Home Score Counter
let homeScore = 0;
let guestScore = 0;
let homeScoreEl = document.getElementById("home_score");
let guestScoreEl = document.getElementById("guest_score");
function add1Home() {
    homeScore += 1;
    homeScoreEl.textContent = homeScore;
}

function add2Home() {
    homeScore += 2;
    homeScoreEl.textContent = homeScore;
}

function add3Home() {
    homeScore += 3;
    homeScoreEl.textContent = homeScore;
}
function add1Guest  () {
    guestScore += 1;
    guestScoreEl.textContent = guestScore;
}
function add2Guest() {
    guestScore += 2;
    guestScoreEl.textContent = guestScore;
}
function add3Guest() {
    guestScore += 3;
    guestScoreEl.textContent = guestScore;
}
function reset() {
    homeScore = 0;
    guestScore = 0;
    homeScoreEl.textContent = homeScore;
    guestScoreEl.textContent = guestScore;
}

let age = 98;
if (age < 100) {
    console.log("Not eligible");
}
else if (age == "100") { //== egnor the data type and check only the value
    console.log("Here is your birthday card from the King!");
}
else {
    console.log("Not eligible, you have already gotten one");
}

    // Arrays - ordered lists of items
        // 0 indexed
let featuredPosts = [
    "Check out my Netflix clone",
    "Here's the code for my project",
    "I've just relaunched my portfolio"
]    
console.log(featuredPosts[0])
let experience = ["CEO at Scrimba", 
                  "Frontend developer at Xeneta",
                  "People counter for Nors"
]
console.log(experience.length)
experience.push("Parcel Assistent"); // Add anything in array
console.log(experience);
experience.pop(); // Delete last item of array
console.log(experience);

        // Loops
for(let x = 1; x < 11; x += 1) {
    console.log(x);
}
for(let i = 0; i < experience.length; i++) {
    console.log(experience[i]);
}

        // Returning value in function
let player1Time = 102;
let player2Time = 107;

function getFastesRaceTime() {
    if(player1Time < player2Time) {
        return player1Time;
    }
    else if(player1Time > player2Time) {
        return player2Time
    }
    else{
        return player1Time;
    }
}
let fastesRace = getFastesRaceTime();
console.log(fastesRace);

function getTotalRaceTime() {
    return player1Time + player2Time;
}
console.log(getTotalRaceTime())

        // Generate Random Number
let randomNumber1 = Math.random(); // 0.000 - 0.999
console.log(randomNumber1);
let randomNumber2 = Math.random() * 6 // 0.000 - 5.999
console.log(randomNumber2);
let randomNumber3 = Math.floor(Math.random() * 6)
console.log(randomNumber3); // Avoide numbers after dicimal(0,1,2,3,4,5)
function rollDice() {
    let randomNumber4 = Math.floor(Math.random() * 6) + 1
    return randomNumber4
}
console.log(rollDice())

        // Use of AND operator
let hasCompletedCousrse = true
let givesCertificate = true

if(hasCompletedCousrse === true && givesCertificate === true) {
    generateCertificate()
}
function generateCertificate() {
    console.log("Generateing Certificate...")
}

        // OR operator
let likeDocumentaries = true
let likeSrartups = true

if(likeDocumentaries === true || likeSrartups === true) {
    recommendMovie()
}
function recommendMovie() {
    console.log("Hey, check out this new film we think you will like!")
}

        // Object
let course = {
    title : "Learn CSS Grid for free",
    lessons : 16,
    creator : "Per Harald Borgen",
    length : 63,
    level : 2,
    isFree : true,
    tags : ["HTML","CSS"]
}
console.log(course.length)
console.log(course.title)

        //Blackjack Game

let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = " ";
let cards = []; //Array

let messageEl = document.getElementById("message-el");
let sumEl = document.querySelector("#sum-el"); //Return first matching element   
let cardsEl = document.getElementById("cards-el");

let player = {      // Object
    name : "Per",
    chips : 145
}


let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1; // 1 - 13 
    if(randomNumber > 10) {
        return 10
    }
    else if(randomNumber === 1) {
        return 11;
    }
    else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}

function renderGame() {
    cardsEl.textContent = "Cards: ";
    for(let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
    sumEl.textContent = "Sum:" + sum;
    // cardsEl.textContent = "Cards: " + cards[0] + " " + cards[1]; //Instead of firstCard and secondCard
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    }
    else if (sum ===21) {
        message = "Wohoo! You've got Blackjack!";
        hasBlackJack = true;
    }
    else {
    message = "You're out of the game!";
    isAlive = false;
    }
    messageEl.textContent = message

}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
}
    
        // Object and function
let person = {
    name: "Per",
    age: 35,
    country: "Norway"
}
function logData() {
    console.log(person.name + " is " + person.age + " years old and lives in " + person.country)
}
logData()

        // Rock Paper Scissor
let hands = ["rock","paper","scissor"]
function getHand() {
    let randomIndex = Math.floor(Math.random() * 3)
    return hands[randomIndex]
}
console.log(getHand())

        // Emoji Fighter
let fighters = ["🐒","🦍","🦧","🐶","🐕","🦮","🐕‍🦺","🦁","🐈‍⬛",
                "🐈","🐱","🦝","🦊","🐺","🐩","🐯"];
let stageEl = document.getElementById("stage")
let fightButton = document.getElementById("fightButton")

fightButton.addEventListener("click",function(){
    let randomIndex1 = Math.floor(Math.random() * fighters.length)
    let randomIndex2 = Math.floor(Math.random() * fighters.length)
    stageEl.textContent = fighters[randomIndex1] + "VS" + fighters[randomIndex2]
})

// addEventListener() method

let boxOpen = document.getElementById("event_btn");
boxOpen.addEventListener("click",function() {
    console.log("I want to open the box");

})

// innerHTML property

let innerHTMLEl = document.querySelector(".innerhtml");

innerHTMLEl.innerHTML = "<button onclick='buy()'> Buy! </button>";

function buy() {
    innerHTMLEl.innerHTML = "<p>Thank you for buying!</p>"
}

// Template strings
let recipient = "Akash"
let email = `Hey ${recipient}! How is it going?`
console.log(email)

// Truthy & Falsy
let criedits = 0
if(criedits) {
    console.log("Let's play")
}
else{
    console.log("Sorry! You have no crideit")
}

//false false,0,"",null(how you as a developer signalize emptiness),undefined(how javascript signalizes emptiness),NaN

// function parameter

let welcomeEl = document.getElementById("welcome-el")

//                  parameters
function greetUser(greeting,name) {
    welcomeEl.textContent = `${greetUser}, ${name}` 
}
//          arguments
greetUser("per","james")

//Log out items in an array
let myCourses = ["Learn HTML","Learn CSS","Learn JavaScript"];

function logItems(arr) {
    for(let i = 0; i < arr.length ; i++) {
        console.log(arr[i])
    }
}

logItems(myCourses)

//Save to local storage 
localStorage.setItem("myCredits","100")
let myCredits = localStorage.getItem("myCredits")
console.log(myCredits)

// addEventListener and object in array
let data = [
    {
        player: "Jane",
        score: 52
    },
    {
        player: "Mark",
        score: 41
    }
]

const janeBtn = document.getElementById("jane-btn")
janeBtn.addEventListener("click",function() {
    //console.log("button clicked")
    //console.log(data)
    //console.log(data[0])
    console.log(data[0].score)

})

//Generate sentence
function generateSentence(desc,arr) {
    let baseString = `The ${arr.length} ${desc} are`
    const lastItem = arr.length - 1;
    for (let i = 0; i < arr.length; i++) {
        if(i === lastItem){
            baseString += arr[i]
        }
        else{
            baseString += arr[i] + ","
        }
    }
    return baseString;
}
const sentence = generateSentence("highest moutains",[" Mount Everest","K2"])
console.log(sentence)
*/

//Render images
const imgs = [
    "ri3.jpg",
    "ri2.jpg",
    "ri1.jpg"
]

const RenderImageContainer = document.getElementById("Render-image-container")

function renderImages() {
    for(let i=0;i<imgs.length;i++) {
        RenderImageContainer.innerHTML += `<img class="team-img" src="${imgs[i]}">`
    }
}
renderImages()


//Rounding number

const totalPrice = 420.40958785
const btn = document.getElementById("purchase-bt")
btn.textContent = `Buy $${Number(totalPrice).toFixed(2)}`

// Ternary operator
const exerciseTimeMins = 45
//const message = exerciseTimeMins < 30 ? "You need to try harder!" : "Doing good!"
const message = exerciseTimeMins < 30 ? 'You need to try herder!' : exerciseTimeMins < 60 ? 'Doing good' : 'Excellent!'
console.log(message)

const playerGuss = 7
const correctAnswer = 6
//const message = playerGuss === correctAnswer ? 'Correct!' : 'Wrong!'
const message = playerGuss < correctAnswer ? 'Too low!' : playerGuss > correctAnswer ? 'Too high' : 'Exactly right!'
console.log(message)

// Switch statements
function selectItem(item) {
    let price = 0
    
    switch(item) {
        case 'coffee':
             price = 2
        break
        case 'sandwiches':
            price = 5
        break
        case 'salad':
            price = 4
        break
        default:
            return `Sorry! We don't sell ${item}`  
    }
    return `You selected ${item}. That will be $${price}`
}
console.log(selectItem('salad'))

// Object Destructuring : Object destructuring enables us to exeract properties from objects into distinct variables.
const favouriteFilm = {
    title: "Top Gun",
    year: "1986",
    genre: "action",
    star: "Tom Cruise",
    director: "Tony Scott"
}

const {title,year,genre,star,director} = favouriteFilm


//const title = favouriteFilm.title
//const year = favouriteFilm.year
//const genre = favouriteFilm.genre
//const star = favouriteFilm.star
//const director = favouriteFilm.director

console.log(`My favourite flim is ${title} starring ${star}. It's an ${genre} film that was directed by ${director} and released in ${year}`)


// setTimeout with params
function displayTrafficLight(light) {
    console.log(light)
}
setTimeout(function() {
    displayTrafficLight("Green light")}
    ,3000)
displayTrafficLight("Red light")

function logAnswer(answer,points) {
    console.log(`The answer is ${answer} of course! If you got that right, giver yourself ${points} points.`)    
}
console.log('What is the capital of peru?')
const questionTimer = setTimeout(logAnswer,3000,'Lima',10)

 document.getElementById('stop').addEventListener('click',function() {
    clearTimeout(questionTimer)
    console.log('Cancelling....')
 })


// The event loop
// JavaScript is a single-threaded,non-blocking language. JavaScript gets a helping hand: WebAPI,Task Queue,Event Loop. These are not part of javascript.
// What are WebAPIs? Ans: WebAPIs is provided by the browser, not part of javascript, have functionality for DOM manipulation, Data requests, Timers(setTimeout,setInterval) and more

// Import Export: named
import {interplanetaryDestinationsArr} from './data.js' // import information from data.js file
//console.log(interplanetaryDestinationsArr)

// Import Export : default
import getMatchingTripsArr from './searchFunction.js'
console.log(getMatchingTripsArr(interplanetaryDestinationsArr,'exotic'))

// Constructors : Two types of constructor 1.Inbuilt, 2.Custom. 1.Inbuilt: Provide objects in various predetermind formats,like Date objects and Error objects,and Objects for each data type.
// 2.Constructors we design ourselves to produce objects for our own specific purpouses.
const dateSnapshot = new Date()
console.log(dateSnapshot)
console.log(typeof(dateSnapshot))
console.log(dateSnapshot.toString())

// The Error() Constructor
function checkUsername(userName) {
    if (userName) {
        console.log(userName)
    }
    else {
        throw new Error('No username provided')
    }
}
checkUsername()

// Numeric Separators & Bigint
let num1 = 2_342_587_345_894
let num2 = 2_342_587_345_894n
let num3 = BigInt(2_342_587_345_894)
console.log(num1)
console.log(typeof(num1)) 
console.log(typeof(num2))
console.log(typeof(num3))

// Hoisting: Hoisting variable and function declarations are moved to the top of their containing scope during the compilation phase,before code exection.
console.log(getNews())
function getNews() {
    return "Good news!"
}


// Arrow Functions
const getSpendAlert = amount =>  `Warning! You just spent $${amount}` //1 parameter: brackets not needed

console.log(getSpendAlert(150))  // 0 or 2 or more parameters: bracket needed
const sum = (n1,n2) => {
    return n1 + n2
}
console.log(sum(2,5))

// Return one line of code without curly braces or the return keyword.
// More complex logic requires the curly braces and the return keyword.

// Default parameter means giving a parameter a default value when a function is called without providing that argument.
function greet(name = "Guest") {
    console.log(`Hello, ${name}!`);
}

greet("Akash");
greet();

// Rest parameter use to store many arguments in an array
function add(...numbers) {
    console.log(numbers);
}

add(10, 20, 30, 40);


function getLabelsHtml(text,sender,...staffObjects) {
    console.log(staffObjects)
    const labelsHtml = staffObjects.map(staffObj => 
        `<div class="label-card">
            <p>Dear ${staffObj.name}</p>
            <p>${text}</p>
            <p>Best wishes,</p>
            <p>${sender}</p>
        </div>`
    ).join('')
    return labelsHtml
}

const text = 'Thank you for all your hard work throughout the year!'
const sender = 'Tom'

document.getElementById('labels-container').innerHTML = getLabelsHtml(
    text,
    sender,
    {name: 'Sally'},
    {name: 'Mike'},
    {name: 'Rob'},
    {name: 'Harriet'}
)
*/

// A callback function is a function that is passed as an argument to another function and is called later by that function.
function greet(name) {
    console.log(`Hello, ${name}`);
}

function processUser(callback) {
    callback("Akash");
}

processUser(greet);


function notifyUser(notificationFn) {
    notificationFn()
}
const emailNotification = () => console.log('Email sent')
const smsNotification = () => console.log('SMS sent')
notifyUser(emailNotification)
notifyUser(smsNotification)







