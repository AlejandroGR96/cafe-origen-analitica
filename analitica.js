const ventas = require('./datos.js');

function valorVentas(ventas) {
    let total = 0;

    for (let i = 0; i < ventas.length; i++) {
        total += ventas[i].valor * ventas[i].cantidad;
        //console.log(total)
    }

    return total;
}

function totalVendido(ventas) {

    let total = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += venta.cantidad * venta.valor;
        }
    }

    return total;

}

function unidadesVendidas(ventas) {
    
    let total = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += venta.cantidad;
        }
    }

    return total;
}

function ventaMayor(ventas) {

    let mayor = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            let totalVenta = venta.cantidad * venta.valor;

            if (mayor === 0 || totalVenta > (mayor.cantidad * mayor.valor)) {
                mayor = venta;
            }
        }
    }

    return mayor;
}

function ticketPromedio(ventas) {
    let total = 0;
    let cantidadVentas = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
            total += venta.cantidad * venta.valor;
            cantidadVentas++;
        }
    }

    if (cantidadVentas === 0) {
        return 0;
    }

    return total / cantidadVentas;
}

function ventasPorCiudad(ventas, ciudad) {

    let total = 0;
    let ciudadBuscada = ciudad.trim().toLowerCase();

    for (const venta of ventas) {
        if (venta.cantidad > 0 && venta.ciudad.trim().toLowerCase() === ciudadBuscada) {
            total += venta.cantidad * venta.valor;
        }
    }

    return total;
}

console.log("Valor total de ventas:$", valorVentas(ventas));
console.log("Total Vendido:$", totalVendido(ventas))
console.log("Unidades vendidas: ", unidadesVendidas(ventas))
console.log("Venta mayor: \n", ventaMayor(ventas))
console.log("Ticket Promedio: $",ticketPromedio(ventas).toFixed(2))
console.log("Ventas Medellín: $", ventasPorCiudad(ventas, "medellín"));
console.log("Ventas Bogotá: $", ventasPorCiudad(ventas, " Bogotá "));
