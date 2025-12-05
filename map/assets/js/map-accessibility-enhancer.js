// ================================
// MAP ACCESSIBILITY ENHANCER
// ================================
// This script enhances the map markers with proper ARIA labels
// and accessibility features for screen readers

console.log("map-accessibility-enhancer.js loaded");

/**
 * ARIA Labels per ogni pannello - descrizioni complete per screen reader
 */
const panelAriaLabels = {
    panel0: "Pannello 0: L'Umbria in classe - Introduzione al progetto storico educativo della Fondazione Sant'Anna",
    panel1: "Pannello 1: La scuola in camicia nera - Storia dell'educazione durante il periodo fascista",
    panel2: "Pannello 2: La foto di classe - Documenti fotografici storici delle classi scolastiche",
    panel3: "Pannello 3: La radio a scuola - L'utilizzo della radio come strumento educativo",
    panel4: "Pannello 4: Radici di futuro - Connessione tra passato educativo e futuro",
    panel5: "Pannello 5: Le scuole rurali - L'istruzione nelle zone rurali dell'Umbria",
    panel6: "Pannello 6: Le scuole per contadini - Programmi educativi specifici per il mondo agricolo",
    panel7: "Pannello 7: Istruzione tecnica - Sviluppo dell'educazione tecnica e professionale",
    panel8: "Pannello 8: Il museo della scuola - Collezione storica di materiali scolastici",
    panel9: "Pannello 9: La scoperta dell'infanzia - Evoluzione della pedagogia infantile",
    panel10: "Pannello 10: Il sistema dei licei - Storia e sviluppo del sistema liceale",
    panel11: "Pannello 11: Il viaggio continua - Conclusione del percorso educativo storico",
    panelSma: "Pannello Smascherati: Mostra speciale sulla rimozione delle maschere storiche"
};

/**
 * Aggiungi ARIA labels ai marker properties nello store
 */
const enhanceStoresWithAriaLabels = () => {
    if (typeof stores === 'undefined' || !stores.features) {
        console.warn('Stores object not found');
        return;
    }
    
    stores.features.forEach(feature => {
        const markerType = feature.properties.markerType;
        const address = feature.properties.address_it;
        
        // Aggiungi aria label se non esiste
        if (!feature.properties.ariaLabel && markerType) {
            feature.properties.ariaLabel = panelAriaLabels[markerType] || 
                `Pannello: ${address}`;
        }
        
        // Aggiungi ID univoco se non esiste
        if (!feature.properties.id) {
            feature.properties.id = markerType || `marker-${Date.now()}-${Math.random()}`;
        }
    });
    
    console.log('Stores enhanced with ARIA labels');
};

/**
 * Funzione originale addMarkers modificata per includere accessibilità
 */
const enhanceAddMarkers = (originalAddMarkers) => {
    return function() {
        // Chiama la funzione originale
        if (typeof originalAddMarkers === 'function') {
            originalAddMarkers();
        }
        
        // Aggiungi accessibilità ai marker dopo che sono stati creati
        setTimeout(() => {
            enhanceAllMarkers();
        }, 500);
    };
};

/**
 * Migliora tutti i marker esistenti con accessibilità
 */
const enhanceAllMarkers = () => {
    // Trova tutti gli elementi marker sulla mappa
    const markerElements = document.querySelectorAll('.mapboxgl-marker');
    
    markerElements.forEach((markerEl, index) => {
        // Aggiungi attributi di accessibilità
        markerEl.setAttribute('role', 'button');
        markerEl.setAttribute('tabindex', '0');
        
        // Cerca di trovare il marker type dal class name o dall'ID
        const markerClasses = Array.from(markerEl.classList);
        let markerType = null;
        let ariaLabel = '';
        
        // Estrai il tipo di marker dalle classi
        markerClasses.forEach(className => {
            if (className.startsWith('marker-panel') || className.includes('panel')) {
                markerType = className.replace('marker-', '');
            }
        });
        
        // Se non troviamo il tipo dalle classi, usiamo l'ID
        if (!markerType && markerEl.id) {
            markerType = markerEl.id.replace('marker-', '');
        }
        
        // Imposta l'ARIA label appropriato
        if (markerType && panelAriaLabels[markerType]) {
            ariaLabel = panelAriaLabels[markerType];
        } else {
            // Fallback generico
            ariaLabel = `Marcatore ${index + 1} sulla mappa. Premi Invio o Spazio per visualizzare i dettagli.`;
        }
        
        markerEl.setAttribute('aria-label', ariaLabel);
        
        // Aggiungi supporto tastiera se non esiste già
        if (!markerEl.dataset.keyboardEnabled) {
            markerEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    markerEl.click();
                    
                    // Annuncia apertura dettagli
                    if (typeof srAnnounce === 'function') {
                        srAnnounce('Apertura dettagli pannello');
                    }
                }
            });
            markerEl.dataset.keyboardEnabled = 'true';
        }
        
        // Aggiungi evento focus per annunciare
        markerEl.addEventListener('focus', () => {
            if (typeof srAnnounce === 'function') {
                srAnnounce(`Focalizzato su: ${ariaLabel}`);
            }
        });
    });
    
    console.log(`Enhanced ${markerElements.length} markers with accessibility features`);
};

/**
 * Monitora l'aggiunta di nuovi marker con MutationObserver
 */
const observeNewMarkers = () => {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && 
                    (node.classList.contains('mapboxgl-marker') || 
                     node.querySelector('.mapboxgl-marker'))) {
                    
                    // Aspetta che il marker sia completamente renderizzato
                    setTimeout(() => {
                        enhanceAllMarkers();
                    }, 100);
                }
            });
        });
    });
    
    observer.observe(mapElement, {
        childList: true,
        subtree: true
    });
    
    console.log('MutationObserver set up for new markers');
};

/**
 * Migliora la funzione buildLocationList originale
 */
const enhanceBuildLocationList = () => {
    // Salva riferimento alla funzione originale
    const originalBuildLocationList = window.buildLocationList;
    
    if (typeof originalBuildLocationList !== 'function') {
        console.warn('buildLocationList not found');
        return;
    }
    
    // Override con versione migliorata
    window.buildLocationList = function(data) {
        // Chiama la funzione originale
        originalBuildLocationList(data);
        
        // Migliora i link della sidebar con descrizioni più dettagliate
        setTimeout(() => {
            const listingLinks = document.querySelectorAll('#listings .item a');
            
            listingLinks.forEach((link, index) => {
                const linkId = link.id;
                const markerType = linkId.replace('link-', '');
                
                // Aggiungi ARIA label descrittivo
                if (panelAriaLabels[markerType]) {
                    const currentText = link.textContent.trim();
                    link.setAttribute('aria-label', 
                        `${currentText} - ${panelAriaLabels[markerType]}. Elemento ${index + 1} di ${listingLinks.length}`
                    );
                } else {
                    link.setAttribute('aria-label', 
                        `${link.textContent.trim()}. Elemento ${index + 1} di ${listingLinks.length}. Premi Invio per visualizzare sulla mappa.`
                    );
                }
                
                // Aggiungi descrizione per screen reader
                link.setAttribute('aria-describedby', 'sidebar-help');
            });
            
            // Aggiungi testo di aiuto nascosto per screen reader
            if (!document.getElementById('sidebar-help')) {
                const helpText = document.createElement('div');
                helpText.id = 'sidebar-help';
                helpText.className = 'sr-only';
                helpText.textContent = 'Usa le frecce su e giù per navigare tra i pannelli, Invio per selezionare';
                document.getElementById('sidebar').appendChild(helpText);
            }
            
            console.log(`Enhanced ${listingLinks.length} sidebar links`);
        }, 100);
    };
};

/**
 * Migliora la funzione showInfoCard con trap focus
 */
const enhanceShowInfoCard = () => {
    const originalShowInfoCard = window.showInfoCard;
    
    if (typeof originalShowInfoCard !== 'function') {
        console.warn('showInfoCard not found');
        return;
    }
    
    window.showInfoCard = function(...args) {
        // Chiama la funzione originale
        originalShowInfoCard.apply(this, args);
        
        // Aggiungi trap focus dopo apertura
        setTimeout(() => {
            const infoCard = document.getElementById('info-card-layer');
            if (infoCard && !infoCard.hasAttribute('hidden')) {
                // Attiva trap focus
                if (typeof trapFocus === 'function') {
                    const removeTrap = trapFocus(infoCard);
                    
                    // Salva la funzione di rimozione per cleanup
                    infoCard.dataset.removeTrap = 'active';
                }
                
                // Focus sul titolo della card
                const cardTitle = document.getElementById('card-title');
                if (cardTitle && typeof focusElement === 'function') {
                    focusElement(cardTitle);
                }
                
                // Annuncia apertura
                if (typeof srAnnounce === 'function') {
                    const title = cardTitle ? cardTitle.textContent : 'Dettagli pannello';
                    srAnnounce(`Aperti dettagli: ${title}. Premi Escape per chiudere.`, 'assertive');
                }
            }
        }, 100);
    };
};

/**
 * Migliora la funzione applyFilters con annunci
 */
const enhanceApplyFilters = () => {
    const originalApplyFilters = window.applyFilters;
    
    if (typeof originalApplyFilters !== 'function') {
        console.warn('applyFilters not found');
        return;
    }
    
    window.applyFilters = function(selectedType) {
        // Chiama la funzione originale
        const result = originalApplyFilters(selectedType);
        
        // Conta i risultati visibili dopo il filtro
        setTimeout(() => {
            const visibleMarkers = document.querySelectorAll('.mapboxgl-marker[style*="display: inline"], .mapboxgl-marker:not([style*="display: none"])').length;
            const visibleListings = document.querySelectorAll('#listings .item').length;
            
            // Annuncia il cambio filtro
            if (typeof announceFilterChange === 'function') {
                announceFilterChange(selectedType, visibleListings || visibleMarkers);
            } else if (typeof srAnnounce === 'function') {
                srAnnounce(`Filtro applicato. Visualizzati ${visibleListings || visibleMarkers} elementi.`);
            }
        }, 200);
        
        return result;
    };
};

/**
 * Inizializza tutti i miglioramenti di accessibilità per la mappa
 */
const initializeMapAccessibility = () => {
    console.log('Initializing map accessibility enhancements...');
    
    // Migliora lo store con ARIA labels
    enhanceStoresWithAriaLabels();
    
    // Monitora nuovi marker
    observeNewMarkers();
    
    // Migliora le funzioni esistenti
    enhanceBuildLocationList();
    enhanceShowInfoCard();
    enhanceApplyFilters();
    
    // Migliora i marker esistenti dopo un breve delay
    setTimeout(() => {
        enhanceAllMarkers();
    }, 1000);
    
    // Aggiungi controlli tastiera personalizzati per la mappa
    addMapKeyboardShortcuts();
    
    console.log('Map accessibility enhancements initialized');
};

/**
 * Aggiungi scorciatoie tastiera per la mappa
 */
const addMapKeyboardShortcuts = () => {
    document.addEventListener('keydown', (e) => {
        // Solo se un elemento della mappa è focale
        const mapElement = document.getElementById('map');
        if (!mapElement || !mapElement.contains(document.activeElement)) {
            return;
        }
        
        // Ctrl/Cmd + Plus/Minus per zoom
        if ((e.ctrlKey || e.metaKey) && e.key === '+') {
            e.preventDefault();
            if (typeof map !== 'undefined') {
                map.zoomIn();
                if (typeof srAnnounce === 'function') {
                    srAnnounce('Zoom avanti');
                }
            }
        }
        
        if ((e.ctrlKey || e.metaKey) && e.key === '-') {
            e.preventDefault();
            if (typeof map !== 'undefined') {
                map.zoomOut();
                if (typeof srAnnounce === 'function') {
                    srAnnounce('Zoom indietro');
                }
            }
        }
        
        // H per help
        if (e.key === 'h' || e.key === 'H' || e.key === '?') {
            showKeyboardHelp();
        }
    });
};

/**
 * Mostra aiuto tastiera
 */
const showKeyboardHelp = () => {
    const helpMessage = `
        Scorciatoie tastiera:
        - Frecce: Naviga tra i marker
        - Invio/Spazio: Apri dettagli marker
        - Escape: Chiudi dettagli
        - Ctrl +/-: Zoom
        - Tab: Naviga tra elementi
        - H o ?: Mostra questo aiuto
    `;
    
    if (typeof srAnnounce === 'function') {
        srAnnounce(helpMessage, 'polite');
    } else {
        alert(helpMessage);
    }
};

// Inizializza quando il DOM è pronto e la mappa è caricata
const waitForMapLoad = () => {
    if (typeof map !== 'undefined' && map.loaded()) {
        initializeMapAccessibility();
    } else {
        if (typeof map !== 'undefined') {
            map.on('load', initializeMapAccessibility);
        } else {
            // Riprova dopo un delay
            setTimeout(waitForMapLoad, 500);
        }
    }
};

// Avvia quando il documento è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForMapLoad);
} else {
    waitForMapLoad();
}

// Export per debug
window.enhanceAllMarkers = enhanceAllMarkers;
window.panelAriaLabels = panelAriaLabels;
