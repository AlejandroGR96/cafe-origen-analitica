function generarVentas(n) {

    const productos = [
        { nombre: "Origen Huila 500 g", precio: 42000 },
        { nombre: "Origen Nariño 250 g", precio: 26000 },
        { nombre: "Prensa francesa", precio: 95000 },
        { nombre: "Origen Sierra 500 g", precio: 45000 },
        { nombre: "Molino manual", precio: 120000 }
    ];

    const ciudades = [
        "Medellin",
        "Bogota",
        "Cali",
        "Pereira"
    ];

    const ventas = [];

    // Cantidad de clientes diferentes
    const cantidadClientes = Math.max(1, Math.floor(n / 3));

    for (let i = 0; i < n; i++) {

        // Elegir un producto al azar
        const indiceProducto = Math.floor(
            Math.random() * productos.length
        );

        const producto = productos[indiceProducto];

        // Elegir una ciudad al azar
        const indiceCiudad = Math.floor(
            Math.random() * ciudades.length
        );

        // Elegir un cliente al azar
        const numeroCliente = Math.floor(
            Math.random() * cantidadClientes
        ) + 1;

        // Crear la venta
        const venta = {
            id: i + 1,
            fecha: "2026-09-01",
            cliente: `C${String(numeroCliente).padStart(2, "0")}`,
            producto: producto.nombre,
            ciudad: ciudades[indiceCiudad],
            cantidad: Math.floor(Math.random() * 5) + 1,
            valor: producto.precio
        };

        ventas.push(venta);
    }

    return ventas;
}

module.exports = generarVentas;
