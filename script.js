// JavaScript logic for the fitness app

document.addEventListener('DOMContentLoaded', function () {
    // Initialize tab switching
    initTabs();
    // Initialize checkbox persistence and visual cues
    initCheckboxes();
    // Show a motivational quote once per 24 hours
    displayDailyQuote();
});

/**
 * Sets up click handlers for navigation tabs
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            // Hide all content panels
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate the clicked button
            this.classList.add('active');
            // Show the associated content panel
            const targetId = this.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

/**
 * Persists checkbox state using localStorage and toggles a 'completed' class for visual feedback.
 */
function initCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][data-exercise]');
    checkboxes.forEach(box => {
        const exerciseName = box.getAttribute('data-exercise');
        const label = box.parentElement;

        // On initial load, check localStorage and apply state
        const stored = localStorage.getItem('exercise_' + exerciseName);
        if (stored === 'true') {
            box.checked = true;
            label.classList.add('completed');
        }

        // Add event listener for changes
        box.addEventListener('change', function () {
            // Save state to localStorage
            localStorage.setItem('exercise_' + exerciseName, this.checked);
            // Toggle the 'completed' class on the parent label
            label.classList.toggle('completed', this.checked);
        });
    });
}


/**
 * Displays a motivational quote once per 24-hour period.
 * If a quote has already been displayed in the last 24 hours, it reuses the same quote.
 */
function displayDailyQuote() {
    const quotes = [
        'The only bad workout is the one that didn\'t happen.',
        'Don\'t limit your challenges, challenge your limits.',
        'Strength doesn\'t come from what you can do. It comes from overcoming the things you once thought you couldn\'t.',
        'Your body can stand almost anything. It\'s your mind that you have to convince.',
        'Success doesn\'t come from what you do occasionally. It comes from what you do consistently.',
        'Motivation is what gets you started. Habit is what keeps you going.',
        'Exercise is like telling your body “you\'re gonna hate me for this, but you\'ll thank me later.”',
        'The pain you feel today will be the strength you feel tomorrow.'
    ];

    const quoteBox = document.getElementById('quote-box');
    if (!quoteBox) return;

    const now = Date.now();
    const lastTimestamp = parseInt(localStorage.getItem('lastQuoteTime'), 10);
    let quoteIndex = parseInt(localStorage.getItem('lastQuoteIndex'), 10);

    // Determine whether to pick a new quote
    if (!lastTimestamp || isNaN(lastTimestamp) || (now - lastTimestamp) > 24 * 60 * 60 * 1000 || isNaN(quoteIndex)) {
        // Choose a random quote index
        quoteIndex = Math.floor(Math.random() * quotes.length);
        // Store timestamp and index
        localStorage.setItem('lastQuoteTime', now.toString());
        localStorage.setItem('lastQuoteIndex', quoteIndex.toString());
    }

    // Set and display the quote
    const quote = quotes[quoteIndex];
    quoteBox.textContent = quote;
    quoteBox.style.display = 'block';
}