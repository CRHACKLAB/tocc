// ================================
// ACCESSIBILITY HELPER FUNCTIONS
// ================================

console.log("accessibility.js loaded");

/**
 * Screen Reader Announcement System
 */
const srAnnounce = (message, priority = 'polite') => {
    const announcer = document.getElementById('sr-announcements');
    if (!announcer) return;
    
    // Clear previous announcement
    announcer.textContent = '';
    
    // Set priority
    announcer.setAttribute('aria-live', priority);
    
    // Add new announcement with slight delay to ensure it's read
    setTimeout(() => {
        announcer.textContent = message;
    }, 100);
    
    // Clear after 5 seconds
    setTimeout(() => {
        announcer.textContent = '';
    }, 5000);
};

/**
 * Focus Management
 */
const focusElement = (element) => {
    if (!element) return;
    
    // Make element focusable if not already
    if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
    }
    
    // Focus with smooth scroll
    element.focus({ preventScroll: false });
    
    // Remove tabindex if it was added
    setTimeout(() => {
        if (element.getAttribute('tabindex') === '-1') {
            element.removeAttribute('tabindex');
        }
    }, 1000);
};

/**
 * Trap focus within modal
 */
const trapFocus = (element) => {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    const handleTabKey = (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    };
    
    element.addEventListener('keydown', handleTabKey);
    
    // Return function to remove listener
    return () => element.removeEventListener('keydown', handleTabKey);
};

/**
 * Keyboard Navigation for Map
 */
const setupKeyboardNavigation = () => {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    let currentMarkerIndex = 0;
    let markers = [];
    
    const updateMarkers = () => {
        markers = Array.from(document.querySelectorAll('[class*="marker-"]')).filter(
            marker => marker.style.display !== 'none'
        );
    };
    
    const focusMarker = (index) => {
        if (markers.length === 0) return;
        
        index = Math.max(0, Math.min(index, markers.length - 1));
        currentMarkerIndex = index;
        
        const marker = markers[index];
        if (marker) {
            marker.click();
            const label = marker.getAttribute('aria-label') || 'Marcatore';
            srAnnounce(`Selezionato: ${label}. Marcatore ${index + 1} di ${markers.length}`);
        }
    };
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        // Only handle if map or sidebar is focused
        if (!mapElement.contains(document.activeElement) && 
            !document.getElementById('sidebar')?.contains(document.activeElement)) {
            return;
        }
        
        updateMarkers();
        
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                focusMarker(currentMarkerIndex + 1);
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                focusMarker(currentMarkerIndex - 1);
                break;
            case 'Home':
                e.preventDefault();
                focusMarker(0);
                break;
            case 'End':
                e.preventDefault();
                focusMarker(markers.length - 1);
                break;
            case 'Escape':
                e.preventDefault();
                closeInfoCard();
                break;
        }
    });
};

/**
 * Setup Keyboard Map Controls
 */
const setupMapControls = () => {
    const zoomIn = document.getElementById('zoom-in');
    const zoomOut = document.getElementById('zoom-out');
    const resetView = document.getElementById('reset-view');
    
    if (zoomIn && typeof map !== 'undefined') {
        zoomIn.addEventListener('click', () => {
            map.zoomIn();
            srAnnounce('Mappa ingrandita');
        });
    }
    
    if (zoomOut && typeof map !== 'undefined') {
        zoomOut.addEventListener('click', () => {
            map.zoomOut();
            srAnnounce('Mappa rimpicciolita');
        });
    }
    
    if (resetView && typeof map !== 'undefined') {
        resetView.addEventListener('click', () => {
            map.flyTo({
                center: [12.391299727701938, 43.10448380562507],
                zoom: 18.2
            });
            srAnnounce('Vista mappa ripristinata');
        });
    }
};

/**
 * Close Info Card Function
 */
const closeInfoCard = () => {
    const infoCard = document.getElementById('info-card-layer');
    const sidebar = document.getElementById('sidebar');
    const mapContainer = document.getElementById('map');
    
    if (infoCard) {
        infoCard.setAttribute('hidden', 'hidden');
        srAnnounce('Scheda informativa chiusa');
    }
    
    if (sidebar) sidebar.removeAttribute('hidden');
    if (mapContainer) mapContainer.removeAttribute('hidden');
    
    // Return focus to the trigger element if available
    const activeItem = document.querySelector('.listings .item.active a');
    if (activeItem) {
        focusElement(activeItem);
    }
};

/**
 * Setup Close Buttons
 */
const setupCloseButtons = () => {
    const closeButton = document.getElementById('close-card');
    const backButton = document.getElementById('back-to-map');
    
    if (closeButton) {
        closeButton.addEventListener('click', closeInfoCard);
    }
    
    if (backButton) {
        backButton.addEventListener('click', closeInfoCard);
    }
};

/**
 * Enhanced Filter Announcements
 */
const announceFilterChange = (filterValue, count) => {
    const filterNames = {
        'all': 'Tutti i pannelli',
        'panels012': "L'Umbria in classe",
        'panelSma': 'Mostra Smascherati'
    };
    
    const filterName = filterNames[filterValue] || filterValue;
    srAnnounce(`Filtro applicato: ${filterName}. Mostrati ${count} elementi.`);
};

/**
 * Make Markers Accessible
 */
const makeMarkersAccessible = () => {
    // This function will be called after markers are created
    // It adds proper ARIA labels and keyboard support to each marker
    
    const observeMarkers = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.classList) {
                    // Check if it's a marker
                    const classList = Array.from(node.classList);
                    if (classList.some(c => c.includes('marker'))) {
                        enhanceMarker(node);
                    }
                }
            });
        });
    });
    
    const mapElement = document.getElementById('map');
    if (mapElement) {
        observeMarkers.observe(mapElement, {
            childList: true,
            subtree: true
        });
    }
};

/**
 * Enhance Individual Marker
 */
const enhanceMarker = (markerElement) => {
    // Make marker keyboard accessible
    markerElement.setAttribute('tabindex', '0');
    markerElement.setAttribute('role', 'button');
    
    // Add keyboard event listener
    markerElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            markerElement.click();
        }
    });
    
    // Announce when marker receives focus
    markerElement.addEventListener('focus', () => {
        const label = markerElement.getAttribute('aria-label');
        if (label) {
            srAnnounce(`Marcatore: ${label}. Premi Invio per aprire i dettagli.`);
        }
    });
};

/**
 * Setup Sidebar Navigation
 */
const setupSidebarAccessibility = () => {
    const listings = document.getElementById('listings');
    if (!listings) return;
    
    // Observe changes to listings
    const observer = new MutationObserver(() => {
        const items = listings.querySelectorAll('.item a');
        items.forEach((item, index) => {
            // Enhance ARIA labels
            const text = item.textContent.trim();
            item.setAttribute('aria-label', `Pannello: ${text}. Elemento ${index + 1} di ${items.length}`);
            
            // Add enter key support
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    item.click();
                }
            });
        });
    });
    
    observer.observe(listings, {
        childList: true,
        subtree: true
    });
};

/**
 * Initialize All Accessibility Features
 */
const initializeAccessibility = () => {
    console.log('Initializing accessibility features...');
    
    // Setup keyboard navigation
    setupKeyboardNavigation();
    
    // Setup map controls
    setupMapControls();
    
    // Setup close buttons
    setupCloseButtons();
    
    // Make markers accessible
    makeMarkersAccessible();
    
    // Setup sidebar
    setupSidebarAccessibility();
    
    // Announce page load
    srAnnounce('Mappa interattiva L\'Umbria in Classe caricata. Usa i tasti freccia per navigare tra i marcatori, Invio per selezionare, Escape per chiudere i dettagli.');
    
    console.log('Accessibility features initialized');
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAccessibility);
} else {
    initializeAccessibility();
}

// Export functions for use in other scripts
window.srAnnounce = srAnnounce;
window.focusElement = focusElement;
window.trapFocus = trapFocus;
window.closeInfoCard = closeInfoCard;
window.announceFilterChange = announceFilterChange;
window.enhanceMarker = enhanceMarker;
