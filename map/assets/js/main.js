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
    sidebar.removeAttribute("hidden");
    mapContainer.removeAttribute("hidden");
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
    sidebar.setAttribute("hidden", "hidden");
    mapContainer.setAttribute("hidden", "hidden");
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

// Function to handle successful geolocation
function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    initializeMap(latitude, longitude);
}

// Function to handle geolocation errors
function errorCallback(error) {
    console.error(`Geolocation error: ${error.message}`);
    alert('Unable to retrieve your location. Please ensure that location services are enabled.');
}
