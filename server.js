//Configuración de Express
import express from 'express'
const app = express();
const PORT = 8080;

app.get("/", (req,res) =>{
    res.send('Pagina principal')
})

//Configuración del SERVER
const SERVER = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en PUERTO: ${PORT}`)
})


hola