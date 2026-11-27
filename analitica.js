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


function primeraVentaI(ventas, contador) {

    contador.operaciones++;

    return ventas[0] || null;
}


function totalVendidoI(ventas, contador) {

    let total = 0;

    for (const venta of ventas) {

        // Contamos la visita al registro
        contador.operaciones++;

        // Contamos la comparación cantidad > 0
        contador.operaciones++;

        if (venta.cantidad > 0) {
            total += venta.cantidad * venta.valor;
        }
    }

    return total;
}


function ventaMayorI(ventas, contador) {

    if (ventas.length === 0) {
        return null;
    }

    let mayor = ventas[0];

    for (let i = 1; i < ventas.length; i++) {

        const venta = ventas[i];

        // Contamos la visita al registro
        contador.operaciones++;

        // Contamos la comparación entre importes
        contador.operaciones++;

        if (
            venta.cantidad * venta.valor >
            mayor.cantidad * mayor.valor
        ) {
            mayor = venta;
        }
    }

    return mayor;
}


function totalPorCiudadI(ventas, contador) {

    const agrupaciones = new Map();

    for (const venta of ventas) {

        // Contamos la visita al registro
        contador.operaciones++;

        const ciudad = venta.ciudad.trim().toLowerCase();

        // Contamos la comparación cantidad > 0
        contador.operaciones++;

        if (venta.cantidad > 0) {

            // Contamos la consulta para saber si existe la ciudad
            contador.operaciones++;

            if (agrupaciones.has(ciudad)) {

                const grupo = agrupaciones.get(ciudad);

                grupo.total += venta.cantidad * venta.valor;

            } else {

                agrupaciones.set(ciudad, {
                    ciudad: venta.ciudad.trim(),
                    total: venta.cantidad * venta.valor
                });
            }
        }
    }

    const resultado = {};

    for (const grupo of agrupaciones.values()) {
        resultado[grupo.ciudad] = grupo.total;
    }

    return resultado;
}


function clientesRecurrentes(ventas) {

    const recurrentes = [];

    for (let i = 0; i < ventas.length; i++) {

        for (let j = i + 1; j < ventas.length; j++) {

            if (
                ventas[i].cliente === ventas[j].cliente &&
                !recurrentes.includes(ventas[i].cliente)
            ) {
                recurrentes.push(ventas[i].cliente);
            }
        }
    }

    return recurrentes;
}


function totalCiudadCadena(ventas, ciudad) {

    const ciudadBuscada = ciudad.trim().toLowerCase();

    return ventas
        .map(venta => ({
            ...venta,
            ciudad: venta.ciudad.trim().toLowerCase()
        }))
        .filter(venta => venta.ciudad === ciudadBuscada)
        .map(venta => venta.cantidad * venta.valor)
        .reduce((total, valor) => total + valor, 0);
}


function totalCiudadUnaPasada(ventas, ciudad) {

    const ciudadBuscada = ciudad.trim().toLowerCase();

    let total = 0;

    for (const venta of ventas) {

        const ciudadVenta = venta.ciudad.trim().toLowerCase();

        if (
            ciudadVenta === ciudadBuscada &&
            venta.cantidad > 0
        ) {
            total += venta.cantidad * venta.valor;
        }
    }

    return total;
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
    ventasDelDia,

    primeraVentaI,
    totalVendidoI,
    ventaMayorI,
    totalPorCiudadI,
    clientesRecurrentes,
    totalCiudadCadena,
    totalCiudadUnaPasada

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