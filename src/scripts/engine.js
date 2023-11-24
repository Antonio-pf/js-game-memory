const emojis = [
    "🐷",
    "🐷",
    "🐶",
    "🐶",
    "🐝",
    "🐝",
    "🐜",
    "🐜",
    "🕸️",
    "🕸️",
    "🐧",
    "🐧",
    "🐬",
    "🐬",
    "🦉",
    "🦉"
];
let openCards = [];
let numberOfAttempts = 0;
let scores = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5) ? 2: -1);

for (let i=0; i < emojis.length; i++) {
    let box = document.createElement
    ("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
    if(openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this)
    
    }

    if(openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch(){
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        numberOfAttempts++;
        console.log(numberOfAttempts);
    } else {
        numberOfAttempts++;
        console.log(numberOfAttempts);
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    if(document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert("VOCÊ VENCEU!!! \n Tentativas: " + numberOfAttempts)

    
        numberOfAttempts = 0;
    }

}

function rankingScore(attempts) {
   
    const previousScore = localStorage.getItem('score');

    console.log(previousScore);
   
    if (previousScore) {
        if (attempts < parseInt(previousScore, 10)) {
            localStorage.setItem('score', attempts.toString());
            document.getElementById("pontuacao").innerHTML = "Pontuação: " + localStorage.getItem('score');
        }
    } 
}