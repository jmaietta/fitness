// JavaScript logic for the fitness app

document.addEventListener('DOMContentLoaded', function () {
    // Initialize tab switching
    initTabs();
    // Show a motivational quote once per 24 hours
    displayDailyQuote();
    // Initialize expandable exercise details
    initExpandableItems();
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
 * Sets up click handlers for exercise headers to toggle the visibility of the details section.
 */
function initExpandableItems() {
    document.querySelectorAll('.exercise-header').forEach(header => {
        header.addEventListener('click', () => {
            const detailsElement = header.nextElementSibling;

            if (detailsElement) {
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
    });
}
