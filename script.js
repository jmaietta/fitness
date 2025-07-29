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
});

/**
 * Sets up click handlers for navigation tabs.
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove .active class from all buttons and content panels
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add .active class to the clicked button and its corresponding content panel
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
 * This method (event delegation) works for both static and dynamically added content.
 */
function initExpandableItems() {
    const container = document.querySelector('.app-container');
    if (!container) return;

    container.addEventListener('click', function(event) {
        // Find the closest .exercise-header ancestor of the clicked element
        const header = event.target.closest('.exercise-header');
        
        // If the click was not on or inside a header, do nothing
        if (!header) {
            return;
        }

        const detailsElement = header.nextElementSibling;

        if (detailsElement && detailsElement.classList.contains('details')) {
            // Toggle a class on the header for CSS to handle the icon rotation
            header.classList.toggle('expanded');
            
            // Animate the expansion using max-height
            if (detailsElement.style.maxHeight) {
                detailsElement.style.maxHeight = null;
            } else {
                detailsElement.style.maxHeight = detailsElement.scrollHeight + "px";
            }
        }
    });
}

/**
 * Builds the HTML content for the Nutrition tab from the data in food_data.js
 */
function initFoodTab() {
    // Note: This function now uses the id "nutrition"
    const foodContainer = document.getElementById('nutrition');
    if (!foodContainer) return;

    // --- 1. Visual Header Banner ---
    let content = `
        <div class="nutrition-header">
            <h2>Nutrition Guide</h2>
            <p>Use these heuristics to build a balanced, healthy diet that fuels your goals.</p>
        </div>
    `;

    // --- 2. General Heuristics with Icons ---
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

    // --- 3. Protein Sources with Visualized Macros ---
    content += '<h3>Protein Sources</h3>';
    content += '<ul>';
    proteinSources.forEach(item => {
        content += `
            <li>
                <div class="exercise-header">
                    <span class="exercise-name">${item.name}</span>
                    <span class="expand-icon">></span>
                </div>
                <div class="details">
                    <p><strong>Portion:</strong> ${item.portion}</p>
                    <div class="macro-stats">
                        <div class="stat">
                            <span class="stat-value">${item.protein}</span>
                            <span class="stat-label">Protein</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${item.fat}</span>
                            <span class="stat-label">Fat</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${item.calories}</span>
                            <span class="stat-label">Calories</span>
                        </div>
                    </div>
                </div>
            </li>
        `;
    });
    content += '</ul>';

    // --- 4. Other Sources with Visualized Macros ---
    content += '<h3>Carbs, Fats & Produce</h3>';
    content += '<ul>';
    otherSources.forEach(item => {
        content += `
            <li>
                <div class="exercise-header">
                    <span class="exercise-name">${item.name}</span>
                    <span class="expand-icon">></span>
                </div>
                <div class="details">
                    <p><strong>Portion:</strong> ${item.portion}</p>
                     <div class="macro-stats">
                        <div class="stat">
                            <span class="stat-value">${item.carbs}</span>
                            <span class="stat-label">Carbs</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${item.fat}</span>
                            <span class="stat-label">Fat</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${item.calories}</span>
                            <span class="stat-label">Calories</span>
                        </div>
                    </div>
                </div>
            </li>
        `;
    });
    content += '</ul>';

    // Disclaimer
    content += `<p class="disclaimer">${disclaimerText}</p>`;

    foodContainer.innerHTML = content;
}
