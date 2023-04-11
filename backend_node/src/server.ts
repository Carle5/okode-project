import express from "express";
import cors from "cors";
import NodeCache = require('node-cache');
var XMLHttpRequest = require('xhr2');
const cache = new NodeCache({ stdTTL: 600, checkperiod: 100 });

const baseUrl = 'https://api.themoviedb.org/3/';
const params = {
    api_key: '850cbabd4109822978b7ee9caee2d449',
   language: 'es-ES'
};

const app = express();

app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"],
}));

// Middleware para validar el token de acceso
const validarToken = (req:any, res:any, next:any) => {
    const token = req.headers['authorization'];
    if(!token) return res.status(401).send({ error: 'Token no proporcionado' });
    if(token !== 'contraseña') return res.status(403).send({ error: 'Token inválido' });
    next();
}

const sendHttpRequest = (method:string,url:string, cacheKey:string) => {
    const promise = new Promise((resolve, reject) => {
        const cacheValue = cache.get(cacheKey);
        if(!cacheValue){
            const xhr = new XMLHttpRequest();
            xhr.open(method,url);

            xhr.responseType = 'json';
            xhr.setRequestHeader('Authorization', 'contraseña');

            xhr.onload = () => {
                    cache.set(cacheKey, xhr.response);
                    resolve(xhr.response);
            }

            xhr.send();
        } else { console.log("Obteniendo los datos desde la cache"); resolve(cacheValue); }
    })
    return promise;
}

app.get("/api/movies", validarToken, (req, res,) => {
    sendHttpRequest("GET", `${baseUrl}movie/popular?api_key=${params.api_key}&language=${params.language}&page=1`, "movies").then(movie => {
        res.send(movie);
    })
})

app.get("/api/movies/search/:searchTerm", validarToken, (req,res) =>{
    const searchTerm = req.params.searchTerm;
    sendHttpRequest("GET", `${baseUrl}/search/movie?api_key=${params.api_key}&language=${params.language}&query=${searchTerm}&page=1)`, searchTerm).then(movies => {
        res.send(movies);
    })
})

app.get("/api/movies/:idMovie", validarToken, (req,res) =>{
    const idMovie = req.params.idMovie;
    sendHttpRequest("GET", `${baseUrl}movie/${idMovie}?api_key=${params.api_key}&language=${params.language}`, idMovie).then(movies => {
        res.send(movies);
    })
})

app.listen(5000, () =>{
    console.log("Website served on http://localhost:5000")
})