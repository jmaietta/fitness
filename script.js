// JavaScript logic for the fitness app

document.addEventListener('DOMContentLoaded', function () {
    // Initialize tab switching
    initTabs();
    // Initialize checkbox persistence and visual cues
    initCheckboxes();
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
 * Persists checkbox state using localStorage and toggles a 'completed' class for visual feedback.
 */
function initCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][data-exercise]');
    checkboxes.forEach(box => {
        const exerciseName = box.getAttribute('data-exercise');
        const label = box.parentElement;

        const stored = localStorage.getItem('exercise_' + exerciseName);
        if (stored === 'true') {
            box.checked = true;
            label.classList.add('completed');
        }

        box.addEventListener('change', function () {
            localStorage.setItem('exercise_' + exerciseName, this.checked);
            label.classList.toggle('completed', this.checked);
        });
    });
}

/**
 * Displays a motivational quote once per 24-hour period.
 */
function displayDailyQuote() {
    const quotes = [
        'The only bad workout is the one that didn\'t happen.',
        'Don\'t limit your challenges, challenge your limits.',
        'Strength doesn\'t come from what you can do. It comes from overcoming the things you once thought you couldn\'t.',
        'Your body can stand almost anything. It\'s your mind that you have to convince.',
        'Success doesn\'t come from what you do occasionally. It comes from what you do consistently.',
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
    quoteBox.textContent = quote;
    quoteBox.style.display = 'block';
}

/**
 * Sets up click handlers for exercise names to toggle the visibility of the details section.
 */
function initExpandableItems() {
    document.querySelectorAll('.exercise-name').forEach(nameElement => {
        nameElement.addEventListener('click', () => {
            const detailsElement = nameElement.closest('li').querySelector('.details');
            if (detailsElement) {
                const isVisible = detailsElement.style.display === 'block';
                detailsElement.style.display = isVisible ? 'none' : 'block';
            }
        });
    });
}
