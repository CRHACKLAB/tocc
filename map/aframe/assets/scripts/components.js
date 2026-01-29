AFRAME.registerComponent('show-slides', {
    schema: {
        src: {type: 'string'},
        steps: {type: 'array'},
        index: {type: 'int', default: 0},
        items: {type: 'int', default: 2}
    },
    events: {
        click: function () {
            console.log('I have been clicked! ' + this.data.src);
            // Local variables
            var slider = document.querySelector('#slides');
            var slide = slider.querySelector('#slide');
            var objects = document.querySelector('#hotspots');
            var skybox = document.querySelector('#skybox');
            var nextbut = document.querySelector('#nextbut');
            var previousbut = document.querySelector('#previousbut');
            //var index = this.data.index % this.data.steps.length;
            // Shows the slides for the selected hotspot and hides the other hotspots
            objects.setAttribute('visible', false);
            skybox.setAttribute('material', 'transparent: true; opacity: 0.4;');
            slider.removeAttribute('class'); //Removes the 'hidden' class and makes it visible
            slide.setAttribute('style', 'background: url(' + this.data.src + ') ' + this.data.steps[0] +'% 0; background-repeat: no-repeat; background-size: cover;') // Sets the HTML object to show the cover slide
            // Sets the navigation buttons
            nextbut.setAttribute('onclick', 'nextSlide([' + this.data.steps + '],' + this.data.items + ')');
            previousbut.setAttribute('onclick', 'nextSlide([' + this.data.steps + '],' + this.data.items + ')');
        }
    },
    init: function () {
        var el = this.el;
        console.log('show-slides is on - 002');
        
    },
    remove: function () {
        var el = this.el;
    }
});

AFRAME.registerComponent('show-info', {
    schema: {
        href: {type: 'string'}
    },
    events: {
        click: function () {
            window.location.href = this.data.href;
        }
    },
    init: function () {
        var el = this.el;
        
    },
    remove: function () {
        var el = this.el;
    }
});

AFRAME.registerComponent('video-overlay', {
    schema: {
        src: { type: 'selector' }
    },
    
    init: function () {
        console.log('=== VIDEO OVERLAY COMPONENT INIT ===');
        const el = this.el;
        const data = this.data;
        
        console.log('Element:', el);
        console.log('Data src:', data.src);
        
        // prendo gli elementi HTML dell'overlay
        const overlay = document.getElementById('videoOverlay');
        const overlayVideo = document.getElementById('overlayVideo');
        const closeBtn = document.getElementById('closeVideoBtn');
        
        console.log('Overlay found:', overlay);
        console.log('OverlayVideo found:', overlayVideo);
        console.log('CloseBtn found:', closeBtn);
        
        // Creo un loader se non esiste già
        let loader = document.getElementById('videoLoader');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'videoLoader';
            loader.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-size: 1.5rem;
                display: none;
                z-index: 10000;
            `;
            loader.innerHTML = `
                <div style="text-align: center;">
                    <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 0 auto 10px;"></div>
                    <div>Caricamento video...</div>
                </div>
            `;
            overlay.appendChild(loader);
            
            // Aggiungo l'animazione CSS per lo spinner
            if (!document.getElementById('spinnerStyle')) {
                const style = document.createElement('style');
                style.id = 'spinnerStyle';
                style.textContent = `
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
        
        // funzione per mostrare il loader
        const showLoader = () => {
            loader.style.display = 'block';
            overlayVideo.style.opacity = '0';
        };
        
        // funzione per nascondere il loader
        const hideLoader = () => {
            loader.style.display = 'none';
            overlayVideo.style.opacity = '1';
        };
        
        // chiudi overlay
        const closeOverlay = () => {
            overlay.style.display = 'none';
            overlayVideo.pause();
            overlayVideo.currentTime = 0;
            overlayVideo.removeAttribute('src');
            overlayVideo.load();
            hideLoader();
        };
        
        // evento click sull'entity 3D
        el.addEventListener('click', () => {
            console.log('=== CLICK DETECTED ===');
            const videoEl = data.src;
            console.log('Video element from data.src:', videoEl);
            
            if (!videoEl) {
                console.warn('No video src found for overlay');
                alert('Errore: video non trovato');
                return;
            }
            
            // mostra overlay e loader
            console.log('Showing overlay...');
            overlay.style.display = 'flex';
            showLoader();
            
            // usa la stessa sorgente del video negli assets
            const src = videoEl.getAttribute('src');
            console.log('Video src attribute:', src);
            console.log('Video element tag:', videoEl.tagName);
            console.log('Video element id:', videoEl.id);
            console.log('Full video element HTML:', videoEl.outerHTML);
            
            // Prova a risolvere il percorso assoluto
            try {
                const absoluteSrc = new URL(src, window.location.href).href;
                console.log('Absolute URL would be:', absoluteSrc);
            } catch(e) {
                console.error('Error creating absolute URL:', e);
            }
            
            console.log('Setting src to overlayVideo...');
            // Imposta il src e inizia il caricamento
            overlayVideo.setAttribute('src', src);
            console.log('overlayVideo.src is now:', overlayVideo.src);
            overlayVideo.muted = false;
            console.log('Calling load()...');
            overlayVideo.load();
            console.log('Load called');
        });
        
        // Quando il video può essere riprodotto
        overlayVideo.addEventListener('canplay', () => {
            console.log('>>> VIDEO EVENT: canplay');
            hideLoader();
            overlayVideo.play().catch(err => {
                console.error('>>> Error playing video:', err);
                alert('Errore nella riproduzione del video');
            });
        });
        
        // Quando il video è completamente caricato
        overlayVideo.addEventListener('loadeddata', () => {
            console.log('>>> VIDEO EVENT: loadeddata');
        });
        
        // Quando inizia a caricare
        overlayVideo.addEventListener('loadstart', () => {
            console.log('>>> VIDEO EVENT: loadstart');
        });
        
        // Progresso del caricamento
        overlayVideo.addEventListener('progress', () => {
            console.log('>>> VIDEO EVENT: progress');
        });
        
        // Gestione errori
        overlayVideo.addEventListener('error', (e) => {
            console.error('>>> VIDEO EVENT: error');
            console.error('>>> Error event:', e);
            console.error('>>> Attempted to load:', overlayVideo.src);
            console.error('>>> Error code:', overlayVideo.error ? overlayVideo.error.code : 'unknown');
            console.error('>>> Error message:', overlayVideo.error ? overlayVideo.error.message : 'unknown');
            
            let errorMsg = 'Errore sconosciuto';
            if (overlayVideo.error) {
                switch(overlayVideo.error.code) {
                    case 1: errorMsg = 'MEDIA_ERR_ABORTED - Caricamento interrotto'; break;
                    case 2: errorMsg = 'MEDIA_ERR_NETWORK - Errore di rete'; break;
                    case 3: errorMsg = 'MEDIA_ERR_DECODE - Errore di decodifica'; break;
                    case 4: errorMsg = 'MEDIA_ERR_SRC_NOT_SUPPORTED - Formato non supportato o file non trovato'; break;
                }
            }
            console.error('>>> Error type:', errorMsg);
            
            hideLoader();
            alert('Errore nel caricamento del video.\nPercorso: ' + overlayVideo.src + '\nErrore: ' + errorMsg + '\n\nApri la console (F12) per più dettagli.');
        });
        
        // Se il video inizia a bufferizzare durante la riproduzione
        overlayVideo.addEventListener('waiting', () => {
            console.log('>>> VIDEO EVENT: waiting (buffering)');
            showLoader();
        });
        
        // Quando il video riprende dopo il buffering
        overlayVideo.addEventListener('playing', () => {
            console.log('>>> VIDEO EVENT: playing');
            hideLoader();
        });
        
        // pulsante chiudi
        closeBtn.addEventListener('click', closeOverlay);
        
        // Chiudi anche premendo ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.style.display === 'flex') {
                closeOverlay();
            }
        });
    }
});

AFRAME.registerComponent('link-to', {
    schema: {
        href: {type: 'string'}
    },
    init: function () {
        this.el.addEventListener('click', () => {
            window.location.href = this.data.href;
        });
    }
});

AFRAME.registerComponent('portal-link', {
    schema: {
        href: {type: 'string'}
    },
    init: function () {
        this.el.addEventListener('click', () => {
            window.location.href = this.data.href;
        });
    }
});

// Script per aggiungere l'effetto glow agli elementi al centro del carosello
AFRAME.registerComponent('center-glow', {
    init: function() {
        this.camera = null;
        this.allPanels = [];
        this.isReady = false;
        this.currentGlowingPanel = null;
        this.lastCheckTime = 0;
        this.checkInterval = 200; // Controlla solo ogni 200ms (5 volte al secondo)
        
        const scene = this.el;
        const self = this;
        
        scene.addEventListener('loaded', function() {
            setTimeout(function() {
                self.camera = document.querySelector('#cam');
                // Seleziona solo i pannelli .interactable che NON sono a-circle (portali)
                const allInteractables = Array.from(document.querySelectorAll('.interactable'));
                self.allPanels = allInteractables.filter(el => el.tagName.toLowerCase() !== 'a-circle');
                self.isReady = true;
            }, 500);
        });
    },
    
    tick: function(time) {
        // Esegui solo ogni 200ms
        if (time - this.lastCheckTime < this.checkInterval) {
            return;
        }
        this.lastCheckTime = time;
        
        if (!this.isReady || !this.camera || !this.allPanels.length) {
            return;
        }
        
        const cameraObj = this.camera.object3D;
        if (!cameraObj) return;
        
        // Calcola direzione camera (riusa oggetti invece di crearli)
        const cameraDirection = new THREE.Vector3(0, 0, -1);
        cameraDirection.applyQuaternion(cameraObj.quaternion);
        
        let closestPanel = null;
        let minAngle = Infinity;
        
        // Loop ottimizzato - trova pannello più vicino al centro
        const threshold = 0.3; // 17 gradi
        for (let i = 0; i < this.allPanels.length; i++) {
            const panel = this.allPanels[i];
            if (!panel.object3D) continue;
            
            // Calcola angolo
            const toPanel = new THREE.Vector3();
            toPanel.subVectors(panel.object3D.position, cameraObj.position).normalize();
            const angle = cameraDirection.angleTo(toPanel);
            
            if (angle < minAngle && angle < threshold) {
                minAngle = angle;
                closestPanel = panel;
            }
        }
        
        // Cambia glow solo se necessario
        if (closestPanel !== this.currentGlowingPanel) {
            if (this.currentGlowingPanel) {
                this.removeGlow(this.currentGlowingPanel);
            }
            if (closestPanel) {
                this.addGlow(closestPanel);
            }
            this.currentGlowingPanel = closestPanel;
        }
    },
    
    addGlow: function(panel) {
        const mat = panel.getAttribute('material') || {};
        
        // Salva originale solo una volta
        if (!panel.dataset.originalEmissive) {
            panel.dataset.originalEmissive = mat.emissive || '#000000';
            panel.dataset.originalIntensity = mat.emissiveIntensity || 0;
        }
        
        // Applica glow
        panel.setAttribute('material', 'emissive', '#FFD700');
        panel.setAttribute('material', 'emissiveIntensity', 0.6);
        
        // Animazione
        panel.setAttribute('animation__glow', {
            property: 'material.emissiveIntensity',
            from: 0.4,
            to: 0.9,
            dur: 1000,
            dir: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
    },
    
    removeGlow: function(panel) {
        panel.removeAttribute('animation__glow');
        
        // Ripristina valori originali
        if (panel.dataset.originalEmissive) {
            panel.setAttribute('material', 'emissive', panel.dataset.originalEmissive);
            panel.setAttribute('material', 'emissiveIntensity', panel.dataset.originalIntensity);
        }
    }
});

AFRAME.registerComponent('button-hover', {
    schema: {
        normalColor: {type: 'color', default: '#ffffff'},
        hoverColor: {type: 'color', default: '#FFD700'}
    },
    init: function() {
        const el = this.el;
        
        el.addEventListener('mouseenter', () => {
            el.setAttribute('material', 'color', this.data.hoverColor);
            el.setAttribute('material', 'opacity', '0.8');
        });
        
        el.addEventListener('mouseleave', () => {
            el.setAttribute('material', 'color', this.data.normalColor);
            el.setAttribute('material', 'opacity', '0');
        });
    }
});

AFRAME.registerComponent('rounded-rectangle', {
    schema: {
        width: {type: 'number', default: 0.4},
        height: {type: 'number', default: 0.2},
        radius: {type: 'number', default: 0.1}
    },
    init: function() {
        const data = this.data;
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        // Calcola il raggio in pixel
        const radiusPixels = (data.radius / data.width) * canvas.width;
        
        // Funzione per disegnare rettangolo con bordi arrotondati
        function roundRect(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            ctx.fill();
        }
        
        // Disegna il rettangolo arrotondato bianco
        ctx.fillStyle = 'white';
        roundRect(ctx, 0, 0, canvas.width, canvas.height, radiusPixels);
        
        // Applica la texture al materiale
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        this.el.setAttribute('material', 'src', texture);
        this.el.setAttribute('material', 'transparent', true);
    }
});