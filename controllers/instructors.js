const fs = require('fs')
const data = require ('../data.json')
const { age, date } = require('../utils')

//Index
exports.index = function(req,res) {
    return res.render("instructors/index", { instructors: data.instructors })
}

//show
exports.show = function(req,res) {
    // req.params é usado paga pegar o id diretamete da url
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) {
        return res.send("Instructor not found !!!")
    }

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","), //Trasnformar uma string em um array
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at), //Transformando para modelo de data pt br
    }

    return res.render("instructors/show", {instructor})
}

//create
exports.create = function(req,res) {
    return res.render("instructors/create")
}

//post
exports.post = function(req,res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        // Mesma cosia que req.body.avatar_url (exemplo)
        if (req.body[key] == ""){
            return res.send('Please, fill all filds')
        }
    }

    let { avatar_url, birth, name, services, gender} = req.body

    birth = Date.parse(req.body.birth)
    created_at = Date.now()
    id = Number (data.instructors.length + 1)

    data.instructors.push({
        id,
        name,
        avatar_url,
        birth,
        gender,
        services,
        created_at,
    }) //Adicione o req.body no meu array

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect("/instructors")

    }) /* onde salvar, objeto, callback function  */
    //return res.send(req.body)
}

//update / edit
exports.edit = function(req,res){

    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor) {
        return instructor.id == id
    })

    if (!foundInstructor) {
        return res.send("Instructor not found !!!")
    }

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }

    return res.render('instructors/edit', { instructor })
}

//put
exports.put = function(req,res) {

    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex) {
        if (id == instructor.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) {
        return res.send("Instructor not found !!!")
    }

    const instructor = {
        ...foundInstructor, //Trazendo do banco de dados
        ...req.body, //Trazendo do front
        birth: Date.parse(req.body.birth), //Arrumando o birth
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor
    fs.writeFile("data.json",JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return res.send("Write error!")
        }
        return res.redirect(`/instructors/${id}`)
    })
}

//Delete
exports.delete = function(req,res) {
    const { id } = req.body

    //So entra dentro do filteredInstructors o que a funcao retornar como true e tira o que retorna false
    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json",JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error!")

        return res.redirect("/instructors")
    })
}