DICCIONARIO DE DATOS

- Id int(entero) Identificador unico de cada venta
- Fecha (cadena de texto o formato de fecha) fecha en la que se realizo la venta
- Cliente string(cadena de texto) codigo para identificar al cliente que realizo la compra
- Producto string(cadena de texto) nombre del producto vendido
- Ciudad string(cadena de texto) ciudad asociado al cliente o donde se encuentra la venta del producto
- Cantidad int(entero) cantidad de unidades compradas o vendidas
- Valor int(entero) valor de cada producto

CASOS BORDER DETECTADOS

- Cantidad igual a cero, la cantidad registrada es 0, lo que nos indica que no se vendieron unidades, aunque existe un registro de venta con un valor de 42.000, para solucionarlo revisaria si se trata de una venta cancelada, un error de digitación o un registro de prueba

- Se identifica algunos clientes con multiples compras, esto puede generar confusion si se cuentan los registros como clientes diferentes, mantendria los registros porque representan compras diferentes, pero utilizar el codigo del cliente para identificar compradores unicos y evitar duplicarlos en los analisis

- Ciudades con escrituras desiguales (Medellín-medellin)La ciudad aparece escrita como Medellín y medellín, esto nos puede generar duplicados al filtrar informacion por ciudad, para solucionarlo colocaria los nombres de las ciudades, utilizando mayuscula inicial

PSEUDOCODIGO

- Valor Ventas

INICIO

total = 0

PARA i = 0 HASTA longitud(ventas) - 1 HACER

    total = total + (ventas[i].valor * ventas[i].cantidad)

FIN PARA

RETORNAR total

FIN

- Total Vendidos

INICIO

total = 0

PARA CADA venta EN ventas HACER

    SI venta.cantidad > 0 ENTONCES

        total = total + (venta.cantidad * venta.valor)

    FIN SI

FIN PARA

RETORNAR total

FIN

- Unidades Vendidas

INICIO

    total = 0

    PARA CADA venta EN ventas HACER

        SI venta.cantidad > 0 ENTONCES

            total = total + venta.cantidad

        FIN SI

    FIN PARA

    RETORNAR total

FIN

- Venta Mayor

INICIO

mayor = 0

PARA CADA venta EN ventas HACER

    SI venta.cantidad > 0 ENTONCES

        totalVenta = venta.cantidad * venta.valor

        SI mayor == 0 O totalVenta > (mayor.cantidad * mayor.valor) ENTONCES

            mayor = venta

        FIN SI

    FIN SI

FIN PARA

RETORNAR mayor

FIN

- Ticket Promedio

INICIO

total = 0
cantidadVentas = 0

PARA CADA venta EN ventas HACER

    SI venta.cantidad > 0 ENTONCES

        total = total + (venta.cantidad * venta.valor)

        cantidadVentas = cantidadVentas + 1

    FIN SI

FIN PARA

SI cantidadVentas == 0 ENTONCES

    RETORNAR 0

FIN SI

    RETORNAR total / cantidadVentas

FIN

- Ventas por Ciudad

INICIO

total = 0

ciudadBuscada = convertirAMinusculas(eliminarEspacios(ciudad))

PARA CADA venta EN ventas HACER

    ciudadVenta = convertirAMinusculas(eliminarEspacios(venta.ciudad))

    SI venta.cantidad > 0 Y ciudadVenta == ciudadBuscada ENTONCES

        total = total + (venta.cantidad * venta.valor)

    FIN SI

FIN PARA

RETORNAR total

FIN

Funcion------- Que recorro?------- Que filtro? ------- Que transforma?------- Que acumula?------- Como agrupo?
totalVendidoM     Ventas     Cantidad mayor a 0        Venta en valor total     Dinero               No agrupa
unidadesVendidasM Ventas     Cantidad mayor a 0        Venta en cantidad        Unidades             No agrupa
ventasPorCiudadM  Ventas     Ciudad y cantidad valida  Venta en valor total     Dinero               Por ciudad mediante comparacion
totalPorCiudad    Ventas     Cantidad valida para sumar Ciudad normalizada      Dinero               Diccionario por ciudad
unidadesPorProducto Ventas   Cantidad valida para sumar Producto en clave       Unidades             Diccionario por producto
topProductosPorValor Ventas  Cantidad valida para sumar Entradas objeto productosDinero por producto Diccionario ordenamiento y seleccion

Predicción del crecimiento de operaciones

Objetivo: Antes de ejecutar las pruebas, estimar cómo aumentará el número de operaciones cuando la cantidad de registros (`n`) se multiplique por 10.

1. Mis predicciones

- primeraVentaI: considero que siempre realizara una operacion, independientemente del tamaño del arreglo, porque solamente consulta la primera posición. Su crecimiento será constante.
- totalVendidoI: considero que realizara dos operaciones contadas por cada registro: una visita y una comparación. Si los registros aumentan 10 veces, las operaciones también aumentaran 10 veces.
- ventaMayorI: considero que recorrerá todos los registros excepto el primero, realizando una visita y una comparación por cada uno. Su crecimiento será lineal.
- totalPorCiudadI: considero que recorrerá todos los registros y realizara tres operaciones contadas por registro, porque todas las ventas generadas tienen cantidades positivas. Su crecimiento también será lineal.

2. Predicción según Big O

| Función | Predicción | Justificación |
|---|---|---|
| primeraVentaI | O(1) | Accede directamente a la primera posicion. |
| totalVendidoI | O(n) | Recorre todos los registros una vez. |
| ventaMayorI | O(n) | Recorre todos los registros para encontrar el mayor. |
| totalPorCiudadI | O(n) | Recorre todos los registros para agruparlos. |

3. Comparación pendiente

Después de ejecutar medir.js, registrare los resultados reales y compararé si coinciden con mis predicciones.

Conclusión inicial: Espero que las funciones lineales aumenten aproximadamente 10 veces sus operaciones cuando la cantidad de registros aumente 10 veces. En cambio, la funcion constante deberia mantener siempre el mismo numero de operaciones.

Diagnóstico de clientes recurrentes

1. Objetivo

Analizar el rendimiento de la función clientesRecurrentes() para entender por qué tarda demasiado cuando aumenta la cantidad de ventas registradas.

2. Verificación con los datos del Día 1

Se utilizó el arreglo original de 12 ventas de Café Origen

Resultado esperado:

["C01", "C02", "C03"]

