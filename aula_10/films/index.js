const express = require('express')
const app = express();
const Axios = require('axios');
const port = process.env.PORT || 3000;
const urlApi = 'https://swapi.co/api/';
const array = [{}]
var films = []

app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));

app.get('/',(req,resp)=>{
    resp.send({message:'Olá, insira na url "/films" para acessar os filmes de STAR WARS'}).status(200);
})
app.get('/films',(req,resp)=>{
    Axios.default.get('https://swapi.co/api/films')
    .then((coisa)=>coisa.data)
    .then((rows)=>{
        let id = 0;
         rows.results.forEach((row)=>{
            films.push({id:id,...row})
            id++
            
        })     
        resp.render('index.ejs', {films})
   
        console.log('OK');


    })
    .catch((err)=>{
        resp.json({message:err})
    })

})

app.get('/films/:id',(req,resp)=>{
    const id = req.params.id;
    console.log("ID:", id)
    resp.render('dados.ejs', {films, id})
    /* resp.json(films[id]) */
}).listen(port);



