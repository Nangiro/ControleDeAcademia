module.exports = {
    age: function (timestamp) {
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
    },
    date: function(timestamp) {
        const date = new Date (timestamp)

        //yyyy
        const year = date.getUTCFullYear()

        //mm (mes vai de 0 a 11)
        const month = `0${date.getUTCMonth() +1}`.slice(-2) //Pegando os ultimos 2 digitos

        //dd (de 1 a 31)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthday: `${day}/${month}`
        }
        
    }
}