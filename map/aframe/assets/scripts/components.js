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
        const el = this.el;
        const data = this.data;
        
        // prendo gli elementi HTML dell’overlay
        const overlay = document.getElementById('videoOverlay');
        const overlayVideo = document.getElementById('overlayVideo');
        const closeBtn = document.getElementById('closeVideoBtn');
        // const playPauseBtn = document.getElementById('playPauseBtn');
        // const volumeSlider = document.getElementById('volumeSlider');
        
        // chiudi overlay
        const closeOverlay = () => {
            overlay.style.display = 'none';
            overlayVideo.pause();
            overlayVideo.removeAttribute('src'); // per rilasciare
            overlayVideo.load();
        };
        
        // evento click sull’entity 3D
        el.addEventListener('click', () => {
            const videoEl = data.src;
            if (!videoEl) {
                console.warn('No video src found for overlay');
                return;
            }
            
            // mostra overlay
            overlay.style.display = 'flex';
            
            // usa la stessa sorgente del video negli assets
            const src = videoEl.getAttribute('src');
            overlayVideo.setAttribute('src', src);
            
            // se vuoi l’audio, togli il muted da qui
            overlayVideo.muted = false;
            
            overlayVideo.play();
        });
        
        // pulsante chiudi
        closeBtn.addEventListener('click', closeOverlay);
        
        // play/pause
        // playPauseBtn.addEventListener('click', () => {
        //     if (overlayVideo.paused) {
        //         overlayVideo.play();
        //     } else {
        //         overlayVideo.pause();
        //     }
        // });
        
        // // volume
        // volumeSlider.addEventListener('input', (e) => {
        //     overlayVideo.volume = parseFloat(e.target.value);
        // });
    }
});






