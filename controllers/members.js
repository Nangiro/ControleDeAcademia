const fs = require('fs')
const data = require ('../data.json')
const { date } = require('../utils')

//Index
exports.index = function(req,res) {
    return res.render("members/index", { members: data.members })
}

//show
exports.show = function(req,res) {
    // req.params é usado paga pegar o id diretamete da url
    const { id } = req.params

    const foundMember = data.members.find(function(member) {
        return member.id == id
    })

    if (!foundMember) {
        return res.send("Member not found !!!")
    }

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthday
    }

    return res.render("members/show", {member})
}

//create
exports.create = function(req,res) {
    return res.render("members/create")
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

    let { 
        avatar_url, 
        name, 
        email, 
        gender, 
        blood, 
        weight, 
        height
    } = req.body

    birth = Date.parse(req.body.birth)

    let id = 1

    const lastMember = data.members[data.members.length-1]
    
    if (lastMember) {
        id = lastMember.id +1
    }

    data.members.push({
        ...req.body,
        id,
        birth
    }) //Adicione o req.body no meu array

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect("/members")

    }) /* onde salvar, objeto, callback function  */
    //return res.send(req.body)
}

//update / edit
exports.edit = function(req,res){

    const { id } = req.params

    const foundMember = data.members.find(function(member) {
        return member.id == id
    })

    if (!foundMember) {
        return res.send("Member not found !!!")
    }

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render('members/edit', { member })
}

//put
exports.put = function(req,res) {

    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex) {
        if (id == member.id) {
            index = foundIndex
            return true
        }
    })

    if (!foundMember) {
        return res.send("Member not found !!!")
    }

    const member = {
        ...foundMember, //Trazendo do banco de dados
        ...req.body, //Trazendo do front
        birth: Date.parse(req.body.birth), //Arrumando o birth
        id: Number(req.body.id)
    }

    data.members[index] = member
    fs.writeFile("data.json",JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return res.send("Write error!")
        }
        return res.redirect(`/members/${id}`)
    })
}

//Delete
exports.delete = function(req,res) {
    const { id } = req.body

    //So entra dentro do filteredMembers o que a funcao retornar como true e tira o que retorna false
    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json",JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error!")

        return res.redirect("/members")
    })
}