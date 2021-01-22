const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")

const server = express ()
server.use(express.urlencoded({extended:true}))
server.use(express.static('public'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views",{
    express: server,
    autoescape: false, //Para colocar links no meio de frases
    noCache: true //Pega informacao do servidor e nao da cache
})

server.listen(5000, function() {
    console.log("Server is running")
})