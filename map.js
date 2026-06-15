const mapElement = document.getElementById('map');

// Kartta-alustan alustaminen ja kartan luominen.
// Koordinaatit on asetettu Helsingin keskustaan (60.1699, 24.9384) ja zoom-taso on 10.

if (mapElement) {
    const map = L.map('map').setView([60.1699, 24.9384], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([60.1699, 24.9384]).addTo(map)
        .bindPopup('Betha-Testattu')
        .openPopup();
}