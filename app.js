// app.js — Servidor Express con la API del reporte de autobuses

const express = require('express');
const { capacidad, clasificarViaje, resumenPorTipo } = require('./reporte.js');

const app = express();
const PORT = 3000;

// Datos de los viajes del día (arreglo de objetos)
const viajes = [
    { tipo: 'P', pasajeros: 15 },
    { tipo: 'G', pasajeros: 40 },
    { tipo: 'P', pasajeros: 8 },
    { tipo: 'G', pasajeros: 55 },
    { tipo: 'P', pasajeros: 20 },
    { tipo: 'G', pasajeros: 25 },
    { tipo: 'P', pasajeros: 12 },
    { tipo: 'G', pasajeros: 60 }
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

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
