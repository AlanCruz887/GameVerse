const {sql,getConnection} = require('../database/connection')

const controllerPrincipal = {}


controllerPrincipal.index = (req,res)=>{
    res.render('../src/views/index.ejs')
}


module.exports = controllerPrincipal

