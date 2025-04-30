
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
  zoom: 18.2,
  scrollZoom: true,
});

var stores = {
  type: "FeatureCollection",
  features: [      
    // PANNELLO 0
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.3910983197146036, 43.10480413880485],
      }, 
      properties: {
        address_it: "L'umbria in classe",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 0",
        markerType: "panel0",
        img: "https://clf4d.dev/fotofsa/picture.php?/5116/category/277",
        site: "https://www.istitutosantanna.com/"
      },
    },

    // PANNELLO 1
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391358705311927, 43.10464296262472],
      }, 
      properties: {
        address_it: "La scuola in camicia nera",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: `Pannello 1`,
        markerType: "panel1",
        img: "https://clf4d.dev/fotofsa/index.php?/category/278",
        site: "https://webxr.run/P3dRJwGYOr8A4"
      },
    },
    
    // PANNELLO 2
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391507050410365, 43.10451313889803, ],
      }, 
      properties: {
        address_it: "La foto di classe",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 2",
        markerType: "panel2",
        img: "https://clf4d.dev/fotofsa/index.php?/category/281",
        site: "https://webxr.run/55Gmd26lez4X2",
      },
    },
    
    // PANNELLO 3
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391653655290698, 43.1043846937967],
      }, 
      properties: {
        address_it: "La radio a scuola",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 3",
        markerType: "panel3",
        img: "https://clf4d.dev/fotofsa/index.php?/category/279",
        site: "https://webxr.run/oPQaXyo9yb21N",
      },
    },
    
    // PANNELLO 4
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.39174838459799, 43.10428588968922],
      }, 
      properties: {
        address_it: "Radici di futuro",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 4",
        markerType: "panel4",
        img: "https://clf4d.dev/fotofsa/index.php?/category/287",
        site: "https://webxr.run/55pnv69g394o2",
      },
    },

    // PANNELLO 5
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391626642369769, 43.1042116175783],
      }, 
      properties: {
        address_it: "Le scuole rurali",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 5",
        markerType: "panel5",
        img: "https://clf4d.dev/fotofsa/index.php?/category/283",
        site: "https://webxr.run/dY7050pdW8XZ",
      },
    },

    // PANNELLO 6
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391493364478103, 43.10413338107681],
      }, 
      properties: {
        address_it: "Le scuole per contadini",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 6",
        markerType: "panel6",
        img: "https://clf4d.dev/fotofsa/index.php?/category/280",
        site: "https://webxr.run/3NoDaOY6RVW2",
      },
    },

    // PANNELLO 7(8)
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391356808703952, 43.10405583568679],
      }, 
      properties: {
        address_it: "Istruzione tecnica",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 7",
        markerType: "panel7",
        img: "https://clf4d.dev/fotofsa/index.php?/category/289",
        site: "https://webxr.run/4XwoNyY8dwer3",
      },
    },

    // PANNELLO 8(9)
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391197493634106, 43.10417769268415],
      }, 
      properties: {
        address_it: "Il museo della scuola",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 8",
        markerType: "panel8",
        img: "https://clf4d.dev/fotofsa/index.php?/category/286",
        site: "https://webxr.run/xER5WXrkyQyGk",
      },
    },

    // PANNELLO 9 (10)
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391045764996159,43.104310627313716],
      }, 
      properties: {
        address_it: "La scoperta dell'infanzia",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 9",
        markerType: "panel9",
        img: "https://clf4d.dev/fotofsa/index.php?/category/284",
        site: "https://webxr.run/VOk7O82LA2Am4",
      },
    },

    // PANNELLO 10(11)
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.390916795653906, 43.10445187004133],
      }, 
      properties: {
        address_it: "Il sistema dei licei",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 10",
        markerType: "panel10",
        img: "https://clf4d.dev/fotofsa/index.php?/category/285",
        site: "https://webxr.run/RYXkDv5aaG0zZ",
      },
    },
    // PANNELLO 11(12)
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391064180771064, 43.10454242558743],
      }, 
      properties: {
        address_it: "Il viaggio continua",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 11",
        markerType: "panel11",
        img: "https://clf4d.dev/fotofsa/index.php?/category/288",
        site: "https://www.istitutosantanna.com/",
      },
    },
    // PANNELLO 12(7)
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.391177977249525, 43.10468920668317],
      }, 
      properties: {
        address_it: "L'educatorio S. Anna e gli educandati",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello 12",
        markerType: "panel12",
        img: "https://clf4d.dev/fotofsa/index.php?/category/282",
        site: "https://webxr.run/Ll6v5JAMD19Q0",
      },
    },
    // PANNELLO SMA
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [12.39130694659178, 43.10435548689001],
      }, 
      properties: {
        address_it: "Mostra Smascherati",
        city: "Perugia",
        country: "Italy",
        postalCode: "06121",
        description_it: "Pannello Smascherati",
        markerType: "panelSma",
        img: "https://izwla.zappar.io/6180731706942438470/v76.0/",
        site: "https://www.smascherati.it/",
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


let currentPopup = null;
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

    /*Add attributes for accessibility*/

    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", `${marker.properties.address_it}, ${marker.properties.description_it || "Pannello informativo"}`);

    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        el.click();
    }
});
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
      e.stopPropagation();
      
      var destination = marker.geometry.coordinates;
      
      // Contenuto del popup
      var siteLabel = (marker.properties.markerType === "panelSma" || marker.properties.markerType === "panel0") ? "Visita il sito" : "Scopri di più";

      var popupContent = `
          <p class="address">${(marker.properties.address_it || marker.properties.address_en).replace(/\n/g, "<br>")}</p>
          <div class="popup-buttons">
              <button class="popup-btn site-btn" onclick="window.open('${marker.properties.site}', '_blank')">${siteLabel}</button>
              <button class="popup-btn navigate-btn" onclick="window.open('${marker.properties.img}', '_blank')">Mostra</button>
          </div>
        `;

        if (currentPopup) {
        currentPopup.remove();
      }
      
      currentPopup = new mapboxgl.Popup({ closeOnClick: true })
          .setLngLat(destination)
          .setHTML(popupContent)
          .addTo(map);
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
    link.setAttribute("tabindex", "0")
  
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

function updateMarkers(filteredListings) {
  stores.features.forEach(feature => {
    const markerElement = document.getElementById(`marker-${feature.properties.id}`);
    
    if (filteredListings.includes(feature)) {
      if (markerElement) {
        markerElement.style.display = 'inline';
      }
    } else {
      if (markerElement) {
        markerElement.style.display = 'none';
      }
    }
  });
}

function applyFilters(selectedType) {
  let filteredListings;

  if (selectedType === 'all') {
    filteredListings = stores.features;
  } else if (selectedType === 'panels012') {
    filteredListings = stores.features.filter(store => {
      const type = store.properties.markerType;
      return type && /^panel\d+$/.test(type) && type !== 'panelSma';
    });
  } else if (selectedType === 'panelSma') {
    filteredListings = stores.features.filter(store => store.properties.markerType === 'panelSma');
  } else {
    filteredListings = stores.features.filter(store => store.properties.markerType === selectedType);
  }

  updateListings(filteredListings);
  updateMarkers(filteredListings);
  console.log(filteredListings);
}


function updateListings(filteredListings) {
  // var listings = document.getElementById("listings");
  // listings.innerHTML = '';
  buildLocationList({ type: 'FeatureCollection', features: filteredListings });
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

function english() {
  language = 'en';
  translate('en');
  document.getElementById('privacy-policy-it').style.display = 'none';
  document.getElementById('privacy-policy-en').style.display = 'block';
  // document.getElementById('credits-it').style.display = 'none';
  // document.getElementById('credits-en').style.display = 'block';
}

function italian() {
  language = 'it';
  // translate('it');
  // document.getElementById('privacy-policy-en').style.display = 'none';
  // document.getElementById('privacy-policy-it').style.display = 'block';
  // document.getElementById('credits-en').style.display = 'none';
  // document.getElementById('credits-it').style.display = 'block';
}

// Automatically set the language based on the browser language setting
if (navigator.language === "it" || navigator.language == "it-IT" || navigator.language == "it-CH") {
  language = "it";
  // translate('it');
  // document.getElementById('privacy-policy-en').style.display = 'none';
  // document.getElementById('privacy-policy-it').style.display = 'block';
  // document.getElementById('credits-en').style.display = 'none';
  // document.getElementById('credits-it').style.display = 'block';
} else {
  language = "en";
  // translate('en');
  // document.getElementById('privacy-policy-it').style.display = 'none';
  // document.getElementById('privacy-policy-en').style.display = 'block';
  // document.getElementById('credits-it').style.display = 'none';
  // document.getElementById('credits-en').style.display = 'block';
};
