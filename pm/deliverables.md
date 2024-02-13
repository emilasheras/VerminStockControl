# Entregables

## Entrega 3 - Servidor con express


- [x] Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.
- [x] Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos
- [x] Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.
    En este caso lo estoy importando en el archivo ProductRouter. que estoy interpretando como un "controlador".
- [x] El servidor debe contar con los siguientes endpoints
    - [x] ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
        - [x] Si no se recibe query de límite, se devolverán todos los productos.
        - [x] Si se recibe un límite, sólo devolver el número de productos solicitados
    - [x] ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos.

### Pruebas rapidas para la correccion
Todos los productos
``` 
    http://localhost:8080/products
```
Un producto
``` 
    http://localhost:8080/products/1
```
Limitar productos
```
    http://localhost:8080/products?limit=3
```

extras
- [x] Pre-cargar 10 productos: Asegurar que el archivo de productos contenga al menos diez productos antes de la entrega.
    Archivo `/src/data/products.json`
- [x] Correr el servidor en el puerto 8080 y probar los endpoints mediante un navegador.
    Archivo `/app.js`. Variable de entorno `SERVER_PORT` en el archivo `.env`.

## Entrega 2
- [x] ...
## Entrega 1
- [x] ...