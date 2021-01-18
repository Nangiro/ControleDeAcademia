const express = require('express')
const nunjucks = require('nunjucks')

const server = express ()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views",{
    express: server,
    autoescape: false, //Para colocar links no meio de frases
    noCache: true //Pega informacao do servidor e nao da cache
})

server.get("/", function(req, res){
    const about = {
        avatar_url: "https://www.sideshow.com/storage/product-images/400369/the-child_star-wars_square.jpg",
        name: "Grogu",
        role: "Futuro Jedi",
        description: 'As guardians of peace and justice in the galaxy, they mediate peace negotiations <a href="https://media.giphy.com/media/uNx0YANtETDM6piXju/source.gif" target="_blank">among</a> planets and other factions and, if necessary, use their formidable fighting skills, agility and wisdom to quickly end unrest or neutralize dangerous individuals or threats',
        links: [
            { name: "Github", url: "https://github.com/Nangiro" },
            { name: "Linkedin", url: "https://br.linkedin.com/in/fernandokira" }
        ]
    }

    return res.render("about", { about })
})

server.get("/portifolio", function(req, res){

    return res.render("portifolio", { items: videos })
})

server.get("/video", function(req, res){
    const id = req.query.id

    //fazendo um filtro
    const video = videos.find(function(video){
        return video.id == id

        // Mesma coisa do de cima
        // if(video.id == id){
        //     return true
        // }
    })

    if(!video){
        return res.send("Video not Found!")
    }

    return res.render("video", { item: video }) //Caso achar envia o id do video para pagina video
})

server.listen(5000, function() {
    console.log("Server is running")
})