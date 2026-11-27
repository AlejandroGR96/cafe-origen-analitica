const generarVentas = require("./generador.js");

const {
    totalCiudadCadena,
    totalCiudadUnaPasada
} = require("./analitica.js");

// Generar 10.000 ventas
const ventas = generarVentas(10000);

// Elegir una ciudad para comparar
const ciudad = "Medellín";

// Ejecutar ambas funciones
const resultadoCadena = totalCiudadCadena(ventas, ciudad);

const resultadoUnaPasada = totalCiudadUnaPasada(ventas, ciudad);

// Mostrar resultados
console.log("COMPARACIÓN DE TOTAL POR CIUDAD");

console.log("Ventas generadas:", ventas.length);

console.log("Resultado con cadena:", resultadoCadena);

console.log("Resultado con una pasada:", resultadoUnaPasada);

// Verificar si los resultados son iguales
if (resultadoCadena === resultadoUnaPasada) {

    console.log("RESULTADO: OK - Ambas funciones coinciden");

} else {

    console.log("RESULTADO: ERROR - Los resultados son diferentes");
}
