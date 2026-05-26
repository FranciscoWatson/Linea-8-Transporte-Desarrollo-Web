document.addEventListener('DOMContentLoaded', () => {
    // Verificar si estamos en la página de recorrido
    const mapElement = document.getElementById('map');
    
    if (mapElement) {
        // Inicializar el mapa centrado entre Ezeiza y Capital
        const map = L.map('map').setView([-34.7000, -58.4500], 11);

        // Añadir capa de OpenStreetMap (estilo limpio)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Definir iconos
        const mainStopIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: #0079ef; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.6);"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        const intermediateIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: #fff; width: 8px; height: 8px; border-radius: 50%; border: 2px solid #0079ef; box-shadow: 0 0 2px rgba(0,0,0,0.3);"></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        });

        // Todas las paradas (Ruta completa y detallada)
        const paradas = [
            { name: "La Boca (Terminal Ramal A)", coords: [-34.6340, -58.3640], main: true },
            { name: "Olavarría y Hernandarias", coords: [-34.6300, -58.3660], main: false },
            { name: "Hospital Argerich (Necochea)", coords: [-34.6280, -58.3680], main: false },
            { name: "Parque Lezama (Azopardo)", coords: [-34.6240, -58.3690], main: false },
            { name: "Paseo Colón y San Juan", coords: [-34.6180, -58.3690], main: false },
            { name: "Paseo Colón y Belgrano", coords: [-34.6110, -58.3695], main: false },
            { name: "Plaza de Mayo", coords: [-34.6083, -58.3712], main: true },
            { name: "Av. de Mayo y Perú", coords: [-34.6090, -58.3750], main: false },
            { name: "Av. de Mayo y 9 de Julio", coords: [-34.6095, -58.3800], main: false },
            { name: "Plaza del Congreso", coords: [-34.6095, -58.3923], main: true },
            { name: "Plaza Miserere (Once)", coords: [-34.6110, -58.4050], main: false },
            { name: "Primera Junta (Caballito)", coords: [-34.6180, -58.4250], main: false },
            { name: "Plaza Flores", coords: [-34.6250, -58.4550], main: false },
            { name: "Villa Luro", coords: [-34.6350, -58.4850], main: false },
            { name: "Liniers (Av. Gral Paz)", coords: [-34.6406, -58.5284], main: true },
            { name: "Gral. Paz y Alberdi (Mataderos)", coords: [-34.6500, -58.5200], main: false },
            { name: "Autopista Dellepiane / Ricchieri", coords: [-34.6700, -58.4900], main: false },
            { name: "Peaje Ricchieri", coords: [-34.6850, -58.4950], main: false },
            { name: "Mercado Central", coords: [-34.7088, -58.5027], main: true },
            { name: "Aldo Bonzi", coords: [-34.7200, -58.5050], main: false },
            { name: "Ciudad Evita", coords: [-34.7400, -58.5150], main: false },
            { name: "Puente 12 (Camino de Cintura)", coords: [-34.7600, -58.5200], main: false },
            { name: "Puente 13 (AFA)", coords: [-34.7800, -58.5250], main: false },
            { name: "Barrio Uno (Ezeiza)", coords: [-34.8000, -58.5300], main: false },
            { name: "Aeropuerto Ezeiza", coords: [-34.8150, -58.5348], main: true }
        ];

        // Trazar la ruta (línea azul)
        const latlngs = paradas.map(p => p.coords);
        
        const polyline = L.polyline(latlngs, {
            color: '#0079ef',
            weight: 4,
            opacity: 0.8,
            smoothFactor: 1
        }).addTo(map);

        // Añadir TODOS los marcadores
        paradas.forEach(parada => {
            const icon = parada.main ? mainStopIcon : intermediateIcon;
            const marker = L.marker(parada.coords, { icon: icon }).addTo(map);
            
            if (parada.main) {
                marker.bindPopup(`<b>${parada.name}</b><br>Parada Principal`);
            } else {
                marker.bindPopup(`${parada.name}`);
            }
        });

        // Ajustar el zoom para que se vea toda la ruta
        map.fitBounds(polyline.getBounds(), {padding: [30, 30]});
    }
});