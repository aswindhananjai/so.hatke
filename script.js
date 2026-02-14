// ===== STATE MANAGEMENT =====
const state = {
    brand: null,
    brandPrice: 0,
    color: null,
    size: null,
    graphics: [],
    customText: '',
    font: 'graffiti',
    totalPrice: 0
};

// ===== DOM ELEMENTS =====
const elements = {
    totalPrice: document.getElementById('totalPrice'),
    jacketBase: document.getElementById('jacketBase'),
    graphicsLayer: document.getElementById('graphicsLayer'),
    textLayer: document.getElementById('textLayer'),
    previewSummary: document.getElementById('previewSummary'),
    customTextInput: document.getElementById('customText'),

    // Phase sections
    phase1: document.getElementById('phase1'),
    phase2: document.getElementById('phase2'),
    phase3: document.getElementById('phase3'),

    // Navigation buttons
    nextToPhase2: document.getElementById('nextToPhase2'),
    nextToPhase3: document.getElementById('nextToPhase3'),
    backToPhase1: document.getElementById('backToPhase1'),
    backToPhase2: document.getElementById('backToPhase2'),
    finalizeBtn: document.getElementById('finalizeBtn')
};

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
    return `₹${price.toLocaleString('en-IN')}`;
}

function updateTotalPrice() {
    let total = state.brandPrice;

    // Add graphics prices
    state.graphics.forEach(graphic => {
        total += graphic.price;
    });

    // Add text price if text is entered
    if (state.customText.trim().length > 0) {
        total += 300;
    }

    state.totalPrice = total;

    // Animate price update
    elements.totalPrice.classList.add('animate');
    elements.totalPrice.textContent = formatPrice(total);

    setTimeout(() => {
        elements.totalPrice.classList.remove('animate');
    }, 500);
}

function updatePreview() {
    // Update jacket color and image
    if (state.color && state.brand) {
        elements.jacketBase.className = `jacket-base ${state.color}`;

        // Try to load actual denim image
        const brandLower = state.brand.toLowerCase();
        const imagePath = `assets/denim/${brandLower}-${state.color}.jpg`;

        // Set background image - will fall back to CSS gradient if image doesn't exist
        elements.jacketBase.style.backgroundImage = `url('${imagePath}')`;
    } else if (state.color) {
        elements.jacketBase.className = `jacket-base ${state.color}`;
        elements.jacketBase.style.backgroundImage = '';
    }

    // Update graphics
    elements.graphicsLayer.innerHTML = '';
    state.graphics.forEach(graphic => {
        const graphicEl = document.createElement('div');
        graphicEl.className = 'graphic-item';
        graphicEl.textContent = graphic.icon;
        elements.graphicsLayer.appendChild(graphicEl);
    });

    // Update text
    if (state.customText.trim().length > 0) {
        elements.textLayer.textContent = state.customText;
        elements.textLayer.style.display = 'block';

        // Apply font style
        if (state.font === 'graffiti') {
            elements.textLayer.style.fontFamily = "'Righteous', cursive";
        } else if (state.font === 'script') {
            elements.textLayer.style.fontFamily = "cursive";
            elements.textLayer.style.fontStyle = "italic";
        } else if (state.font === 'block') {
            elements.textLayer.style.fontFamily = "'Poppins', sans-serif";
            elements.textLayer.style.fontWeight = "800";
        }
    } else {
        elements.textLayer.style.display = 'none';
    }

    updateSummary();
}

function updateSummary() {
    let summaryHTML = '';

    if (!state.brand && !state.color) {
        summaryHTML = '<p class="summary-prompt">Start by selecting your canvas</p>';
    } else {
        summaryHTML = '<ul class="summary-list">';

        if (state.brand) {
            summaryHTML += `<li><span>Base: ${state.brand}</span><span>${formatPrice(state.brandPrice)}</span></li>`;
        }

        if (state.color) {
            const colorNames = {
                light: 'Light Wash',
                dark: 'Dark Wash',
                black: 'Black',
                ombre: 'Custom Ombre'
            };
            summaryHTML += `<li><span>Color: ${colorNames[state.color]}</span></li>`;
        }

        state.graphics.forEach(graphic => {
            summaryHTML += `<li><span>${graphic.name}</span><span>${formatPrice(graphic.price)}</span></li>`;
        });

        if (state.customText.trim().length > 0) {
            summaryHTML += `<li><span>Text: "${state.customText}"</span><span>₹300</span></li>`;
        }

        summaryHTML += '</ul>';
    }

    elements.previewSummary.innerHTML = summaryHTML;
}

function navigateToPhase(phaseNumber) {
    // Hide all phases
    elements.phase1.classList.remove('active');
    elements.phase2.classList.remove('active');
    elements.phase3.classList.remove('active');

    // Show target phase
    if (phaseNumber === 1) {
        elements.phase1.classList.add('active');
    } else if (phaseNumber === 2) {
        elements.phase2.classList.add('active');
    } else if (phaseNumber === 3) {
        elements.phase3.classList.add('active');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== PHASE 1: BRAND & COLOR SELECTION =====
document.querySelectorAll('.brand-tab').forEach(card => {
    card.addEventListener('click', function () {
        // Remove previous selection
        document.querySelectorAll('.brand-tab').forEach(c => c.classList.remove('selected'));

        // Add selection to clicked card
        this.classList.add('selected');

        // Update state
        state.brand = this.dataset.brand.charAt(0).toUpperCase() + this.dataset.brand.slice(1);
        state.brandPrice = parseInt(this.dataset.price);

        // Update UI
        updateTotalPrice();
        updatePreview();
        checkPhase1Complete();
    });
});

document.querySelectorAll('.color-circle').forEach(card => {
    card.addEventListener('click', function () {
        // Remove previous selection
        document.querySelectorAll('.color-circle').forEach(c => c.classList.remove('selected'));

        // Add selection to clicked card
        this.classList.add('selected');

        // Update state
        state.color = this.dataset.color;

        // Update UI
        updatePreview();
        checkPhase1Complete();
    });
});

// Size selection
document.querySelectorAll('.size-circle').forEach(circle => {
    circle.addEventListener('click', function () {
        document.querySelectorAll('.size-circle').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');

        state.size = this.dataset.size.toUpperCase();
        checkPhase1Complete();
    });
});

function checkPhase1Complete() {
    if (state.brand && state.color) {
        elements.nextToPhase2.disabled = false;
    } else {
        elements.nextToPhase2.disabled = true;
    }
}

elements.nextToPhase2.addEventListener('click', () => {
    navigateToPhase(2);
});

// ===== PHASE 2: GRAPHICS SELECTION =====
const graphicData = {
    ace: { name: 'The Ace of Spades', icon: '🂡', price: 800 },
    lightning: { name: 'Lightning McQueen', icon: '⚡', price: 1200 },
    karan: { name: 'Karan Aujla Silhouette', icon: '🎤', price: 1500 },
    sunflower: { name: 'Sunflowers', icon: '🌻', price: 600 }
};

document.querySelectorAll('.graphic-card').forEach(card => {
    card.addEventListener('click', function () {
        const graphicId = this.dataset.graphic;
        const graphicInfo = graphicData[graphicId];

        // Check if this card is already selected
        const isCurrentlySelected = this.classList.contains('selected');

        // Remove selection from all cards
        document.querySelectorAll('.graphic-card').forEach(c => c.classList.remove('selected'));

        // If it wasn't selected before, select it now (toggle behavior)
        if (!isCurrentlySelected) {
            this.classList.add('selected');
            // Replace the graphics array with just this one graphic
            state.graphics = [{
                id: graphicId,
                name: graphicInfo.name,
                icon: graphicInfo.icon,
                price: graphicInfo.price
            }];
        } else {
            // If it was selected, deselect it (clear graphics)
            state.graphics = [];
        }

        // Update UI
        updateTotalPrice();
        updatePreview();
    });
});

elements.backToPhase1.addEventListener('click', () => {
    navigateToPhase(1);
});

elements.nextToPhase3.addEventListener('click', () => {
    navigateToPhase(3);
});

// ===== PHASE 3: CUSTOM TEXT =====
elements.customTextInput.addEventListener('input', function () {
    state.customText = this.value;
    updateTotalPrice();
    updatePreview();
});

document.querySelectorAll('.font-card').forEach(card => {
    card.addEventListener('click', function () {
        // Remove previous selection
        document.querySelectorAll('.font-card').forEach(c => c.classList.remove('selected'));

        // Add selection to clicked card
        this.classList.add('selected');

        // Update state
        state.font = this.dataset.font;

        // Update preview
        updatePreview();
    });
});

elements.backToPhase2.addEventListener('click', () => {
    navigateToPhase(2);
});

// ===== FINALIZE & WHATSAPP INTEGRATION =====
elements.finalizeBtn.addEventListener('click', () => {
    // Generate WhatsApp message
    let message = "Hi So Hatke! I just designed a custom jacket:\n\n";

    // Add brand and color
    const colorNames = {
        light: 'Light Wash',
        dark: 'Dark Wash',
        black: 'Black',
        ombre: 'Custom Ombre'
    };
    message += `Base: ${state.brand} (${colorNames[state.color]})\n`;

    // Add graphics
    if (state.graphics.length > 0) {
        message += `Art: ${state.graphics.map(g => g.name).join(' + ')}\n`;
    }

    // Add text
    if (state.customText.trim().length > 0) {
        message += `Text: "${state.customText}" (${state.font} font)\n`;
    }

    // Add total
    message += `\nTotal Estimate: ${formatPrice(state.totalPrice)}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Replace with your actual WhatsApp business number
    // Format: country code + number (no + or spaces)
    const whatsappNumber = '918196949280'; // Replace with your number

    // Open WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
});

// ===== INITIALIZATION =====
function init() {
    // Set default font selection
    document.querySelector('.font-card[data-font="graffiti"]').classList.add('selected');

    // Initial UI update
    updatePreview();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
