# Café Origen - Motor de Analítica v0.1

# Descripción del proyecto

Café Origen es un motor de analítica desarrollado en JavaScript que permite procesar información de ventas de una cafetería.

Su propósito es transformar registros de ventas en indicadores que faciliten la toma de decisiones comerciales.

El proyecto utiliza estructuras de datos, ciclos, métodos de arreglos, agrupaciones y ordenamiento para generar reportes de negocio.

# Funcionalidades

- Cálculo del total vendido.
- Cálculo de unidades vendidas.
- Identificación de la venta de mayor valor.
- Cálculo del ticket promedio.
- Consulta de ventas por ciudad.
- Consulta de ventas por fecha.
- Agrupación de ingresos por ciudad.
- Agrupación de unidades por producto.
- Ranking de los tres productos que más dinero generan.
- Verificación de resultados entre ciclos y métodos de arreglos.
- Generación de reportes legibles por consola.


# Cómo ejecutar el proyecto

# 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

# 2. Ingresar a la carpeta

```bash
cd cafe-origen-analitica
```

# 3. Ejecutar las verificaciones

```bash
node src/verificar.js
```

# 4. Generar el reporte de negocio

```bash
node src/reporte.js
```

# Preguntas de negocio que responde

1. ¿Cuánto dinero ha generado la cafetería?
2. ¿Cuántas unidades se han vendido?
3. ¿Cuál es el ticket promedio?
4. ¿Qué ciudad genera mayores ingresos?
5. ¿Qué productos tienen mayor movimiento?
6. ¿Cuáles son los tres productos que más dinero generan?
7. ¿Cuánto se vendió en una fecha específica?
8. ¿Qué sucede cuando no existen ventas en una fecha?

# Control de errores

Esta versión contempla dos problemas identificados durante la depuración:

- Duplicación de ciudades por diferencias en espacios y mayúsculas.
- Resultados `NaN` al calcular el ticket promedio de fechas sin ventas.

Se implementaron pruebas y correcciones para controlar estos casos.

