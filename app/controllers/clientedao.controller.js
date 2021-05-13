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
exports.findByCedulaRest= async (req,res)=>{
    try{
        cliente= await Client.findOne({
            where:{cedula:req.params.ci}
        });
        if(cliente)res.status(200).send(cliente)
        else res.status(400).send(null)
        console.log(cliente)


    }catch (error){
        res.status(400).send({
            message:"Error el servidor"
        })
    }
}

findByCedula= async (cedula)=>{

    //var ban=false;
    cliente= await Client.findOne({
        where:{cedula:cedula}
    });
    if(cliente){
        console.log("1")
        return "Cliente con cedula="+cedula+" ya existe"

    }else{
        console.log("2")
        return ""
    }
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
    console.log("data", req.body)
    findByCedula(req.body.cedula)
        .then(message=>{
            if(!message){
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
            }else{
                res.status(400).send({message})
            }
        })
};