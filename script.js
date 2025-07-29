// JavaScript logic for the fitness app

document.addEventListener('DOMContentLoaded', function () {
    // Initialize tab switching
    initTabs();
    // Show a motivational quote once per 24 hours
    displayDailyQuote();
    // Initialize expandable exercise details
    initExpandableItems();
    // Build the content for the Food tab
    initFoodTab();
});

/**
 * Sets up click handlers for navigation tabs
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
 * Sets up click handlers for expandable headers to toggle the visibility of the details section.
 * Uses event delegation to work for dynamically added content.
 */
function initExpandableItems() {
    const container = document.querySelector('.app-container');
    if (!container) return;

    container.addEventListener('click', function(event) {
        // Find the closest .exercise-header ancestor of the clicked element
        const header = event.target.closest('.exercise-header');
        if (!header) return; // If the click was not on or inside a header, do nothing

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
 * Builds the HTML content for the Food tab from the data in food_data.js
 */
function initFoodTab() {
    const foodContainer = document.getElementById('food');
    if (!foodContainer) return;

    let content = '<h2>Nutrition Guide</h2>';

    // General Heuristics
    content += '<h3>General Dietary Heuristics</h3>';
    content += '<ul class="heuristics-list">';
    generalHeuristics.forEach(heuristic => {
        content += `<li>${heuristic}</li>`;
    });
    content += '</ul>';

    // Protein Sources
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
                    <table class="food-details-table">
                        <tr><td>Approx. Protein</td><td>${item.protein}</td></tr>
                        <tr><td>Approx. Fat</td><td>${item.fat}</td></tr>
                        <tr><td>Approx. Calories</td><td>${item.calories}</td></tr>
                    </table>
                </div>
            </li>
        `;
    });
    content += '</ul>';

    // Other Sources
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
                    <p>${item.info}</p>
                    <table class="food-details-table">
                         <tr><td>Approx. Calories</td><td>${item.calories}</td></tr>
                    </table>
                </div>
            </li>
        `;
    });
    content += '</ul>';

    // Disclaimer
    content += `<p class="disclaimer">${disclaimerText}</p>`;

    foodContainer.innerHTML = content;
}
