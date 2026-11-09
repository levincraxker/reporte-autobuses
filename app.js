// app.js — Servidor Express con la API del reporte de autobuses

const express = require('express');
const { capacidad, clasificarViaje, resumenPorTipo, agregarViaje } = require('./reporte.js');

const app = express();
app.use(express.static('public'));
const PORT = 3000;

// Datos de los viajes del día (arreglo de objetos)
const viajes = [
    { tipo: 'P', pasajeros: 5 },
    { tipo: 'G', pasajeros: 10 },
    { tipo: 'P', pasajeros: 5 },
    { tipo: 'G', pasajeros: 10 },
    { tipo: 'P', pasajeros: 5 },
    { tipo: 'G', pasajeros: 10 },
    { tipo: 'P', pasajeros: 5 },
    { tipo: 'G', pasajeros: 10 },
];

// Ruta: reporte completo por viaje (.map() + destructuración)
app.get('/api/reporte', (req, res) => {
    const reporte = viajes.map(({ tipo, pasajeros }) => ({
        tipo: tipo === 'P' ? 'Pequeño (20)' : 'Grande (60)',
        pasajeros,
        resultado: clasificarViaje(tipo, pasajeros)
    }));
    res.json(reporte);
});

// Ruta: resumen por tipo de vehículo
app.get('/api/resumen', (req, res) => {
    const resumen = {
        pequeno: resumenPorTipo(viajes, 'P'),
        grande: resumenPorTipo(viajes, 'G')
    };
    res.json(resumen);
});

// Ruta: los viajes en bruto (para ver el JSON en DevTools)
app.get('/api/viajes', (req, res) => {
    res.json(viajes);
});

// Ruta que muestra un viaje agregado con spread (sin modificar el arreglo original)
app.get('/api/agregar', (req, res) => {
    const viajeNuevo = { tipo: 'G', pasajeros: 45 };
    const viajesActualizados = agregarViaje(viajes, viajeNuevo);
    res.json({
        original: viajes.length,
        actualizado: viajesActualizados.length,
        viajesActualizados
    });
});


// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
