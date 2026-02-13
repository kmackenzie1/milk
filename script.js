let words = [
  "llama", "goat", "sheep", "cow", "camel", "squirrel", "horse", "kangaroo",
  "otter", "bear", "elephant", "rabbit", "pig", "panda", "lion", "leopard",
  "wolf", "chimpanzee", "fox", "seal", "guinea pig", "whale", "dog", "lemur",
  "monkey", "anteater", "dolphin", "cat", "pangolin", "hyena", "platypus",
  "human", "mole", "bat", "mouse", "weasel", "rat"
];
let usedWords = [];
let currentWords = { 0: '', 1: '' };

function getStats() {
    const stats = localStorage.getItem('milkGameStats');
    return stats ? JSON.parse(stats) : {};
}

function saveStats(stats) {
    localStorage.setItem('milkGameStats', JSON.stringify(stats));
}

function recordSelection(animal) {
    const stats = getStats();
    stats[animal] = (stats[animal] || 0) + 1;
    saveStats(stats);
}

function getPercentages() {
    const stats = getStats();
    const total = Object.values(stats).reduce((sum, count) => sum + count, 0);
    if (total === 0) return {};
    
    const percentages = {};
    for (const [animal, count] of Object.entries(stats)) {
        percentages[animal] = ((count / total) * 100).toFixed(2);
    }
    return percentages;
}

function loadWords() {
    initializeImages();
}

function getRandomWord() {
    if (words.length === 0) return '';
    if (usedWords.length >= words.length) {
        usedWords = [];
    }
    let word;
    do {
        word = words[Math.floor(Math.random() * words.length)];
    } while (usedWords.includes(word) && usedWords.length < words.length);
    usedWords.push(word);
    return word;
}

function updateWords() {
    const word0 = getRandomWord();
    const word1 = getRandomWord();
    currentWords[0] = word0;
    currentWords[1] = word1;
    document.getElementById('word0').textContent = word0;
    document.getElementById('word1').textContent = word1;
}

function selectImage(index) {
    const selectedAnimal = currentWords[index];
    if (selectedAnimal) {
        recordSelection(selectedAnimal);
    }
    
    document.querySelectorAll('.image-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelectorAll('.image-card')[index].classList.add('selected');
    updateWords();
}

function initializeImages() {
    updateWords();
}

function toggleResults() {
    const resultsDiv = document.getElementById('results');
    const isVisible = resultsDiv.style.display !== 'none';
    resultsDiv.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
        displayResults();
    }
}

function displayResults() {
    const percentages = getPercentages();
    const stats = getStats();
    const total = Object.values(stats).reduce((sum, count) => sum + count, 0);
    
    const resultsContent = document.getElementById('results-content');
    
    if (total === 0) {
        resultsContent.innerHTML = '<p>No selections recorded yet.</p>';
        return;
    }
    
    const sorted = Object.entries(percentages)
        .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]));
    
    let html = '<div class="chart-container">';
    html += '<div class="chart-title">Milk win-rates</div>';
    html += '<div class="chart-axis-label">% pairings won</div>';
    html += '<div class="chart-scale">';
    for (let i = 0; i <= 100; i += 10) {
        html += `<span class="scale-mark">${i}</span>`;
    }
    html += '</div>';
    html += '<div class="chart-bars">';
    
    sorted.forEach(([animal, percentage]) => {
        const pct = parseFloat(percentage);
        html += `<div class="bar-row">
            <span class="bar-label">${animal}</span>
            <div class="bar-wrapper">
                <div class="bar" style="width: ${pct}%">
                    <span class="bar-value">${Math.round(pct)}%</span>
                </div>
            </div>
        </div>`;
    });
    
    html += '</div></div>';
    resultsContent.innerHTML = html;
}

window.addEventListener('load', () => {
    loadWords();
});
