//Modulos implementados
import express from 'express';
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';
import { __dirname } from './utils.js';
import path from 'path';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';

// Configuración de mongoose
const MONGO_URI = 'mongodb://localhost:27017/tienda'; 

try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB');
} catch (error) {
    console.error('Error al conectar a MongoDB:', error);
}


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

// Configuración de Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(`${__dirname}/views`));
 
//Rutas modularizadas
app.use("/", cartsRouter);
app.use("/", productsRouter);
app.use("/", viewsRouter);

// Middleware para archivos estáticos
app.use(express.static(`${__dirname}/public`));

// Si pongo valores inexistentes me devuelve un mensaje y un status
app.get("*", (req,res) =>{
  res
    .status(404)
    .send('Lo que buscás no existe')
})

//Configuración del SERVER
const PORT = 8080;
const SERVER = app.listen(PORT, ()=> console.log(`Servidor corriendo en PUERTO: ${PORT}`));
