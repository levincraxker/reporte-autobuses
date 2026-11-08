// reporte.js — Lógica del reporte de viajes de autobuses

// Capacidad de cada tipo de vehículo
const capacidad = {
    P: 20,  // pequeño
    G: 60   // grande
};

// Función tradicional: clasifica un viaje como "Ganancia" o "Pérdida"
// Ganancia si los pasajeros >= 50% de la capacidad
function clasificarViaje(tipo, pasajeros) {
    const minimo = capacidad[tipo] * 0.5;
    return pasajeros >= minimo ? 'Ganancia' : 'Pérdida';
}

// Resumen por tipo de vehículo usando .filter() y .reduce()
function resumenPorTipo(viajes, tipo) {
    const delTipo = viajes.filter(v => v.tipo === tipo);            // .filter()
    const total = delTipo.reduce((acc, v) => acc + v.pasajeros, 0); // .reduce()
    return {
        tipo: tipo === 'P' ? 'Pequeño' : 'Grande',
        numeroViajes: delTipo.length,
        totalPasajeros: total,
        promedio: (total / delTipo.length).toFixed(2)
    };
}

// Exportamos para que el servidor pueda usarlas
module.exports = { capacidad, clasificarViaje, resumenPorTipo };
