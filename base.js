const fetchData = async () => {
    const url = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326"
    const res = await fetch(url)
    const data = await res.json()

    initMap(data)
};

const initMap = (data) => {
    let map = L.map('map', {
        minZoom: -3
    }).setView([61.05, 28.2], 12);

    let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap"
    }).addTo(map);

    let geoJson = L.geoJSON(data, {
        onEachFeature: getFeature,
        style: {
            weight: 2
        },
    }).addTo(map)

    let baseMaps = {
        "OpenStreetMap": osm
    }

    L.control.layers(baseMaps).addTo(map);

    map.fitBounds(geoJson.getBounds())
}

const getFeature = (feature, layer) => {
    if (!feature.properties.name) return;
    const name = feature.properties.name
    //console.log(name)

    
    layer.bindTooltip(`${name}`)

    
}


fetchData();

