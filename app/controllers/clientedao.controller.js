const db = require("../models");
const Client= db.Cliente;
const  Op= db.Sequelize.Op;

exports.findAll=(req,res) => {
    Client.findAll()
        .then(data =>{
            res.status(200).send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:"Error en el servidor"
            });
        });
};

findByCedula=(cedula)=>{
    console.log("Falla aca")
    //var ban=false;
    Client.findOne({
        where:{cedula:cedula}
    }).then(data=>{
        console.log("Falla aca2");
        return true
    })
        .catch(err =>{
            return false
        })
    //console.log("Falla aca5")
    ///return ban;
}

//method that find a Client by its Id
exports.findOne=(req,res) => {
    const pk= req.params.id;
    Client.findByPk(pk)
        .then(data=>{
            if (data==null){
                res.status(404).send({
                    message:"El Cliente con id="+pk+" no existe"
                });
            }else {
                res.status(200).send(data);
            }
        })
        .catch(err=>{
            res.status(400).send({
                message:"Error al obtener cliente id="+pk+" no existe"
            });
        });
};

//function that create a new Client
exports.create= (req,res)=>{
    //check if cedula is already existed

    ban=findByCedula(req.body.cedula)
    if (ban) {
        res.status(400).send({
            message: "El usuario ya existe"
        })
    }else {
        //create a new client
        const client= {
            nombre:req.body.nombre,
            apellido:req.body.apellido,
            cedula:req.body.cedula
        };
        Client.create((client))
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err=>{
                res.status(500).send({
                    message: err.message || "Ocurrio un error al crear cliente"
                });
            });
    }


};