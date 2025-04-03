/**
 * Blood Pressure Classification Logic
 * Based on American Heart Association guidelines
 */
function classifyBP(sys, dia) {
    if (sys >= 180 || dia >= 120) {
        return {
            category: "Hypertensive Crisis",
            color: "bg-red-700",
            advice: "Seek emergency medical help immediately. This is a dangerous level of high blood pressure that can lead to organ damage."
        };
    } else if (sys >= 140 || dia >= 90) {
        return {
            category: "High Blood Pressure (Stage 2)",
            color: "bg-red-500",
            advice: "Consult your doctor as soon as possible. You may need medication and lifestyle changes to manage your blood pressure."
        };
    } else if (sys >= 130 || dia >= 80) {
        return {
            category: "High Blood Pressure (Stage 1)",
            color: "bg-orange-500",
            advice: "Discuss with your doctor. Lifestyle changes like diet and exercise may help lower your blood pressure."
        };
    } else if (sys >= 120) {
        return {
            category: "Elevated Blood Pressure",
            color: "bg-yellow-500",
            advice: "Your blood pressure is higher than normal. Consider lifestyle changes to prevent developing high blood pressure."
        };
    } else if (sys < 90 || dia < 60) {
        return {
            category: "Low Blood Pressure",
            color: "bg-blue-500",
            advice: "If you experience dizziness or fainting, consult your doctor. Otherwise, low blood pressure is generally not a concern."
        };
    } else {
        return {
            category: "Normal Blood Pressure",
            color: "bg-green-500",
            advice: "Your blood pressure is within the normal range. Maintain healthy habits to keep it in this range."
        };
    }
}

/**
 * Save BP reading to history
 */
function saveBPHistory(sys, dia) {
    const { category } = classifyBP(sys, dia);
    const reading = {
        systolic: sys,
        diastolic: dia,
        timestamp: new Date().toISOString(),
        category: category
    };
    
    let history = JSON.parse(localStorage.getItem('bpHistory') || '[]');
    history.push(reading);
    localStorage.setItem('bpHistory', JSON.stringify(history));
}

/**
 * Get BP history sorted by most recent first
 */
function getBPHistory() {
    const history = JSON.parse(localStorage.getItem('bpHistory') || '[]');
    return history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

/**
 * Clear all BP history
 */
function clearBPHistory() {
    localStorage.removeItem('bpHistory');
}

/**
 * Format date for display
 */
function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

/**
 * Initialize accordion functionality
 */
function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const btn = accordion.querySelector('.accordion-btn');
        const icon = btn?.querySelector('i');
        
        btn?.addEventListener('click', () => {
            // Toggle active class on accordion
            accordion.classList.toggle('active');
            
            // Rotate icon if exists
            if (icon) {
                icon.classList.toggle('rotate-180');
            }
            
            // Close other accordions
            accordions.forEach(otherAccordion => {
                if (otherAccordion !== accordion && otherAccordion.classList.contains('active')) {
                    otherAccordion.classList.remove('active');
                    otherAccordion.querySelector('i')?.classList.remove('rotate-180');
                }
            });
        });
    });
}

/**
 * Get category styling for a BP reading
 */
function getCategoryClass(sys, dia) {
    if (sys >= 180 || dia >= 120) return 'category-crisis';
    if (sys >= 140 || dia >= 90) return 'category-stage2';
    if (sys >= 130 || dia >= 80) return 'category-stage1';
    if (sys >= 120) return 'category-elevated';
    if (sys < 90 || dia < 60) return 'category-low';
    return 'category-normal';
}

/**
 * Get category text for a BP reading
 */
function getCategoryText(sys, dia) {
    if (sys >= 180 || dia >= 120) return 'Crisis';
    if (sys >= 140 || dia >= 90) return 'Stage 2';
    if (sys >= 130 || dia >= 80) return 'Stage 1';
    if (sys >= 120) return 'Elevated';
    if (sys < 90 || dia < 60) return 'Low';
    return 'Normal';
}

// Initialize common functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize accordions if they exist on the page
    if (document.querySelector('.accordion')) {
        initAccordions();
    }
    
    // Add current year to footer if exists
    const footerYear = document.getElementById('footerYear');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});