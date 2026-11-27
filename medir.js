const generarVentas = require("./generador.js");

const {
    primeraVentaI,
    totalVendidoI,
    ventaMayorI,
    totalPorCiudadI
} = require("./analitica.js");


const tamanos = [100, 1000, 10000, 100000];

const resultados = [];

for (const n of tamanos) {

    // generar las ventas
    const ventas = generarVentas(n);

    // contadores independientes
    const contadorPrimera = { operaciones: 0 };
    const contadorTotal = { operaciones: 0 };
    const contadorMayor = { operaciones: 0 };
    const contadorCiudades = { operaciones: 0 };

    primeraVentaI(ventas, contadorPrimera);

    totalVendidoI(ventas, contadorTotal);

    ventaMayorI(ventas, contadorMayor);

    totalPorCiudadI(ventas, contadorCiudades);

    // guarda los resultados
    resultados.push({
        n: n,
        primeraVenta: contadorPrimera.operaciones,
        totalVendido: contadorTotal.operaciones,
        ventaMayor: contadorMayor.operaciones,
        totalPorCiudad: contadorCiudades.operaciones
    });
}

console.log("\nMEDICION DE OPERACIONES");

console.table(resultados);
