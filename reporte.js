
const ventas = require("./datos.js");

const {
    totalVendido,
    unidadesVendidas,
    ticketPromedio,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
} = require("./analitica.js");

// Formatear valores monetarios en pesos colombianos
function formatoPesos(valor) {
    return `$${valor.toLocaleString("es-CO")} COP`;
}

// Formatear numeros con separadores de miles
function formatoNumero(valor) {
    return valor.toLocaleString("es-CO");
}

// Mostrar resumen de un día
function mostrarResumenDia(resultado) {

    console.log(`\nFecha consultada: ${resultado.fecha}`);

    if (resultado.cantidadVentas === 0) {
        console.log("No se registraron ventas para esta fecha.");
    }

    console.log(`Ventas válidas: ${formatoNumero(resultado.cantidadVentas)}`);
    console.log(`Unidades vendidas: ${formatoNumero(resultado.unidades)}`);
    console.log(`Total vendido: ${formatoPesos(resultado.total)}`);
    console.log(`Ticket promedio: ${formatoPesos(resultado.ticketPromedio)}`, "\n");
}


console.log("1. RESUMEN GENERAL - CAFE ORIGEN");

console.log(`Total vendido: ${formatoPesos(totalVendido(ventas))}`);
console.log(`Unidades vendidas: ${formatoNumero(unidadesVendidas(ventas))}`);
console.log(`Ticket promedio: ${formatoPesos(ticketPromedio(ventas))}`, "\n");

console.log("2. VENTAS POR CIUDAD");

const ciudades = totalPorCiudad(ventas);

const tablaCiudades = Object.entries(ciudades).map(([ciudad, total]) => ({
    Ciudad: ciudad,
    "Total vendido": formatoPesos(total)
}));

console.table(tablaCiudades);


console.log("3. UNIDADES VENDIDAS POR PRODUCTO");

const productos = unidadesPorProducto(ventas);

const tablaProductos = Object.entries(productos).map(([producto, unidades]) => ({
    Producto: producto,
    Unidades: formatoNumero(unidades)
}));

console.table(tablaProductos);

console.log("4. TOP 3 PRODUCTOS POR VALOR GENERADO");

const topProductos = topProductosPorValor(ventas, 3);

const tablaTop = topProductos.map((producto, indice) => ({
    Posicion: indice + 1,
    Producto: producto.producto,
    "Valor generado": formatoPesos(producto.total)
}));

console.table(tablaTop);

console.log("5. RESUMEN DIARIO");

// Día con ventas
console.log("\n--- DIA CON VENTAS ---");

const diaConVentas = ventasDelDia(ventas, "2026-09-01");

mostrarResumenDia(diaConVentas);

// Día sin ventas
console.log("\n--- DIA SIN VENTAS ---");

const diaSinVentas = ventasDelDia(ventas, "2026-09-07");

mostrarResumenDia(diaSinVentas);

console.log("\n" + "-".repeat(55));
console.log("       FIN DEL REPORTE - CAFE ORIGEN v0.1");
console.log("-".repeat(55));

