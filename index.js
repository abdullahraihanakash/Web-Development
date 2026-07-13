//document.getElementById("counter").innerText = 5
      // Counter 
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
