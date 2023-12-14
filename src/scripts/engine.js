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

function initialize() {
    createCards();
    updateScoreList();
    startGameWithOpenCards();
}

const startGameWithOpenCards = function() {
    setTimeout(() => {
        document.querySelectorAll(".item").forEach(card => {
            card.classList.remove("boxOpen");
        });
    }, 2000);
}

const createCards = function() {

    let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5) ? 2 : -1);

    for (let i = 0; i < emojis.length; i++) {
        let box = document.createElement("div");
        box.className = "item boxOpen"; 
        box.innerHTML = shuffleEmojis[i];
        box.onclick = handleClick;
        document.querySelector(".game").appendChild(box);
    }
}

const handleClick = function() {
    // Evitar ações se vários cliques se o cartão já estiver aberto ou se já houver 2 cartões abertos
    if (this.classList.contains("boxOpen") || openCards.length >= 2) {
        return; 
    }

    this.classList.add("boxOpen");
    openCards.push(this);

    if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

const checkMatch = function() {
    
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        numberOfAttempts++;
    } else {
        numberOfAttempts++;
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert("VOCÊ VENCEU!!! \n Tentativas: " + numberOfAttempts);

        rankingScore(numberOfAttempts);

        numberOfAttempts = 0;
    }
}

const rankingScore = function (attempts) {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];

    scores.push(attempts);
    scores.sort((a, b) => a - b); // Classifica em ordem crescente

    scores = scores.slice(0, 3);

    localStorage.setItem('scores', JSON.stringify(scores));

    updateScoreList();
}

const updateScoreList = function() {
    const scoreList = document.getElementById("score-list");
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    scoreList.innerHTML = "";

    scores.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `#${index + 1}: ${score} tentativas`;
        scoreList.appendChild(listItem);
    });
}

initialize();
