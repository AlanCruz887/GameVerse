const {sql,getConnection} = require('../database/connection')

const controllerPrincipal = {}


controllerPrincipal.login = (req,res)=>{
    res.render('../src/views/login.ejs')
}

controllerPrincipal.account = (req,res)=>{
    res.render('../src/views/cuenta.ejs')
}



module.exports = controllerPrincipal

