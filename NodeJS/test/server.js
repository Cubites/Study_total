const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

let corsOptions = {
    origin: "http://localhost:4000"
}
app.use(cors(corsOptions));
const port = process.env.PORT || 4000;

// 미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
// /미들웨어
const data = fs.readFileSync('./database/db.json');
const conf = JSON.parse(data);

const connection = mysql.createConnection({
   host: conf.host,
   user: conf.user,
   password: conf.password,
   port: conf.port,
   database: conf.database
});
console.log(connection);
connection.connect();


app.get('/api/server-practice', (req, res) => {
    let offset = 0;
    let limits = 30;
    let sql = `select * from restaurant_ggy order by id desc LIMIT ${offset}, ${limits}`;
    console.log(sql);
    connection.query(
        sql, (err, rows, fields) => {
            res.send(rows);
        }
    )
})

app.listen(port, () => console.log(`Listening on port ${port}`));