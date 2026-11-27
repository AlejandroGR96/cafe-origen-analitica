# Informe técnico de rendimiento — Café Origen

**Versión:** 0.2  
**Proyecto:** Motor de analítica Café Origen  
**Propósito:** Evaluar el rendimiento temporal y espacial de las funciones del motor de analítica.

## 1. Alcance y metodología

Se analiza el comportamiento de las funciones del motor con respecto al número de ventas procesadas.

- **Complejidad temporal:** cantidad de trabajo que realiza una función al crecer el número de registros.
- **Complejidad espacial:** memoria adicional que necesita la función para realizar su trabajo.
- **Medición:** tiempo real registrado al ejecutar las funciones con datos generados.
- **Operaciones:** conteo de operaciones realizado por las funciones instrumentadas.

Las mediciones deben ejecutarse en el mismo equipo y bajo condiciones similares para que la comparación sea útil.

## 2. Clasificación de funciones

En la tabla, `n` representa el número de ventas y `k` representa la cantidad de grupos distintos (ciudades, productos o clientes).

| Función | Qué hace | Tiempo | Espacio | Justificación | Operaciones o tiempo con 10.000 ventas |
|---|---|---:|---:|---|---|
| `valorVenta` | Calcula cantidad × valor de una venta. | O(1) | O(1) | Realiza una multiplicación y accede a dos propiedades. | Pendiente de medición |
| `valorVentas` | Calcula el valor de las ventas recibidas. | O(n) | O(1) | Recorre los registros y acumula los importes en una variable. | Pendiente de medición |
| `totalVendido` | Calcula el dinero vendido con ciclos. | O(n) | O(1) | Recorre las ventas una vez y utiliza un acumulador. | Pendiente de medición |
| `unidadesVendidas` | Suma las unidades vendidas. | O(n) | O(1) | Recorre las ventas y acumula cantidades sin crear colecciones. | Pendiente de medición |
| `ventaMayor` | Encuentra la venta de mayor valor. | O(n) | O(1) | Compara cada registro con el mayor encontrado y conserva una sola referencia. | Pendiente de medición |
| `ticketPromedio` | Calcula el promedio de las ventas válidas. | O(n) | O(1) | Recorre las ventas, acumula valores y cuenta registros válidos. | Pendiente de medición |
| `ventasPorCiudad` | Suma las ventas de una ciudad usando ciclos. | O(n) | O(1) | Examina cada registro y acumula solo los que coinciden con la ciudad. | Pendiente de medición |
| `totalVendidoM` | Calcula el total usando métodos de arreglos. | O(n) | O(n) | `filter` y `map` generan arreglos intermedios antes de reducirlos. | Pendiente de medición |
| `unidadesVendidasM` | Suma unidades mediante métodos encadenados. | O(n) | O(n) | Los métodos de filtrado y transformación crean arreglos adicionales. | Pendiente de medición |
| `ventasPorCiudadM` | Calcula ventas de una ciudad con métodos. | O(n) | O(n) | Filtra registros y utiliza arreglos intermedios para calcular el resultado. | Pendiente de medición |
| `totalPorCiudad` | Agrupa el dinero vendido por ciudad. | O(n) | O(k), peor caso O(n) | Recorre las ventas y almacena acumuladores por cada ciudad encontrada. | Pendiente de medición |
| `unidadesPorProducto` | Agrupa las unidades vendidas por producto. | O(n) | O(k), peor caso O(n) | Recorre las ventas y guarda un acumulador por producto distinto. | Pendiente de medición |
| `topProductosPorValor` | Ordena productos según su valor vendido y devuelve los primeros. | O(n + k log k) | O(k) | Agrupa los productos, crea una colección de resultados y la ordena. En el peor caso, k puede crecer hasta n. | Pendiente de medición |
| `ventasDelDia` | Calcula ventas, unidades, total y promedio de una fecha. | O(n) | O(n) | Filtra las ventas del día y crea un arreglo con los registros seleccionados. | Pendiente de medición |
| `clientesRecurrentes` | Encuentra clientes que aparecen más de una vez. | O(n²) | O(n) | Utiliza dos ciclos anidados para comparar pares de ventas y guarda clientes recurrentes. | Pendiente de medición |
| `primeraVentaI` | Obtiene la primera venta y cuenta operaciones. | O(1) | O(1) | Accede directamente a la posición cero del arreglo. | 1 operación teórica |
| `totalVendidoI` | Calcula el total y cuenta operaciones. | O(n) | O(1) | Realiza una visita y una comprobación por cada venta. | 20.000 operaciones teóricas |
| `ventaMayorI` | Encuentra la venta mayor y cuenta operaciones. | O(n) | O(1) | Compara cada registro posterior con el mayor encontrado. | 19.998 operaciones teóricas |
| `totalPorCiudadI` | Agrupa ventas por ciudad y cuenta operaciones. | O(n) | O(k), peor caso O(n) | Recorre los registros y conserva acumuladores en un `Map`. | 30.000 operaciones teóricas |
| `totalCiudadCadena` | Calcula el total de una ciudad con métodos encadenados. | O(n) | O(n) | Realiza transformaciones, filtros y reducciones; crea tres arreglos intermedios. | Pendiente de medición |
| `totalCiudadUnaPasada` | Calcula el total de una ciudad con un ciclo. | O(n) | O(1) | Recorre las ventas una vez, sin crear arreglos intermedios. | Pendiente de medición |

**Nota:** Las operaciones instrumentadas son conteos teóricos derivados de la implementación descrita. Deben contrastarse con el contador que arroje el programa. Las mediciones de tiempo real se deben completar con la salida de la terminal.

## 3. Proyección

La proyección estima cuánto podría tardar cada reporte al procesar 1.000.000 de ventas.

Para las funciones lineales se utiliza:

`T(1.000.000) ≈ T(10.000) × 100`

Para las funciones cuadráticas se utiliza:

`T(1.000.000) ≈ T(10.000) × 10.000`

Estas fórmulas suponen que el comportamiento observado se mantiene al aumentar el tamaño de los datos. Son estimaciones, no tiempos garantizados.

| Función o reporte | Complejidad | Tiempo medido con 10.000 ventas | Proyección con 1.000.000 |
|---|---:|---:|---:|
| `totalVendido` | O(n) | Pendiente | Tiempo medido × 100 |
| `unidadesVendidas` | O(n) | Pendiente | Tiempo medido × 100 |
| `ventaMayor` | O(n) | Pendiente | Tiempo medido × 100 |
| `ticketPromedio` | O(n) | Pendiente | Tiempo medido × 100 |
| `ventasPorCiudad` | O(n) | Pendiente | Tiempo medido × 100 |
| `totalPorCiudad` | O(n) | Pendiente | Tiempo medido × 100 |
| `unidadesPorProducto` | O(n) | Pendiente | Tiempo medido × 100 |
| `topProductosPorValor` | O(n + k log k) | Pendiente | Calcular según k y la medición |
| `ventasDelDia` | O(n) | Pendiente | Tiempo medido × 100 |
| `clientesRecurrentes` | O(n²) | Pendiente | Tiempo medido × 10.000 |
| `totalCiudadCadena` | O(n) | Pendiente | Tiempo medido × 100 |
| `totalCiudadUnaPasada` | O(n) | Pendiente | Tiempo medido × 100 |

No se proyectan tiempos sin una medición real de referencia.

## 4. Riesgos

Orden de mayor a menor riesgo de crecimiento:

1. **`clientesRecurrentes` — riesgo muy alto.**  
   Su complejidad es O(n²). Los ciclos anidados comparan una venta con las ventas posteriores. Cuando aumenta el historial, aumenta considerablemente el número de comparaciones.

2. **`topProductosPorValor` — riesgo dependiente de la variedad de productos.**  
   Agrupa los productos y después ordena los resultados. Su costo de ordenamiento es O(k log k). Si existen muchos productos diferentes, el trabajo de ordenamiento aumenta.

3. **Funciones que crean arreglos intermedios — riesgo de memoria.**  
   `totalCiudadCadena`, `totalVendidoM`, `unidadesVendidasM`, `ventasPorCiudadM` y `ventasDelDia` pueden necesitar memoria adicional proporcional a los registros procesados.

4. **Agrupaciones — riesgo dependiente de la cantidad de grupos.**  
   `totalPorCiudad`, `unidadesPorProducto` y `totalPorCiudadI` almacenan información por cada grupo distinto. Su espacio puede crecer hasta O(n).

5. **Funciones lineales con memoria constante — riesgo moderado o bajo.**  
   Los ciclos simples recorren los registros una vez. Su tiempo crece proporcionalmente a n, pero su memoria auxiliar permanece en O(1).

El criterio de clasificación considera la velocidad de crecimiento de la complejidad temporal y la cantidad de memoria adicional requerida. El orden debe revisarse con las mediciones reales.

## 5. Plan de optimización

### Función prioritaria: `clientesRecurrentes`

**Problema identificado**

La implementación actual utiliza dos ciclos anidados. Para cada venta, busca si el mismo cliente aparece en las ventas siguientes. Esto provoca que se repitan comparaciones entre registros.

Con cinco ventas, el número de comparaciones entre pares es:

`4 + 3 + 2 + 1 = 10`

La cantidad general de comparaciones es:

`n × (n - 1) / 2`

Por eso, el tiempo de ejecución crece de forma cuadrática: O(n²).

**Idea de mejora, sin implementar todavía**

Utilizar una estructura `Map` o `Set` para guardar los clientes que ya se han encontrado.

El procedimiento propuesto sería:

1. Recorrer las ventas una sola vez.
2. Consultar si el cliente ya apareció.
3. Si no apareció, guardarlo en una estructura de búsqueda.
4. Si ya apareció, identificarlo como recurrente.
5. Evitar agregar el mismo cliente varias veces al resultado.

**¿Qué trabajo se repite?**

La búsqueda del mismo cliente mediante comparaciones repetidas entre diferentes posiciones del arreglo.

**¿Qué información se podría guardar?**

Se podría guardar el cliente que ya fue visto y, si se necesita, un contador de cuántas veces aparece. Así no sería necesario volver a comparar todas las ventas anteriores.

**Mejora esperada**

La estrategia con `Map` o `Set` permitiría buscar y registrar clientes en tiempo promedio O(1) por operación. De esta manera, el recorrido completo podría pasar de O(n²) a O(n) en tiempo promedio, utilizando O(n) de memoria adicional.

Esta mejora es una propuesta pendiente de implementación y medición.

## 6. Conclusiones

- Las funciones que recorren los registros una sola vez presentan complejidad temporal O(n).
- Las funciones que utilizan arreglos intermedios pueden consumir más memoria que las implementaciones con ciclos.
- `totalCiudadUnaPasada` permite obtener el mismo resultado que `totalCiudadCadena`, pero utiliza memoria auxiliar O(1).
- `clientesRecurrentes` es la prioridad de optimización por su complejidad cuadrática.
- Las proyecciones deben actualizarse con los tiempos medidos y no con valores supuestos.
- La selección de una implementación debe considerar tanto el tiempo como el consumo de memoria.

## 7. Evidencia de mediciones

Completar esta sección con las salidas reales de:

- `node src/medir.js`
- `node src/medir_recurrentes.js`
- `node src/verificar_espacio.js`

**Equipo utilizado:** Pendiente de registrar.  
**Fecha de medición:** Pendiente de registrar.  
**Observaciones:** Pendiente de registrar los resultados de ejecución.