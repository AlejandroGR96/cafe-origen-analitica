const generarVentas = require("./generador.js");
const { clientesRecurrentes } = require("./analitica.js");

const tamanos = [1000, 2000, 4000, 8000, 16000];

const resultados = [];

function medirTiempo(n) {

    const ventas = generarVentas(n);

    const etiqueta = `Clientes recurrentes - ${n} ventas`;

    const inicio = process.hrtime.bigint();

    console.time(etiqueta);

    const resultado = clientesRecurrentes(ventas);

    console.timeEnd(etiqueta);

    const fin = process.hrtime.bigint();

    const tiempoMs = Number(fin - inicio) / 1_000_000;

    return {
        n: n,
        clientesRecurrentes: resultado.length,
        tiempoMs: Number(tiempoMs.toFixed(3))
    };
}


// Medir los cinco tamaños solicitados
for (const n of tamanos) {

    const medicion = medirTiempo(n);

    resultados.push(medicion);
}

console.log("\nTABLA DE TIEMPOS");

console.table(resultados);


// Estimar el tiempo usando la última medición
const ultimaMedicion = resultados[resultados.length - 1];

const tiempoBase = ultimaMedicion.tiempoMs;
const nBase = ultimaMedicion.n;

function estimarTiempo(nObjetivo) {

    return tiempoBase * Math.pow(nObjetivo / nBase, 2);
}

const estimacion100000 = estimarTiempo(100000);
const estimacion1000000 = estimarTiempo(1000000);

console.log("\nESTIMACIONES");

console.log(
    "100.000 ventas:",
    (estimacion100000 / 1000).toFixed(2),
    "segundos estimados"
);

console.log(
    "1.000.000 ventas:",
    (estimacion1000000 / 1000).toFixed(2),
    "segundos estimados"
);


// Ejecutar 100.000 únicamente si la estimación es menor a 2 minutos
if (estimacion100000 < 120000) {

    console.log("\nLa estimación permite probar 100.000 ventas.");

    const medicion100000 = medirTiempo(100000);

    resultados.push(medicion100000);

    console.log("\nRESULTADOS ACTUALIZADOS");

    console.table(resultados);

} else {

    console.log(
        "\nNo se ejecutan las 100.000 ventas porque la estimación alcanza o supera los 2 minutos."
    );
}
