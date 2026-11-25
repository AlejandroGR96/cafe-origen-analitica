const ventas = require('./datos.js');

function valorVenta(venta) {
    return venta.cantidad * venta.valor;
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

// Caso 3

function totalVendidoM(ventas) {
    return ventas
        .filter(venta => venta.cantidad > 0)
        .map(venta => valorVenta(venta))
        .reduce((total, valor) => total + valor, 0);
}


function unidadesVendidasM(ventas) {
    return ventas
        .filter(venta => venta.cantidad > 0)
        .map(venta => venta.cantidad)
        .reduce((total, cantidad) => total + cantidad, 0);
}


function ventasPorCiudadM(ventas, ciudad) {
    const ciudadBuscada = ciudad.trim().toLowerCase();

    return ventas
        .filter(venta =>
            venta.cantidad > 0 &&
            venta.ciudad.trim().toLowerCase() === ciudadBuscada
        )
        .map(venta => valorVenta(venta))
        .reduce((total, valor) => total + valor, 0);
}


function totalPorCiudad(ventas) {
    const agrupado = ventas.reduce((acumulador, venta) => {
        const clave = venta.ciudad.trim().toLowerCase();

        if (!acumulador[clave]) {
            acumulador[clave] = {
                ciudad: venta.ciudad.trim(),
                total: 0
            };
        }

        if (venta.cantidad > 0) {
            acumulador[clave].total += valorVenta(venta);
        }

        return acumulador;

    }, {});

    return Object.entries(agrupado).reduce((resultado, [clave, dato]) => {
        resultado[dato.ciudad] = dato.total;
        return resultado;
    }, {});
}

function unidadesPorProducto(ventas) {
    return ventas.reduce((acumulador, venta) => {

        if (!acumulador[venta.producto]) {
            acumulador[venta.producto] = 0;
        }

        if (venta.cantidad > 0) {
            acumulador[venta.producto] += venta.cantidad;
        }

        return acumulador;

    }, {});
}

function topProductosPorValor(ventas, k) {

    const agrupado = ventas.reduce((acumulador, venta) => {

        if (!acumulador[venta.producto]) {
            acumulador[venta.producto] = 0;
        }

        if (venta.cantidad > 0) {
            acumulador[venta.producto] += valorVenta(venta);
        }

        return acumulador;

    }, {});

    const productos = Object.entries(agrupado).map(([producto, total]) => {
        return {
            producto: producto,
            total: total
        };
    });

    return [...productos]
        .sort((a, b) => b.total - a.total)
        .slice(0, k);
}

function ventasDelDia(ventas, fecha) {

    // Filtrar las ventas de la fecha indicada
    const ventasFecha = ventas.filter(venta =>
        venta.fecha === fecha && venta.cantidad > 0
    );

    // Calcular el total de dinero vendido
    const total = ventasFecha.reduce((acumulador, venta) => {
        return acumulador + valorVenta(venta);
    }, 0);

    // Calcular las unidades vendidas
    const unidades = ventasFecha.reduce((acumulador, venta) => {
        return acumulador + venta.cantidad;
    }, 0);

    // Contar las ventas válidas
    const cantidadVentas = ventasFecha.length;

    // Evitar división entre cero
    const promedio = cantidadVentas === 0
        ? 0
        : total / cantidadVentas;

    return {
        fecha: fecha,
        cantidadVentas: cantidadVentas,
        unidades: unidades,
        total: total,
        ticketPromedio: promedio
    };
}

module.exports = {

    //Funciones con ciclos
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,

    //Funciones con metodos
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,

    //Agrupaciones y rankings
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,

    //Analisis por fecha
    ventasDelDia
};

//console.log("Valor total de ventas:$", valorVenta(ventas));
console.log("Total Vendido:$", totalVendido(ventas))
console.log("Unidades vendidas: ", unidadesVendidas(ventas))
console.log("Venta mayor: \n", ventaMayor(ventas))
console.log("Ticket Promedio: $", ticketPromedio(ventas).toFixed(2))
console.log("Ventas Medellín: $", ventasPorCiudad(ventas, "medellín"));
console.log("Ventas Bogotá: $", ventasPorCiudad(ventas, " Bogotá "));
console.log(ventasDelDia(ventas, "2026-09-01")); // Dia con ventas
console.log(ventasDelDia(ventas, "2026-09-07")); // Dia sin Ventas