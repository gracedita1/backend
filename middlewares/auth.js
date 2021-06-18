const mysql = require('mysql')
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "database10"
});
//
module.exports = function (req, res, next) {
    const username = req.headers.username
    const password = req.headers.password

    con.connect(function(err){
        con.query("SELECT * FROM tugas4 WHERE username=? AND password=?",[username,password], function(err, row){
            if (row){
                next()
            } else { 
                res.send(401)
            }
        })
    })
}