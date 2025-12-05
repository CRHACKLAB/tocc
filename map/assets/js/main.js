console.log("main.js uploaded");
const infoCard = document.getElementById("info-card-layer");
const sidebar = document.getElementById("sidebar");
const mapContainer = document.getElementById("map");
const cardTitle = document.getElementById("card-title");
const cardDescription = document.getElementById("card-description");
const story = document.getElementById("story");
const backButton = document.getElementById('back-to-index');
const portal = document.getElementById('portals');


let userCoordinates = null;

const hideInfoCard = () => {
    console.log("Hide info card");
    infoCard.setAttribute("hidden", "hidden");
    // sidebar.removeAttribute("hidden");
    // mapContainer.removeAttribute("hidden");
};

const showInfoCard = (title_it, title_en, description_it, description_en, img, markerType, site) => {
    
    // shows the card depending on the language
    if (language == 'it') {
        cardTitle.innerText = title_it;
        cardDescription.innerText = description_it;
        var image = document.createElement("img");
        image.src = img;
        image.alt = title_it;
        cardDescription.appendChild(image);
        var link = document.createElement("a");
        link.href = site;
        link.target = "_blank";
        link.innerText = "\nLink";
        cardDescription.appendChild(link);
    } else {
        cardTitle.innerText = title_en;
        cardDescription.innerText = description_en;
        var image = document.createElement("img");
        image.src = img;
        image.alt = title_en;
        var link = document.createElement("a");
        link.href = site;
        link.target = "_blank";
        link.innerText = "\nLink";
        cardDescription.appendChild(link);
    }
    
    //MODIFY WITH DATA FROM MAPBOX
    
    //------
    infoCard.removeAttribute("hidden");
    infoCard.focus();
    sidebar.setAttribute("hidden", "hidden");
    mapContainer.setAttribute("hidden", "hidden");
    
    // 🔧 AGGIUNGI PULSANTE "TORNA ALLA MAPPA" SE NON ESISTE
    let backBtn = document.getElementById('back-to-map');
    if (!backBtn) {
        backBtn = document.createElement('button');
        backBtn.id = 'back-to-map';
        backBtn.className = 'btn-primary';
        backBtn.textContent = 'Torna alla mappa';
        backBtn.style.cssText = `
            margin-top: 20px;
            padding: 12px 24px;
            background: #4A90E2;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
        `;
        infoCard.appendChild(backBtn);
    }
    
    // 🔧 COLLEGA IL PULSANTE A hideInfoCard
    backBtn.onclick = hideInfoCard;
    
    console.log('✅ Back button connected to hideInfoCard');
};

const hideSidebar = () => {
    console.log("Hide sidebar");
    sidebar.setAttribute("hidden", "hidden");
};

const showSidebar = () => {
    console.log("Show sidebar");
    sidebar.removeAttribute("hidden");
};

const back2Index = () => {
    infoCard.setAttribute("hidden", "hidden");
    mapContainer.removeAttribute("hidden");
    console.log(userCoordinates);
    if (userCoordinates) {
        map.flyTo({
            center: userCoordinates,
            zoom: 12.9
        });
    } else {
        map.zoomTo(17.9);
    }
};

// Function to initialize the map
function initializeMap(latitude, longitude) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FidHJpcCIsImEiOiJjbHdoeG9neGEwMGYwMmpzd283dWg2c3hqIn0.7JK3k4zD9eU0OM9iurp0Xg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/gabtrip/clwkh3joc00rx01ny76o4hfkn',
        center: [longitude, latitude],
        zoom: 15.9,
        scrollZoom: true,
    });
    const nav = new mapboxgl.NavigationControl({
        showCompass: true,
    });
    map.addControl(nav, 'bottom-right');

    userCoordinates = [longitude, latitude]; //store the user's coordinates
}

// 🔧 SUPPORTO ESC PER CHIUDERE
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const infoCard = document.getElementById('info-card-layer');
        if (infoCard && !infoCard.hasAttribute('hidden')) {
            hideInfoCard();
        }
    }
});