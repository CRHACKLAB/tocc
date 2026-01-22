/* ----------------------
** MAIN SCREEN COMPONENTS
** ---------------------- */ 

// INTRO MANAGER
// 1. Plays intro video on user's click
// 2. Replaces itself with readyofortakeoff-manager component on video's end
AFRAME.registerComponent('intro-manager', {
    events: {
        click: function () {
            var el = this.el;
            skyDome = document.querySelector('#skyDome');
            el.getAttribute('material').src.play();
        },
        materialvideoended: function () {
            var el = this.el;
            el.removeAttribute('intro-manager');
            el.setAttribute('readyfortakeoff-manager', null);
        }
    }
});

//  READYFORTAKEOFF MANAGER
// 1. Plays itself at init to show the "ready for take-off message"
// 2. Opens engine's main valve on user's click (Chairs ready to move)
// 3. Replaces itself with takeoff-manager component on click
AFRAME.registerComponent('readyfortakeoff-manager', {
    events: {
        click: function () {
            var el = this.el;
            skyDome = document.querySelector('#skyDome');
            skyDome.emit('engineon');
            el.removeAttribute('readyfortakeoff-manager');
            el.setAttribute('takeoff-manager', null); 
        }
    },
    init: function () {
        var el = this.el;
        el.setAttribute('material', 'src', '#readyfortakeoffVideo');
        el.getAttribute('material').src.play();
    }
});

// TAKE-OFF MANAGER
// 1. Loads take-off video on init
// 2. Hides video on click
// 3. Deactives interaction on click
// 4. Simulates balloon's ascension visually on click
// 5. Fires skyDome's balloonup event to lift the chair on click
// 6. Plays a video showing air-balloons when the ascension scene ends (event fired by skyDome)
// 7. Shows the deck when the video ends
// 8. Replaces itself with video-manager when the video ends
AFRAME.registerComponent('takeoff-manager', {
    events: {
        balloonstopped: function () {
            var el = this.el;
            el.setAttribute('animation__fadein', 'property: material.opacity; to: 0.8 loop:false; dur: 1000;');
            el.getAttribute('material').src.play();
        },
        materialvideoended: function () {
            var el = this.el;
            document.querySelector('#deck').setAttribute('visible', true);
            document.querySelector('#bevagnaCover').setAttribute('class', 'interactive');
            document.querySelector('#gianoCover').setAttribute('class', 'interactive');
            document.querySelector('#gualdoCover').setAttribute('class', 'interactive');
            document.querySelector('#montefalcoCover').setAttribute('class', 'interactive');
            el.setAttribute('animation__fadein', 'property: material.opacity; to: 0.05 loop:false; dur: 1000;');
            el.removeAttribute('takeoff-manager');
            el.setAttribute('video-manager', null);
        }
    },
    init: function () {
        var el = this.el;
        el.setAttribute('material','src','#takeoffVideo');
        var skyDome = document.querySelector('#skyDome');
        //el.setAttribute('animation__fadeout', 'property: material.opacity; to: 0 loop:false; dur: 1000;');
        el.setAttribute('animation__fadein', 'property: material.opacity; to: 0 loop:false; dur: 1000;');
        skyDome.setAttribute('animation__balloonup',"property: rotation; to: -10 0 0; loop: false; dur: 4000;");
        skyDome.emit('balloonup');
        el.setAttribute('class','inactive');
    }
});

// VIDEO MANAGER (SYSTEM)
// 1. Records current town
AFRAME.registerSystem('video-manager', {
    schema: {
        currentTown: {type: 'string', default: ''},
        currentPoI: {type: 'string', default:''},
        direction: {type: 'string', default: ''}
    }
});

// VIDEO MANAGER (COMPONENT)
// 1. Shows videos
// 2. Activate the proper animation after video ends
AFRAME.registerComponent('video-manager', {
    events: {
        materialvideoended: function (evt) {
            // Declarations
            var el = this.el;
            var skyDome = document.querySelector('#skyDome');
            var currentTown = el.querySelector(this.system.data.currentTown.src);
            var currentPoI = this.system.data.currentPoI;
            var offset = this.system.data.offset;
            //
            el.setAttribute('animation__fadein', 'property: material.opacity; to: 0.05 loop:false; dur: 1000;');
            if (currentPoI === '') {
                switch (this.system.data.direction) {
                    case "in":
                        currentTown.setAttribute('animation', 'property: position; to: 0 0 0.025; dur: 500; easing: linear; loop:false')
                        break;
                    case "out":
                        skyDome.setAttribute('animation__upfromtown',"property: rotation; to: -10 0 0; loop: false; dur: 4000; startEvents: balloonup");
                        skyDome.emit('balloonup');
                        break;
                    default:
                        console.log('video-manager - materialvideoended: this should never happen...');
                } 
            } else {
                skyDome.emit('setbackground',{src: currentPoI, offset: offset});

                if(currentPoI != null){
                    
                    switch(currentPoI){
                        case '#bevagna360Piazza':
                        case '#gualdo360Rocca':
                        case 'gualdo360SAntonio':
                            skyDome.setAttribute('phi-Start', '0');
                            skyDome.setAttribute('phi-Length', '360');
                            break;
                        case '#bevagna360Museo':
                        case '#bevagna360Teatro':
                                skyDome.setAttribute('phi-Start', '98');
                                skyDome.setAttribute('phi-Length', '360');
                            break;
                        case '#giano360SFelice':
                            skyDome.setAttribute('phi-Start', '260');
                            skyDome.setAttribute('phi-Length', '360');
                            break;
                        case '#giano360Morcicchia':
                            skyDome.setAttribute('phi-Start', '210');
                            skyDome.setAttribute('phi-Length', '360');
                            break;
                        case '#giano360SFrancesco':
                            skyDome.setAttribute('phi-Start', '89');
                            skyDome.setAttribute('phi-Length', '360');
                            break;
                        case '#gualdo360STerenziano':
                            skyDome.setAttribute('phi-Start', '205');
                            skyDome.setAttribute('phi-Length', '360');
                            break;
                        case '#montefalco360Comune':
                        case '#montefalco360SFortunato':
                        case '#montefalco360Museo':
                            skyDome.setAttribute('phi-Start', '98');
                            skyDome.setAttribute('phi-Length', '360');
                            break;
                            default:
                                break;
        
                        }
                    }
                    console.log(currentPoI)

                currentTown.emit('unlocktokens');
                this.system.data.currentPoI = '';
                this.system.data.offset = {};
            };
        },
        setvideo: function (evt) {
            var el = this.el;
            el.setAttribute('material', 'src', evt.detail.src);
            if(evt.detail.poi === ''){
                this.system.data.currentTown = evt.detail.town;
                this.system.data.direction = evt.detail.direction;
            } else {
                this.system.data.currentPoI = evt.detail.poi;
                this.system.data.offset = evt.detail.offset;
            };    
        },
        startlanding: function () {
            var el = this.el;
            el.removeAttribute('video-manager');
            el.setAttribute('landing-manager', null);
        },
        startvideo: function (evt) {
            var el = this.el;
            var skyDome = document.querySelector('#skyDome');
            skyDome.emit('setbackground',{src: '#sky', offset: {x: 0, y: 0}});
            el.setAttribute('animation__fadein', 'property: material.opacity; to: 0.7 loop:false; dur: 1000;');
            el.getAttribute('material').src.play();
        }
    }
});

// LANDING MANAGER
// 1. Plays a landing video
// 2. Launches the final descent animation;
// 3. Closes the master valve (happens in sky-manager)
AFRAME.registerComponent('landing-manager', {
    events: {
        materialvideoended: function () {
            var skyDome = document.querySelector('#skyDome');
            // Simulates the airballoon descent 
            skyDome.setAttribute('animation__landing',"property: rotation; to: 10 0 0; loop: false; dur: 4000; startEvents: balloondown");
            skyDome.emit('balloondown');
        }
    },
    init: function () {
        var el = this.el;
        el.setAttribute('material', 'src', '#landingVideo')
        el.setAttribute('animation__fadein', 'property: material.opacity; to: 0.8 loop:false; dur: 1000;');
        el.getAttribute('material').src.play();
    }
})


/* --------------
** SKY COMPONENTS
** -------------- */ 

// SKY MANAGER (SYSTEM)
// 1. Collects the chair Id and makes it available to the sky manager component every time it is activated
AFRAME.registerSystem('sky-manager', {
    schema: {
        chairId: {type: 'string', default: '0'}
    },
    init: function () {
        const acceptedIds = ["0","1","2"]
        this.data.chairId = AFRAME.utils.getUrlParameter('v');
        if (!acceptedIds.includes(this.data.chairId)) {
            console.log('Error: Wrong chair id - ' + this.data.chairId);
            this.data.chairId = "0";
        } //REFACTOR TO IMPROVE ERROR MANAGEMENT
    }
});

// SKY MANAGER (COMPONENT)
// 1. Manages sky movements down and up to simulate balloon ascensions and descents
// 2. Posts commands to the web-server to control the chair and the engine accordingly
// 3. Gives control back to mainScreen to show the videos
AFRAME.registerComponent('sky-manager', {
    schema: {
        townname: {type: 'string', default: ''}
    },
    events: {
        animationcomplete__landing: function () {
            var el = this.el;
            el.emit('balloonstop');
            el.emit('engineoff');
        },
        animationcomplete__upfromtown: function () {
            //console.log('sky-manager.test');
            var el = this.el;
            var townName = this.data.townname;
            var town = document.querySelector('#' + townName);
            el.emit('balloonstop');
            town.emit('balloonstopped', null, false); //works with townout-manager
        },
        animationcomplete__balloondown: function () {
            //console.log('sky manager component - animationcomplete__balloondown');
            var el = this.el;
            var townName = this.data.townname;
            var town = document.querySelector('#' + townName);
            el.emit('balloonstop');
            town.emit('balloonstopped', null, false); //works with townin-manager
        },
        animationcomplete__balloonup: function () {
            //console.log('sky manager component - animationcomplete__balloonup');
            var el = this.el;
            var mainScreen = document.querySelector('#mainScreen');
            el.emit('balloonstop');
            mainScreen.emit('balloonstopped');
        },
        // Chair goes down
        balloondown: function () {
            console.log('sky manager component - balloondown');
            const chairIds = ["1", "2"] //REFACTOR IF MORE CHAIRS ARE ADDED
            const options = {
                mode: 'no-cors'
            };
            if (chairIds.includes(this.system.data.chairId)) {
                fetch('https://ts.luckyseven.it/down?v=' + this.system.data.chairId, options);
            }
        },
        // Chair stops
        balloonstop: function () {
            console.log('sky manager component - balloonstop');
            const chairIds = ["1", "2"] //REFACTOR IF MORE CHAIRS ARE ADDED
            const options = {
                mode: 'no-cors'
            };
            if (chairIds.includes(this.system.data.chairId)) {
                fetch('https://ts.luckyseven.it/stop?v=' + this.system.data.chairId, options);
            }
        },
        // Chair goes up
        balloonup: function () {
            console.log('sky manager component - balloonup');
            const chairIds = ["1", "2"] //REFACTOR IF MORE CHAIRS ARE ADDED
            const options = {
                mode: 'no-cors'
            };
            if (chairIds.includes(this.system.data.chairId)) {
                fetch('https://ts.luckyseven.it/up?v=' + this.system.data.chairId, options);
            }
        },
        // Closes engine's master valve. Chairs can't move any longer.
        engineoff: function () {
            const chairIds = ["1", "2"] //REFACTOR IF MORE CHAIRS ARE ADDED
            const options = {
                mode: 'no-cors'
            };
            if (chairIds.includes(this.system.data.chairId)) {
                fetch('https://ts.luckyseven.it/off?v=' + this.system.data.chairId, options);
            }
            console.log('That\'s all, folks!');
        },
        // Opens engine's master valve. Chairs can move now.
        engineon: function () {
            const chairIds = ["1", "2"] //REFACTOR IF MORE CHAIRS ARE ADDED
            const options = {
                mode: 'no-cors'
            };
            console.log('Current chairId: ' + this.system.data.chairId);
            if (chairIds.includes(this.system.data.chairId)) {
                console.log('engine on');
                fetch('https://ts.luckyseven.it/on?v=' + this.system.data.chairId, options);
            }
        },
        setbackground: function (evt) {
            var el = this.el
            el.setAttribute('material', 'src', evt.detail.src);
            el.setAttribute('material', 'offset', evt.detail.offset);
        }
    }
});


/* -----------------------
** CONTROL DECK COMPONENTS
** ----------------------- */ 

// DECK MANAGER (SYSTEM)
AFRAME.registerSystem('deck-manager', {
    schema: {
        itinerary: {type: 'array', default: []}
    }
})


// DECK MANAGER (COMPONENT)
// 1. Sets the current map
// 2. Removes and assign back interactivity from currently not selected towns
// 3. Records selected stops in the itinerary and posts them to the app server
AFRAME.registerComponent('deck-manager', {
    events: {
        setmap: function (evt) {
            var el = this.el;
            var map = el.querySelector('#mapScreen');
            map.setAttribute('material', 'src', evt.detail.src);
        },
        disablecovers: function (evt) {
            var el = this.el;
            var towns = el.querySelectorAll('[townin-manager]');
            for (var i = 0; i < towns.length; i++) {
                towns[i].setAttribute('class', 'inactive');
                if (!evt.detail.src.includes(towns[i].id)) {
                    towns[i].setAttribute('material', {color: 'gray', transparent: true, opacity:0.8});
                }
            }
        },
        enablecovers: function () {
            var el = this.el;
            var towns = el.querySelectorAll('[townin-manager]');
            var userId = AFRAME.utils.getUrlParameter('userid');
            const params = {
                places: this.system.data.itinerary
            };
            const options = {
                method: 'POST',
                body: JSON.stringify( params ),  
                mode: 'no-cors'
            };
            console.log('User ID: ' + userId);
            console.log('Params: ');
            console.log(params);
            // Re-enables interactivity for not-yet-visited towns
            for (var i = 0; i < towns.length; i++) {
                towns[i].setAttribute('material', {color: 'white', transparent: true, opacity:1})
                towns[i].setAttribute('class', 'interactive');
            };
            // Checks whether all towns have been visited.
            // If yes, hides the deck, sends itinerary to server and proceeds to the landing routine.
            if (towns.length == 0) {
                el.setAttribute('visible', false);
                fetch( 'https://sdsapi.luckyseven.it/api/v1/users/' + userId+ '/vr', options );
                console.log('Itinerary has been sent!');
                el.emit('startlanding');
            };
        },
        updateitinerary: function (evt) {
            this.system.data.itinerary = evt.detail.itinerary
        }
    }
});

// TOWNIN MANAGER
// 1. Selects the town to visit
// 2. Simulates descending with chair
// 3. Shows a town-in vide
// 4. Disables interaction with other towns
// 5. Shows point of interests interface
AFRAME.registerComponent('townin-manager', {
    events: {
        click: function () {
            var el = this.el;
            var skyDome = document.querySelector('#skyDome');
            var srcVideo = {};
            var srcMap = {};
            var srcTown = {};
            // Simulates the airballoon descent 
            skyDome.setAttribute('animation__balloondown',"property: rotation; to: 0 0 0; loop: false; dur: 4000; startEvents: balloondown");
            skyDome.emit('balloondown');
            skyDome.setAttribute('sky-manager','townname: ' + el.getAttribute('id'));
            // Selects the current video, map and town 
            switch (el.getAttribute('id')) {
                case 'bevagnaCover':
                    srcTown = {src: '#bevagnaCover'};
                    srcVideo = {src: '#bevagnaInVideo', town: srcTown, poi: '', offset: {}, direction: 'in'};
                    srcMap = {src: '#bevagnaMap'};
                    break;
                case 'gianoCover':
                    srcTown = {src: '#gianoCover'};
                    srcVideo = {src: '#gianoInVideo', town: srcTown, poi: '', offset: {}, direction: 'in'};
                    srcMap = {src: '#gianoMap'};
                    break;
                case 'gualdoCover':
                    srcTown = {src: '#gualdoCover'};
                    srcVideo = {src: '#gualdoInVideo', town: srcTown, poi: '', offset: {}, direction: 'in'};
                    srcMap = {src: '#gualdoMap'};
                    break;
                case 'montefalcoCover':
                    srcTown = {src: '#montefalcoCover'};
                    srcVideo = {src: '#montefalcoInVideo', town: srcTown, poi: '', offset: {}, direction: 'in'};
                    srcMap = {src: '#montefalcoMap'};
                    break;
                default:
                    console.log('cover-manager switch: default case should never happen!')
            }
            // Sets the current map
            el.emit('setmap',srcMap);
            // Sets the current video
            el.emit('setvideo', srcVideo);
            // Disables interaction
            //el.setAttribute('class', 'inactive');
            el.emit('disablecovers', srcTown);
        },
        animationcomplete: function () {
            var el = this.el;
            var tokens = el.querySelectorAll('[poi-manager]');
            // makes the cover clickable again
            el.setAttribute('class', 'interactive');
            // activates tokens to select PoIs
            for (var i = 0; i < tokens.length; i++) {
                tokens[i].setAttribute('visible', true);
                tokens[i].setAttribute('class', 'interactive');
            };
            // replaces townin-manager component with pois-manager component
            el.removeAttribute('townin-manager');
            el.setAttribute('townout-manager', null);
        },
        balloonstopped: function () {
            var el = this.el;
            el.emit('startvideo');
        }
    }
});

// TOWNOUT MANAGER
//
AFRAME.registerComponent('townout-manager', {
    events: {
        click: function () {
            var el = this.el;
            var skyDome = document.querySelector('#skyDome');
            var srcTown = {};
            var srcVideo = {};
            // Removing the tokens
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            };
            //Moving the cover down and making it inactive
            el.setAttribute('animation', 'property: position; to: 0 0 0; dur: 500; easing: linear; loop:false');
            el.setAttribute('material', {color: 'gray', transparent: true, opacity:0.8}); 
            el.setAttribute('class','inactive');
            // Sets the general area map
            el.emit('setmap',{src:'#scieMap'});
            // Sets the sky back on the dome
            skyDome.emit('setbackground',{src: '#sky', offset: {x: 0, y: 0}});
            // Sets the movie to play
            switch (el.getAttribute('id')) {
                case 'bevagnaCover':
                    srcTown = {src: '#bevagnaCover'};
                    srcVideo = {src: '#bevagnaOutVideo',  town: srcTown, poi: '', offset: {}, direction: 'out'};
                    break;
                case 'gianoCover':
                    srcTown = {src: '#gianoCover'};
                    srcVideo = {src: '#gianoOutVideo', town: srcTown, poi: '', offset: {}, direction: 'out'};
                    break;
                case 'gualdoCover':
                    srcTown = {src: '#gualdoCover'};
                    srcVideo = {src: '#gualdoOutVideo', town: srcTown, poi: '', offset: {}, direction: 'out'};
                    break;
                case 'montefalcoCover':
                    srcTown = {src: '#montefalcoCover'};
                    srcVideo = {src: '#montefalcoOutVideo', town: srcTown, poi: '', offset: {}, direction: 'out'};
                    break;
                default:
                    console.log('townout-manager switch: default case should never happen!')
            }
            el.emit('setvideo',srcVideo);
        },
        animationcomplete: function () {
            var el = this.el;
            el.emit('startvideo');
        },
        balloonstopped: function () {
            var el = this.el;
            el.emit('enablecovers')
        },
        
        locktokens: function () {
            var el = this.el;
            var pois = el.querySelectorAll('[poi-manager]');
            el.setAttribute('class', 'inactive');
            for (var i = 0; i < pois.length; i++) {
                pois[i].setAttribute('class', 'inactive');
            }
        },
        unlocktokens: function () {
            var el = this.el;
            var pois = el.querySelectorAll('.inactive');
            el.setAttribute('class', 'interactive');
            for (var i = 0; i < pois.length; i++) {
                pois[i].setAttribute('class', 'interactive');
            }
        }  
    }
});

// POI MANAGER (COMPONENT)
// 1. Shows PoI's introductory video
// 2. Inhibits interaction with other PoI's and its cover until the video's end
// 3. Fades screen when video ends
// 4. Shows 360° panorama when video ends
AFRAME.registerComponent('poi-manager', {
    events: {   
        click: function (evt) {
            // Click must not bubble up to the container object (cover) or town experience will end
            evt.stopPropagation();
            // Declarations
            var el = this.el;
            var srcVideo = {};
            //
            switch (el.getAttribute('id')) {
                case 'bevagnaTokenOrange':
                    srcVideo = {src: '#bevagnaOrangeVideo', town: '', poi: '#bevagna360Piazza', offset: {x: 0, y: 0}, direction: ''};
                    break;
                case 'bevagnaTokenPurple':
                    srcVideo = {src: '#bevagnaPurpleVideo', town: '', poi: '#bevagna360Museo', offset: {x: 0, y: 0}, direction: ''};
                    break;
                case 'bevagnaTokenYellow':
                    srcVideo = {src: '#bevagnaYellowVideo', town: '', poi: '#bevagna360Teatro', offset: {x: 0, y: 0}, direction: ''};
                    break;
                case 'gianoTokenOrange':
                    srcVideo = {src: '#gianoOrangeVideo', town: '', poi: '#giano360SFelice', offset: {x: 0, y: 0}, direction: ''};
                    break;
                case 'gianoTokenPurple':
                    srcVideo = {src: '#gianoPurpleVideo', town: '', poi: '#giano360Morcicchia', offset: {x: 0, y: 0}, direction: ''};
                    break;
                case 'gianoTokenYellow':
                    srcVideo = {src: '#gianoYellowVideo', town: '', poi: '#giano360SFrancesco', offset: {x: 0, y: 0}, direction: ''};
                    break;
                case 'gualdoTokenOrange':
                    srcVideo = {src: '#gualdoOrangeVideo', town: '', poi: '#gualdo360Rocca', offset: {x: 0, y: 0}, direction: ''};
                    break;
                case 'gualdoTokenPurple':
                    srcVideo = {src: '#gualdoPurpleVideo', town: '', poi: '#gualdo360SAntonio', offset: {x: 0, y: 0}, direction: ''};
                    break;
                case 'gualdoTokenYellow':
                    srcVideo = {src: '#gualdoYellowVideo', town: '', poi: '#gualdo360STerenziano', offset: {x: 0, y: 0}, direction: ''};
                    break;
                case 'montefalcoTokenOrange':
                    srcVideo = {src: '#montefalcoOrangeVideo', town: '', poi: '#montefalco360Comune', offset: {x: 0, y: 0}, direction: ''};
                    break;
                case 'montefalcoTokenPurple':
                    srcVideo = {src: '#montefalcoPurpleVideo', town: '', poi: '#montefalco360Museo', offset: {x: 0, y: 0}, direction: ''};
                    break;
                case 'montefalcoTokenYellow':
                    srcVideo = {src: '#montefalcoYellowVideo', town: '', poi: '#montefalco360SFortunato', offset: {x: 0, y: 0}, direction: ''};
                    break;
                default:
                    console.log('token-manager switch default. We should never get here!');
            }
            el.emit('locktokens');
            el.emit('setvideo', srcVideo);
            el.emit('startvideo');
            el.removeAttribute('poi-manager');
            el.setAttribute('itinerary-manager', null);
        }    
    }
});

// ITINERARY MANAGER (SYSTEM)
AFRAME.registerSystem('itinerary-manager', {
    schema: {
        itinerary: {type: 'array', default: []}
    }
})

// ITINERARY MANAGER
//
AFRAME.registerComponent('itinerary-manager', {
    events: {
        click: function (evt) {
            var el = this.el;
            var poiId = '';
            var index;
            //
            // Click must not bubble up to the container object (cover) or town experience will end
            evt.stopPropagation();
            console.log(el.getAttribute('material').color);
            switch (el.id) {
                case 'bevagnaTokenOrange':
                    poiId = '58'
                    break;
                case 'bevagnaTokenPurple':
                    poiId = '56'
                    break;
                case 'bevagnaTokenYellow':
                    poiId = '61'
                    break;
                case 'gianoTokenOrange':
                    poiId = '42';
                    break;
                case 'gianoTokenPurple':
                    poiId = '43';
                    break;
                case 'gianoTokenYellow':
                    poiId = '51';
                    break;
                case 'gualdoTokenOrange':
                    poiId = '63';
                    break;
                case 'gualdoTokenPurple':
                    poiId = '62';
                    break;
                case 'gualdoTokenYellow':
                    poiId = '64';
                    break;
                case 'montefalcoTokenOrange':
                    poiId = '41';
                    break;
                case 'montefalcoTokenPurple':
                    poiId = '54';
                    break;
                case 'montefalcoTokenYellow':
                    poiId = '52';
                    break;
                default:
                    console.log('Itinerary manager - This message should never appear!');
            }
            if (el.getAttribute('material').color !== 'green') {
                el.setAttribute('material', 'color', 'green');
                //Adds the PoI to the itinerary
                this.system.data.itinerary.push(poiId);
                console.log(this.system.data.itinerary);
            } else {
                el.setAttribute('material', 'color', 'red');
                //Removes the PoI from the itinerary
                index = this.system.data.itinerary.indexOf(poiId);
                if (index > -1) {
                    this.system.data.itinerary.splice(index, 1);
                };
                console.log(this.system.data.itinerary);
            };
            el.emit('updateitinerary', {itinerary: this.system.data.itinerary});
        }
    },
    init: function () {
        console.log('Itinerary manager at work!');
        var el = this.el;
        var poiId = '';
        //
        console.log(el.getAttribute('material').color);
        switch (el.id) {
            case 'bevagnaTokenOrange':
                poiId = '58'
                break;
            case 'bevagnaTokenPurple':
                poiId = '56'
                break;
            case 'bevagnaTokenYellow':
                poiId = '61'
                break;
            case 'gianoTokenOrange':
                poiId = '42';
                break;
            case 'gianoTokenPurple':
                poiId = '43';
                break;
            case 'gianoTokenYellow':
                poiId = '51';
                break;
            case 'gualdoTokenOrange':
                poiId = '63';
                break;
            case 'gualdoTokenPurple':
                poiId = '62';
                break;
            case 'gualdoTokenYellow':
                poiId = '64';
                break;
            case 'montefalcoTokenOrange':
                poiId = '41';
                break;
            case 'montefalcoTokenPurple':
                poiId = '54';
                break;
            case 'montefalcoTokenYellow':
                poiId = '52';
                break;
            default:
                console.log('Itinerary manager - This message should never appear!');
        }
        el.setAttribute('material', 'color', 'green');
        //Adds the PoI to the itinerary
        this.system.data.itinerary.push(poiId);
        console.log(this.system.data.itinerary);
        el.emit('updateitinerary', {itinerary: this.system.data.itinerary});
    }
})

