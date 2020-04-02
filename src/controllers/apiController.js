// Modelo de DB en Sequelize
const db = require('../database/models');
const sequelize = db.sequelize;
 
const controller = {

    users:(req, res) => {
        //Busca todos los usuarios en la DB
        db.Users.findAll(
            {
                order: [ ['id', 'DESC']],
                attributes: ['id','name','surname','email', 'avatar'],
            }
        )
        .then(allUsers => {
            //Genera la metadata: el primer resultado va a ser la URL de la api y el segundo, la cantidad total de usuarios
            let result = {  
                metadata: {
                    url: req.originalUrl,
                    quantity: allUsers.length
                },
                //Devuelve los datos encontrados de todos los usuarios
                data: allUsers
            }
           //Result devuelve la metadata
            return res.send(result);
        })
        .catch(error => console.log(error)); 
    },
    userId: (req, res) => {
        //Busca los usuarios por id
        db.Users
            .findByPk(req.params.id)
            .then(function(oneUser){
                //Si el id existe entonces devuelve el usuario
                if (user != null){
                    res.send(oneUser);
                    //Si NO existe entonces devuelve el error
                } else {
                    res.send("No existe ese usuario")
                }
            })
            .catch(error => res.send(error)); 
    },
    fields:(req, res) => {
        //Dos variables para obetener datos de la DB, una para el precio total y otra para obtener todas las canchas
        let totalAmount = db.Fields.sum('price');
        let allFields = db.Fields.findAll(
            {
                order: [ ['id', 'DESC']],
                attributes: ['id','name','price','description', 'image1'],
            }
           );
    
        // Una vez que se ejecutaron ambas queries, pasamos al then
        Promise.all([totalAmount, allFields])
        
        // 2 parámetros, uno para el AMOUNT y otro para las canchas
        .then (function ([amount, fields]){
            
            //Define el resultado que va a mostrar la API
            let result = {  
                metadata: {
                    url: req.originalUrl,
                    quantity: fields.length, 
                    amount: amount                            
                },
                data: fields
            }
            return res.send(result);
        })
        .catch(error => console.log(error)); 
    },
    fieldId: (req, res) => {
        
        db.Fields
            .findByPk(req.params.id)
            .then(function(oneField){
                if (oneField!= null){
                    res.send(oneField);
                } else{
                    res.send("No existe esa cancha")
                }
            })
            .catch(error => res.send(error)); 
    }
}


module.exports = controller