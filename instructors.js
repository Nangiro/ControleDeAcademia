const fs = require('fs')
const data = require ('./data.json')

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

    function age (timestamp) {
        const today = new Date() 
        const birthday = new Date(timestamp)
    
        //ANO Exemplo: (2021 - 1993)
        let age = today.getFullYear() - birthday.getFullYear()
    
        const month = today.getMonth() - birthday.getMonth()
    
    
        //Verificando se ja passou o mes do aniversario
        if (month < 0 || month == 0 && today.getDate() < birthday.getDate()) {
            age = age-1
        }
        
        return age
    }

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","), //Trasnformar uma string em um array
        created_at: "",
    }

    return res.render("instructors/show", {instructor})
}

//create
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

//update

//delete

