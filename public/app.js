// app.js (navegador) — Consume la API del servidor

// Función asíncrona que pide el reporte por viaje
async function cargarReporte() {
    try {
        const respuesta = await fetch('/api/reporte');
        const viajes = await respuesta.json();

        const contenedor = document.getElementById('lista-viajes');

        // .map() para transformar cada viaje en una tarjeta HTML
        const tarjetas = viajes.map((viaje) => {
            const clase = viaje.resultado === 'Ganancia' ? 'ganancia' : 'perdida';
            return `
                <div class="card">
                    <h3>${viaje.tipo}</h3>
                    <p>${viaje.pasajeros} pasajeros</p>
                    <p class="${clase}">${viaje.resultado}</p>
                </div>
            `;
        });

        contenedor.innerHTML = tarjetas.join(''); // .join() une las tarjetas
    } catch (error) {
        console.log('Error al cargar el reporte:', error);
    }
}

// Función asíncrona que pide el resumen por tipo
async function cargarResumen() {
    try {
        const respuesta = await fetch('/api/resumen');
        const resumen = await respuesta.json();

        const contenedor = document.getElementById('lista-resumen');

        // Destructuración de los dos objetos del resumen
        const { pequeno, grande } = resumen;

        contenedor.innerHTML = `
            <div class="card">
                <h3>${pequeno.tipo}</h3>
                <p>${pequeno.numeroViajes} viajes</p>
                <p>${pequeno.totalPasajeros} pasajeros</p>
                <p>Promedio: ${pequeno.promedio}</p>
            </div>
            <div class="card">
                <h3>${grande.tipo}</h3>
                <p>${grande.numeroViajes} viajes</p>
                <p>${grande.totalPasajeros} pasajeros</p>
                <p>Promedio: ${grande.promedio}</p>
            </div>
        `;
    } catch (error) {
        console.log('Error al cargar el resumen:', error);
    }
}

// Llamar a las funciones al cargar la página
cargarReporte();
cargarResumen();
