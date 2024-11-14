
if (!("remove" in Element.prototype)) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

// mapboxgl.accessToken = "pk.eyJ1IjoiZG9jLWRpdmFnbyIsImEiOiJja2NnbXU0ancwdGx1MnhtMm1pdzV5cWd4In0.NXt0RiFp4HjZ_iy55WADkg"; // token generico

mapboxgl.accessToken = "pk.eyJ1IjoiZ2FidHJpcCIsImEiOiJjbHdoeG9neGEwMGYwMmpzd283dWg2c3hqIn0.7JK3k4zD9eU0OM9iurp0Xg"; // token stile personalizzato
/**
 * Add the map to the page
 */
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/gabtrip/cly92hzf000i301pn422w7gxh", // stile personalizzato 
  // style: "mapbox://styles/mapbox/streets-v12", // stile generico
  // center: [12.608438888126923, 42.933064240993126],
  center:[12.391299727701938, 43.10448380562507], 
  zoom: 18.5,
  scrollZoom: true,
});

//compass
const nav = new mapboxgl.NavigationControl({
  showCompass: true,
});
map.on("load", function (e) {
  map.addControl(nav, "bottom-right");
});
var stores = {
  type: "FeatureCollection",
  features: [      
    // PANNELLO 0
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391182346608403, 43.1047445320386],
      }, 
      properties: {
        address_it: "Fondazione Sant'Anna",
        // address_en: "Piazzale Masci Mindolfo Parking",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 0",
        // description_en: "Toll Parking",
        markerType: "panel0",
        img: "../assets/img/card_background/Piazza.jpg",
        site: "https://www.clf4d.eu"
      },
    },

    // PANNELLO 1
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391144795686326, 43.104566326839965],
      }, 
      properties: {
        address_it: "La scuola nel ventennio",
        // address_en: "Porta Todi Entrance",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: `Pannello 1`,
        // description_en: "",
        markerType: "panel1",
        img: "./assets/img/card_background/Porta_Todi.jpeg",
        site: "/"
      },
    },
    
    // PANNELLO 2
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.390957041075941, 43.104493869632854],
      }, 
      properties: {
        address_it: "Foto di classe",
        // address_en: "Mercato delle Gaite Portal",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 2",
        // description_en: "If you don't have the Zappar app, you'll be redirected to the app store to download it, then you can enjoy the portal!",
        markerType: "panel2",
        img: "./assets/img/card_background/",
        site: "https://webxr.run/Vb5Adgw582d6Z",
      },
    },
    
    // PANNELLO 3
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391053600589851, 43.10436070481235],
      }, 
      properties: {
        address_it: "Radio a scuola",
        // address_en: "Gaita San Giovanni Craft",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "",
        // description_en: "",
        markerType: "panel3",
        img: "./assets/img/card_background/",
        site: "https://webxr.run/Vb5Adgw582d6Z",
      },
    },
    
    // PANNELLO 4
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.39122794415664, 43.104213831512595],
      }, 
      properties: {
        address_it: "Radici di futuro(INDIRE)",
        // address_en: "Public toilet",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 4",
        // description_en: "",
        markerType: "panel4",
        img: "./assets/img/card_background/",
        site: "https://webxr.run/Vb5Adgw582d6Z",
      },
    },

    // PANNELLO 5
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391354007966472, 43.10409829093586],
      }, 
      properties: {
        address_it: "Scuole rurali",
        // address_en: "Drinking Water Fountain",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 5",
        // description_en: "",
        markerType: "panel5",
        img: "./assets/img/card_background/",
        site: "https://webxr.run/Vb5Adgw582d6Z",
      },
    },

    // PANNELLO 6
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391531033741979, 43.10420795657328],
      }, 
      properties: {
        address_it: "Scuole per contadini",
        // address_en: "Drinking Water Fountain",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 6",
        // description_en: "",
        markerType: "panel6",
        img: "./assets/img/card_background/",
        site: "https://webxr.run/Vb5Adgw582d6Z",
      },
    },

    // PANNELLO 7
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391691966265167, 43.104321538633535],
      }, 
      properties: {
        address_it: "Educandati e convitti",
        // address_en: "Drinking Water Fountain",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 7",
        // description_en: "",
        markerType: "panel7",
        img: "./assets/img/card_background/",
        site: "https://webxr.run/Vb5Adgw582d6Z",
      },
    },

    // PANNELLO 8
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391673190804127, 43.104405745887],
      }, 
      properties: {
        address_it: "Istruzione agraria",
        // address_en: "Drinking Water Fountain",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 8",
        // description_en: "",
        markerType: "panel8",
        img: "./assets/img/card_background/",
        site: "https://webxr.run/Vb5Adgw582d6Z",
      },
    },

    // PANNELLO 9
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.39152835153326, 43.104525202489704],
      }, 
      properties: {
        address_it: "Museo delle scuole",
        // address_en: "Drinking Water Fountain",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 9",
        // description_en: "",
        markerType: "panel9",
        img: "./assets/img/card_background/",
        site: "https://webxr.run/Vb5Adgw582d6Z",
      },
    },

    // PANNELLO 10
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391351325757752, 43.104630950763166],
      }, 
      properties: {
        address_it: "Da definire",
        // address_en: "Drinking Water Fountain",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 10",
        // description_en: "",
        markerType: "panel10",
        img: "./assets/img/card_background/",
        site: "https://clf4d.eu/it/",
      },
    },
  ],
};

/**
 * Assign a unique id to each store. You'll use this `id`
 * later to associate each point on the map with a listing
 * in the sidebar.
 */
stores.features.forEach(function (store, i) {
  store.properties.id = i;
});

// GPS
var geolocateControl = new mapboxgl.GeolocateControl({
  positionOptions: {
      enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserLocation: true
});

map.addControl(geolocateControl);

// Save geolocation status in localStorage
function saveGeolocationStatus(isEnabled) {
  localStorage.setItem('geolocationEnabled', isEnabled);
}

// Retrieve geolocation status from localStorage
function getGeolocationStatus() {
  return localStorage.getItem('geolocationEnabled') === 'true';
}

// Usage example when activating geolocation
if (getGeolocationStatus()) {
  // Code to activate geolocation
  activateGeolocation();
}

// Update geolocation status whenever it's toggled
function activateGeolocation() {
  saveGeolocationStatus(true);
  // Code to activate geolocation
}

function deactivateGeolocation() {
  saveGeolocationStatus(false);
  // Code to deactivate geolocation
}

/**
 * Wait until the map loads to make changes to the map.
*/
map.on("load", function (e) {
  /**
   * This is where your '.addLayer()' used to be, instead
   * add only the source without styling a layer
   */
  map.addSource("places", {
    type: "geojson",
    data: stores,
  });

  /**
   * Add all the things to the page:
   * - The location listings on the side of the page
   * - The markers onto the map
   * 
   */
  buildLocationList(stores);
  addMarkers();
});

/**
 * Add a marker to the map for every store listing.
 **/
function addMarkers() {
  /* For each feature in the GeoJSON object above: */
  stores.features.forEach(function (marker) {
    /* Create a div element for the marker. */
    var el = document.createElement("div");
    /* Assign a unique `id` to the marker. */
    el.id = "marker-" + marker.properties.id;
    /* Assign the `marker` class to each marker for styling. */
    // el.className = "marker";

    // to have different marker styles for each service
    if (marker.properties.markerType) {
      el.className = "marker-" + marker.properties.markerType;
    } else {
      el.className = "marker-default"; // Fallback class
    }
    /**
     * Create a marker using the div element
     * defined above and add it to the map.
     **/
    new mapboxgl.Marker(el, { offset: [0, -23] })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

    /**
     * Listen to the element and when it is clicked, do three things:
     * 1. Fly to the point
     * 2. Close all other popups and display popup for clicked store
     * 3. Highlight listing in sidebar (and remove highlight for all other listings)
     **/
    el.addEventListener("click", function (e) {
      /* Fly to the point */
      flyToStore(marker);
      /* Close all other popups and display popup for clicked store */
      makeHighlight(marker);
      showInfoCard(marker.properties.address_it, marker.properties.address_en, marker.properties.description_it, marker.properties.description_en, marker.properties.img, marker.properties.markerType, marker.properties.site);
      /* Highlight listing in sidebar */
      e.stopPropagation();
      
    });
  });
}

// This function is to translate the listings

function updateAddresses(data) {
  var listings = document.getElementById("listings").children;
  Array.from(listings).forEach(function (listing, i) {
      var prop = data.features[i].properties;
      var link = listing.querySelector("a.title");
      if (language == "it") {
          link.innerHTML = prop.address_it;
      } else {
          link.innerHTML = prop.address_en;
      }
  });
}


let currentFilter = 'all';
/**
 * Add a listing for each store to the sidebar.
**/
function buildLocationList(data) {
  if (!data || !data.features || !Array.isArray(data.features)) {
    console.error('Invalid data format for buildLocationList');
    return;
  }
  const listingsContainer = document.getElementById('listings');
  listingsContainer.innerHTML = '';
  data.features.forEach(function (store, i) {
    /**
     * Create a shortcut for `store.properties`,
     * which will be used several times below.
    **/
    var prop = store.properties;
   /* Add a new listing section to the sidebar. */
    var listings = document.getElementById("listings");
    var listing = listings.appendChild(document.createElement("div"));
    /* Assign a unique `id` to the listing. */
    listing.id = "listing-" + prop.id;

    /* Assign the `item` class to each listing for styling. */
    if (prop.markerType) {
      listing.className = "item item-" + prop.markerType;
    } else {
      listing.className = "item item-default"; // Fallback class
    }
    

    /* Add the link to the individual listing created above. */
    var link = listing.appendChild(document.createElement("a"));
    
    link.href = "#";
    link.className = "title";
    link.id = "link-" + prop.id;
  
    if (language == "it") {
      link.innerHTML = prop.address_it;
    } else {
      link.innerHTML = prop.address_en;
    }
        
    /**
     * Listen to the element and when it is clicked, do four things:
     * 1. Update the `currentFeature` to the store associated with the clicked link
     * 2. Fly to the point
     * 3. Close all other popups and display popup for clicked store
     * 4. Highlight listing in sidebar (and remove highlight for all other listings)
     **/
    link.addEventListener("click", function (e) {
      for (var i = 0; i < data.features.length; i++) {
        if (this.id === "link-" + data.features[i].properties.id) {
          var clickedListing = data.features[i];
          flyToStore(clickedListing);
          makeHighlight(clickedListing);
        }
      }
      var activeItem = document.getElementsByClassName("active");
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      this.parentNode.classList.add("active");
    });
  });
}

document.getElementById('filter-dropdown').addEventListener('change', handleFilterChange);
document.getElementById('marker-dropdown').addEventListener('change', handleFilterChange);

function handleFilterChange(event) {
    const selectedType = event.target.value;
    currentFilter = selectedType;
    document.getElementById('filter-dropdown').value = selectedType;
    document.getElementById('marker-dropdown').value = selectedType;
    applyFilters(selectedType);
    return (selectedType);
}

/**
 * Use Mapbox GL JS's `flyTo` to move the camera smoothly
 * a given center point.
 **/
function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 20,
  });
  sidebar.setAttribute("hidden", "hidden");
}

function makeHighlight(currentFeature) {
  var marker = document.getElementById(
    "marker-" + currentFeature.properties.id
  );
}

//FILTERS

function applyFilters(selectedType) {
    
  const filteredListings = stores.features.filter(store => 
      (selectedType === 'all' || store.properties.markerType === selectedType)
  );
  
  updateListings(filteredListings);
  updateMarkers(filteredListings);

}


function updateListings(filteredListings) {
  // var listings = document.getElementById("listings");
  // listings.innerHTML = '';
  buildLocationList({ type: 'FeatureCollection', features: filteredListings });
}

function updateMarkers(filteredListings) {
  stores.features.forEach(feature => {
      const markerElement = document.getElementById(`marker-${feature.properties.id}`);
      
      if (filteredListings.includes(feature)) {
        if (markerElement) {
              markerElement.style.display = 'inline';
          }
      } else {
          if (markerElement) {;
              markerElement.style.display = 'none';
          }
      }
      document.getElementById('marker-dropdown').style.display = 'none';
  });
}

function showFilter() {
  document.getElementById('marker-dropdown').style.display = 'inline';
}

// TRANSLATION FUNCTION
const translations = {
  it: {
      filterOptions: [
          "Tutte le categorie",
          "Le Porte",
          "Punti d'interesse",
          "Parcheggi", 
          "Portali Gaite", 
          "Mestieri medievali",  
          "Gaita San Giovanni", 
          "Gaita San Giorgio", 
          "Gaita San Pietro", 
          "Gaita Santa Maria", 
          "Bagni Pubblici", 
          "Fontana di Acqua Potabile"
      ]
  },
  en: {
      filterOptions: [
          "All Categories", 
          "The Doors", 
          "Points of Interest",
          "Parking lots", 
          "Gaite Portal", 
          "Medieval Crafts",
          "Gaita San Giovanni", 
          "Gaita San Giorgio", 
          "Gaita San Pietro", 
          "Gaita Santa Maria", 
          "Public Toilet", 
          "Drinking Water Fountain"
      ]
  }
};
// function translate(language) {
  
//   document.getElementById('all').innerHTML = translations[language].filterOptions[0];
//   document.getElementById('entrance').innerHTML = translations[language].filterOptions[1];
//   // document.getElementById('tourism').innerHTML = translations[language].filterOptions[2];
//   document.getElementById('parking').innerHTML = translations[language].filterOptions[3];
//   document.getElementById('portals').innerHTML = translations[language].filterOptions[4];
//   document.getElementById('sanGiovanni').innerHTML = translations[language].filterOptions[6];
//   document.getElementById('sanGiorgio').innerHTML = translations[language].filterOptions[7];
//   document.getElementById('sanPietro').innerHTML = translations[language].filterOptions[8];
//   document.getElementById('santaMaria').innerHTML = translations[language].filterOptions[9];
//   document.getElementById('toilet').innerHTML = translations[language].filterOptions[10];
//   document.getElementById('water').innerHTML = translations[language].filterOptions[11];

  
//   document.getElementById('marker-all').innerHTML = translations[language].filterOptions[0];
//   document.getElementById('marker-entrance').innerHTML = translations[language].filterOptions[1];
//   // document.getElementById('marker-tourism').innerHTML = translations[language].filterOptions[2];
//   document.getElementById('marker-parking').innerHTML = translations[language].filterOptions[3];
//   document.getElementById('marker-portals').innerHTML = translations[language].filterOptions[4];
//   document.getElementById('marker-sanGiovanni').innerHTML = translations[language].filterOptions[6];
//   document.getElementById('marker-sanGiorgio').innerHTML = translations[language].filterOptions[7];
//   document.getElementById('marker-sanPietro').innerHTML = translations[language].filterOptions[8];
//   document.getElementById('marker-santaMaria').innerHTML = translations[language].filterOptions[9];
//   document.getElementById('marker-toilet').innerHTML = translations[language].filterOptions[10];
//   document.getElementById('marker-water').innerHTML = translations[language].filterOptions[11];
  
//   // Reload listings in the correct language
//   language = language;
//   applyFilters(currentFilter);
// }

// function english() {
//   language = 'en';
//   translate('en');
//   document.getElementById('privacy-policy-it').style.display = 'none';
//   document.getElementById('privacy-policy-en').style.display = 'block';
//   // document.getElementById('credits-it').style.display = 'none';
//   // document.getElementById('credits-en').style.display = 'block';
// }

function italian() {
  language = 'it';
  // translate('it');
  document.getElementById('privacy-policy-en').style.display = 'none';
  document.getElementById('privacy-policy-it').style.display = 'block';
  // document.getElementById('credits-en').style.display = 'none';
  // document.getElementById('credits-it').style.display = 'block';
}

// Automatically set the language based on the browser language setting
if (navigator.language === "it" || navigator.language == "it-IT" || navigator.language == "it-CH") {
  language = "it";
  // translate('it');
  document.getElementById('privacy-policy-en').style.display = 'none';
  document.getElementById('privacy-policy-it').style.display = 'block';
  // document.getElementById('credits-en').style.display = 'none';
  // document.getElementById('credits-it').style.display = 'block';
} else {
  language = "en";
  // translate('en');
  document.getElementById('privacy-policy-it').style.display = 'none';
  document.getElementById('privacy-policy-en').style.display = 'block';
  // document.getElementById('credits-it').style.display = 'none';
  // document.getElementById('credits-en').style.display = 'block';
};
