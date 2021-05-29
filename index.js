const express =  require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const mysql = require('mysql')
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "database10"
});
app.get('/', (req,res) => {
    res.send(`
    <html>
        <body>
            <form action="/todo" method="post">
                <input name="deskripsi" />
                <button>Add</button>
            </form>
        </body>
    </html>`)
})
app.post('/todo',(req,res)=> {  
    con.connect(function(err){
        const kata = req.body.deskripsi
        con.query("INSERT INTO tugas1(deskripsi) values (?)",[kata])
    })
    res.end() 
})
app.get('/todo', (req ,res) => {
    con.connect(function(err) {     
        var data ="" 
        con.query("SELECT * FROM tugas1", function (err, result) {
            res.json(result)
            res.end()
        });
      });
})
app.delete('/todo/:id', (req, res)=> {
    con.query('DELETE FROM tugas1 WHERE id = ?', [req.params.id]); 
    res.end()
})
app.listen(3000,function() {
    console.log("server sudah jalan.....")
})
