const ventas = require("./datos.js");

const {
    totalVendido,
    unidadesVendidas,
    ventasPorCiudad,

    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,

    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor

} = require("./analitica.js");

function verificar(nombre, resultadoCiclo, resultadoMetodo) {

    if (resultadoCiclo === resultadoMetodo) {
        console.log(nombre + ": OK");
    } else {
        console.log(nombre + ": DIFERENTE");
        console.log("Ciclo:", resultadoCiclo);
        console.log("Metodo:", resultadoMetodo);
    }

}

console.log("VERIFICACION DE INDICADORES");

verificar(
    "Total vendido",
    totalVendido(ventas),
    totalVendidoM(ventas)
);

verificar(
    "Unidades vendidas",
    unidadesVendidas(ventas),
    unidadesVendidasM(ventas)
);

verificar(
    "Ventas Medellín",
    ventasPorCiudad(ventas, "Medellín"),
    ventasPorCiudadM(ventas, "Medellín")
);

verificar(
    "Ventas Bogotá",
    ventasPorCiudad(ventas, "Bogotá"),
    ventasPorCiudadM(ventas, "Bogotá")
);

// Agrupaciones

console.log("\nTOTAL POR CIUDAD");
console.log(totalPorCiudad(ventas));


// Unidades por producto

console.log("\nUNIDADES POR PRODUCTO");
console.log(unidadesPorProducto(ventas));

// Ranking
console.log("\nTOP 3 PRODUCTOS");
console.log(topProductosPorValor(ventas, 3));

const ordenOriginal = ventas.map(venta => venta.id);

totalPorCiudad(ventas);
unidadesPorProducto(ventas);
topProductosPorValor(ventas, 3);

const ordenFinal = ventas.map(venta => venta.id);

verificar(
    "Orden original de ventas",
    JSON.stringify(ordenOriginal),
    JSON.stringify(ordenFinal)
);