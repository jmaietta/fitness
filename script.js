// JavaScript logic for the fitness app

document.addEventListener('DOMContentLoaded', function () {
    // Initialize tab switching
    initTabs();
    // Show a motivational quote once per 24 hours
    displayDailyQuote();
    // Initialize expandable items using a more robust method
    initExpandableItems();
    // Build the content for the Nutrition tab
    initFoodTab();

    // --- NEW CALCULATOR LOGIC ---
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) { // Check if the button exists on the page
        const resultsContainer = document.getElementById('resultsContainer');

        const weightInput = document.getElementById('weight');
        const heightInput = document.getElementById('height');
        const ageInput = document.getElementById('age');
        const genderSelect = document.getElementById('gender');
        const activitySelect = document.getElementById('activity');
        const goalSelect = document.getElementById('goal');

        const caloriesResultEl = document.getElementById('caloriesResult');
        const proteinResultEl = document.getElementById('proteinResult');
        const carbsResultEl = document.getElementById('carbsResult');
        const fatResultEl = document.getElementById('fatResult');

        calculateBtn.addEventListener('click', () => {
            const weight = parseFloat(weightInput.value);
            const height = parseFloat(heightInput.value);
            const age = parseInt(ageInput.value);
            const gender = genderSelect.value;
            const activityFactor = parseFloat(activitySelect.value);
            const goal = goalSelect.value;

            if (isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
                alert('Please enter valid numbers for weight, height, and age.');
                return;
            }

            const weightKg = weight * 0.453592;
            const heightCm = height * 2.54;

            let bmr = (gender === 'male')
                ? (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5
                : (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;

            const tdee = bmr * activityFactor;

            let targetCalories = tdee;
            if (goal === 'cut') {
                targetCalories -= 500;
            } else if (goal === 'bulk') {
                targetCalories += 300;
            }

            const proteinGrams = Math.round(weight);
            const fatGrams = Math.round((targetCalories * 0.25) / 9);
            const carbsGrams = Math.round((targetCalories - (proteinGrams * 4) - (fatGrams * 9)) / 4);

            caloriesResultEl.textContent = Math.round(targetCalories).toLocaleString();
            proteinResultEl.textContent = `${proteinGrams}g`;
            carbsResultEl.textContent = `${carbsGrams}g`;
            fatResultEl.textContent = `${fatGrams}g`;

            resultsContainer.classList.add('visible');
        });
        
        // Add event listener to close the overlay
        resultsContainer.addEventListener('click', (event) => {
            // Close if the click is on the overlay itself, not the card inside
            if (event.target === resultsContainer) {
                resultsContainer.classList.remove('visible');
            }
        });
    }
});

/**
 * Sets up click handlers for navigation tabs.
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            this.classList.add('active');
            const targetId = this.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

/**
 * Displays a motivational quote once per 24-hour period.
 */
function displayDailyQuote() {
    const quotes = [
        'Success doesn\'t come from what you do occasionally. It comes from what you do consistently.',
        'The only bad workout is the one that didn\'t happen.',
        'Don\'t limit your challenges, challenge your limits.',
        'Strength doesn\'t come from what you can do. It comes from overcoming the things you once thought you couldn\'t.',
        'Your body can stand almost anything. It\'s your mind that you have to convince.',
        'Do something today that your future self will thank you for.',
        'The real workout starts when you want to stop.',
        'Motivation is what gets you started. Habit is what keeps you going.',
        'The pain you feel today will be the strength you feel tomorrow.',
        'If it doesn\'t challenge you, it won\'t change you.',
        'You are your only limit.',
        'Be stronger than your excuses.'
    ];

    const quoteBox = document.getElementById('quote-box');
    if (!quoteBox) return;

    const now = Date.now();
    const lastTimestamp = parseInt(localStorage.getItem('lastQuoteTime'), 10);
    let quoteIndex = parseInt(localStorage.getItem('lastQuoteIndex'), 10);

    if (!lastTimestamp || isNaN(lastTimestamp) || (now - lastTimestamp) > 24 * 60 * 60 * 1000 || isNaN(quoteIndex)) {
        quoteIndex = Math.floor(Math.random() * quotes.length);
        localStorage.setItem('lastQuoteTime', now.toString());
        localStorage.setItem('lastQuoteIndex', quoteIndex.toString());
    }

    const quote = quotes[quoteIndex];
    quoteBox.innerHTML = `<p>${quote}</p>`;
    quoteBox.style.display = 'block';
}

/**
 * Sets up a single click handler on the main container to manage all expandable items.
 */
function initExpandableItems() {
    const container = document.querySelector('.app-container');
    if (!container) return;

    container.addEventListener('click', function(event) {
        const header = event.target.closest('.exercise-header');
        if (!header) return;

        const detailsElement = header.nextElementSibling;

        if (detailsElement && detailsElement.classList.contains('details')) {
            header.classList.toggle('expanded');
            
            if (detailsElement.style.maxHeight) {
                detailsElement.style.maxHeight = null;
            } else {
                detailsElement.style.maxHeight = detailsElement.scrollHeight + "px";
            }
        }
    });
}

/**
 * MODIFIED: Appends the nutrition guide content to the Nutrition tab,
 * after the calculator which is now hardcoded in index.html.
 */
function initFoodTab() {
    const foodContainer = document.getElementById('nutrition');
    if (!foodContainer) return;

    const guideContainer = document.createElement('div');

    let content = `
        <div class="nutrition-header" style="margin-top: 40px;">
            <h2>Nutrition Guide</h2>
            <p>Use these heuristics to build a balanced, healthy diet that fuels your goals.</p>
        </div>
    `;

    content += '<h3>General Dietary Heuristics</h3>';
    content += '<div class="heuristics-container">';
    const icons = ["fa-bullseye", "fa-bullseye", "fa-tint", "fa-utensils", "fa-balance-scale"];
    generalHeuristics.forEach((heuristic, index) => {
        content += `
            <div class="heuristic-card">
                <div class="heuristic-icon"><i class="fa-solid ${icons[index] || 'fa-star'}"></i></div>
                <div class="heuristic-text">${heuristic}</div>
            </div>
        `;
    });
    content += '</div>';

    content += '<h3>Protein Sources</h3>';
    content += '<ul>';
    proteinSources.forEach(item => {
        content += `
            <li>
                <div class="exercise-header">
                    <img src="${item.image}" alt="${item.name}" class="food-thumbnail">
                    <span class="exercise-name">${item.name}</span>
                    <span class="expand-icon">></span>
                </div>
                <div class="details">
                    <p><strong>Portion:</strong> ${item.portion}</p>
                    <div class="macro-stats">
                        <div class="stat"><span class="stat-value">${item.protein}</span><span class="stat-label">Protein</span></div>
                        <div class="stat"><span class="stat-value">${item.fat}</span><span class="stat-label">Fat</span></div>
                        <div class="stat"><span class="stat-value">${item.calories}</span><span class="stat-label">Calories</span></div>
                    </div>
                </div>
            </li>
        `;
    });
    content += '</ul>';

    content += '<h3>Carbs, Fats & Produce</h3>';
    content += '<ul>';
    otherSources.forEach(item => {
        content += `
            <li>
                <div class="exercise-header">
                    <img src="${item.image}" alt="${item.name}" class="food-thumbnail">
                    <span class="exercise-name">${item.name}</span>
                    <span class="expand-icon">></span>
                </div>
                <div class="details">
                    <p><strong>Portion:</strong> ${item.portion}</p>
                     <div class="macro-stats">
                        <div class="stat"><span class="stat-value">${item.carbs}</span><span class="stat-label">Carbs</span></div>
                        <div class="stat"><span class="stat-value">${item.fat}</span><span class="stat-label">Fat</span></div>
                        <div class="stat"><span class="stat-value">${item.calories}</span><span class="stat-label">Calories</span></div>
                    </div>
                </div>
            </li>
        `;
    });
    content += '</ul>';

    content += `<p class="disclaimer">${disclaimerText}</p>`;

    guideContainer.innerHTML = content;
    foodContainer.appendChild(guideContainer);
}
