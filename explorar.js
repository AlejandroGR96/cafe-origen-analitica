const ventas = require('./datos.js');

console.log("Cantidad de registros:", ventas.length);      // 5: cantidad de elementos
console.log("Primer elemento:", ventas[0]);                // primer elemento
console.log("Último elemento:", ventas[ventas.length-1]);  // último elemento
console.log("Producto en posición 4: ", ventas[3].producto, "\n"); // elemento en posicion 4      
console.table(ventas); // Mostrar la tabla de ventas en la consola      
//ventas.push(nuevoRegistro);          
//console.log(ventas.length);    