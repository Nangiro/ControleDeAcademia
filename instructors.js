const fs = require('fs')
const data = require ('./data.json')

//create
exports.post = function(req,res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        // Mesma cosia que req.body.avatar_url (exemplo)
        if (req.body[key] == ""){
            return res.send('Please, fill all filds')
        }
    }

    req.body.birth = Date.parse(req.body.birth)
    req.body.created_at = Date.now()

    data.instructors.push(req.body) //Adicione o req.body no meu array

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect("/instructors")

    }) /* onde salvar, objeto, callback function  */
    //return res.send(req.body)
}

//update

//delete

