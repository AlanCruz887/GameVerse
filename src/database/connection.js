const sql = require("mssql");
const dbSettings = {
    user: 'Alan887',
    password: 'HailedSquare881',
    server:'localhost',
    database:'GAMEVERSE',
    options:{
        encrypt: true,
        trustServerCertificate: true
    }
}


async function getConnection(){
    try {
        const pool = await sql.connect(dbSettings);
        return pool ;
    } catch (error) {
        console.error(error)
    }
}
module.exports = {sql,getConnection};