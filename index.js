const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

function startDb() {
  let connection = mysql.createConnection(config)
  let sql = `CREATE TABLE IF NOT EXISTS people(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255),
    primary key(id)
  )`

  connection.query(sql, () => {
    connection.query(`INSERT INTO people(name) values('Caetano')`, () => {
      connection.end()
    })
  })
}

function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

app.get('/', (_, res) => {
  let connection = mysql.createConnection(config)
  const name = getRandomString(7);
  let sql = `INSERT INTO people(name) values('${name}')`
  connection.query(sql)
  connection.end()

  connection = mysql.createConnection(config)
  sql = `SELECT * FROM people`
  connection.query(sql, (error, results, _) => {
    if (error) {
      res.send(`
        <div>
          <h1>Full Cycle</h1>
          <p>Fail to Acess Database</p>
        </div>
      `)
    }

    res.send(`
        <div>
          <h1>Full Cycle</h1>
          <h2>Users:</h2>
          <ul>
            ${results.map(data => `<li>${data.id}) ${data.name}</li>`)}
          </ul>
        </div>
      `)
  })
  connection.end()
})

startDb();
app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})
