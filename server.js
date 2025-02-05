//Modulos implementados
import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

//Configuración de Express
const app = express();
//Middleware para datos json en req.body.
app.use(express.json());
//Middleware para solicitudes del cliente codificadas en URL ("false" es mas seguro que "true", ya que no permite estructuras anidadas posiblemente maliciosas)
app.use(express.urlencoded({ extended: true}));
//Middleware que registra la entrada de la solicitud en tiempo real.
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();    
})
// Middleware para archivos estáticos
//app.use(express.static(`${__dirname}/public`)); //falta algo

//Ruta principal del proyecto
app.get("/", (req,res) =>{
  res
    .status(200)
    .send('Pagina principal')
})

//Rutas modularizadas
app.use("/", productsRouter);
app.use("/", cartsRouter);
 
// Si pongo valores inexistentes me devuelve un mensaje y un status
app.get("*", (req,res) =>{
  res
    .status(404)
    .send('Lo que buscás no existe')
})

//Configuración del SERVER
const PORT = 8080;
const SERVER = app.listen(PORT, ()=> console.log(`Servidor corriendo en PUERTO: ${PORT}`));
