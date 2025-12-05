// ================================
// FIX: Sidebar Visibility & Keyboard Navigation
// ================================
// Questo script risolve il problema della sidebar nascosta all'inizio

console.log("sidebar-fix.js loaded");

/**
 * Mostra la sidebar all'inizio se non è già visibile
 */
const initializeSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const map = document.getElementById('map');
    
    if (!sidebar || !map) {
        console.warn('Sidebar or map not found');
        return;
    }
    
    // Mostra la sidebar all'avvio
    // sidebar.removeAttribute('hidden');
    
    console.log('Sidebar now visible');
};

/**
 * Aggiungi pulsante toggle per mostrare/nascondere sidebar
 */
const addSidebarToggle = () => {
    const map = document.getElementById('map');
    if (!map) return;
    
    // Crea pulsante toggle
    const toggleButton = document.createElement('button');
    toggleButton.id = 'sidebar-toggle';
    toggleButton.className = 'sidebar-toggle-btn';
    toggleButton.setAttribute('aria-label', 'Mostra/nascondi elenco pannelli');
    toggleButton.innerHTML = `
        <div style="width: 22px; height: 18px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="width: 100%; height: 3px; background: #333; border-radius: 2px;"></div>
            <div style="width: 100%; height: 3px; background: #333; border-radius: 2px;"></div>
            <div style="width: 100%; height: 3px; background: #333; border-radius: 2px;"></div>
        </div>
    `;
    
    // Aggiungi alla mappa
    map.appendChild(toggleButton);
    
    // Funzione toggle
    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;
        
        const isHidden = sidebar.hasAttribute('hidden');
        
        if (isHidden) {
            sidebar.removeAttribute('hidden');
            toggleButton.setAttribute('aria-label', 'Nascondi elenco pannelli');
            if (typeof srAnnounce === 'function') {
                srAnnounce('Elenco pannelli mostrato');
            }
        } else {
            sidebar.setAttribute('hidden', 'hidden');
            toggleButton.setAttribute('aria-label', 'Mostra elenco pannelli');
            if (typeof srAnnounce === 'function') {
                srAnnounce('Elenco pannelli nascosto');
            }
        }
    };
    
    // Event listeners
    toggleButton.addEventListener('click', toggleSidebar);
    toggleButton.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleSidebar();
        }
    });
    
    // Scorciatoia tastiera: Ctrl+B per toggle sidebar
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            toggleSidebar();
        }
    });
    
    console.log('Sidebar toggle button added (Ctrl+B to toggle)');
};

/**
 * Fix per elementi della sidebar che non rispondono a Enter
 */
const fixSidebarKeyboardNavigation = () => {
    // Aspetta che la sidebar sia popolata
    const checkSidebar = setInterval(() => {
        const listings = document.getElementById('listings');
        if (!listings || listings.children.length === 0) return;
        
        clearInterval(checkSidebar);
        
        // Aggiungi supporto tastiera a tutti i link
        const links = listings.querySelectorAll('a');
        links.forEach(link => {
            // Assicurati che tabindex sia impostato
            if (!link.hasAttribute('tabindex')) {
                link.setAttribute('tabindex', '0');
            }
            
            // Gestisci Enter e Space
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Triggera il click esistente
                    link.click();
                    
                    console.log('Enter pressed on:', link.textContent.trim());
                }
                
                if (e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Triggera il click esistente
                    link.click();
                    
                    console.log('Space pressed on:', link.textContent.trim());
                }
            });
        });
        
        console.log(`Fixed keyboard navigation for ${links.length} sidebar items`);
    }, 100);
    
    // Stop checking dopo 5 secondi
    setTimeout(() => clearInterval(checkSidebar), 5000);
};

/**
 * Aggiungi istruzioni visibili per utenti
 */
const addKeyboardInstructions = () => {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    // Crea div istruzioni
    const instructions = document.createElement('div');
    instructions.id = 'keyboard-instructions';
    instructions.className = 'keyboard-instructions';
    instructions.style.cssText = `
        padding: 12px;
        background: #e3f2fd;
        border-bottom: 2px solid #2196F3;
        font-size: 13px;
        line-height: 1.4;
    `;
    instructions.innerHTML = `
        <strong>⌨️ Navigazione:</strong><br>
        Tab: Naviga elementi | Enter: Apri pannello | Ctrl+B: Cambia vista (pannelli/mappa)
    `;
    
    // Inserisci all'inizio della sidebar
    const heading = sidebar.querySelector('.heading');
    if (heading && heading.nextSibling) {
        sidebar.insertBefore(instructions, heading.nextSibling);
    }
    
    console.log('Keyboard instructions added');
};

/**
 * Inizializza tutto
 */
const init = () => {
    console.log('Initializing sidebar fix...');
    
    // Mostra sidebar
    setTimeout(() => {
        initializeSidebar();
    }, 100);
    
    // Aggiungi toggle button
    setTimeout(() => {
        addSidebarToggle();
    }, 200);
    
    // Fix navigazione tastiera
    setTimeout(() => {
        fixSidebarKeyboardNavigation();
    }, 500);
    
    // Aggiungi istruzioni
    setTimeout(() => {
        addKeyboardInstructions();
    }, 300);
    
    console.log('Sidebar fix initialized');
};

// Avvia quando DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export per debug
window.toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.hasAttribute('hidden')) {
        sidebar.removeAttribute('hidden');
    } else {
        sidebar.setAttribute('hidden', 'hidden');
    }
};
