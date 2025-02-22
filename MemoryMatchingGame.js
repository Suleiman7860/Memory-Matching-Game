const categories = {
    fruits: ['🍎', '🍌', '🍉', '🍇', '🍓', '🍍', '🥭', '🍒'],
    emojis: ['😀', '😂', '😍', '🤩', '😎', '😭', '😡', '😱'],
    animals: ['🐶', '🐱', '🦁', '🐸', '🐰', '🐼', '🐵', '🦊'],
    planets: ['🌍', '🌕', '⭐', '🪐', '🌞', '🌛', '🌟', '🚀'],
      food: ['☕', '🍸', '🍔', '🍨', '🍿', '🧆', '🥪', '🍬']
};
let gameData = [];
let flippedCards = [];
let score = 0;
let timer = 30;
let interval;

function startGame(category) {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('category-title').innerText = `Category: ${category}`;
    score = 0;
    document.getElementById('score').innerText = score;
    timer = 30;
    document.getElementById('timer').innerText = timer;
    
    gameData = [...categories[category], ...categories[category]].sort(() => Math.random() - 0.5);
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    gameData.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.onclick = () => handleCardClick(card, symbol);
        grid.appendChild(card);
    });
    interval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = timer;
        if (timer === 0) {
            clearInterval(interval);
            alert('Game Over!');
        }
    }, 1000);
}

function handleCardClick(card, symbol) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.innerText = symbol;
        card.classList.add('flipped');
        flippedCards.push({ card, symbol });
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    if (flippedCards[0].symbol === flippedCards[1].symbol) {
        flippedCards.forEach(({ card }) => card.classList.add('matched'));
        score += 10;
        document.getElementById('score').innerText = score;
    } else {
        flippedCards.forEach(({ card }) => {
            card.innerText = '';
            card.classList.remove('flipped');
        });
    }
    flippedCards = [];
}

function restartGame() {
    clearInterval(interval);
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('landing-page').classList.remove('hidden');
}
