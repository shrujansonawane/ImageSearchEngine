const express = require('express')
const {MongoClient} = require('mongodb')
const app = express()
const port = 8080

const uri = "mongodb+srv://crazyqghost:passmenow@cluster0.xfsgn.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.get('/log', async (req, res) => {
  var ip = req.ip
  console.log(ip);
  res.send('Hello World!')
  const searchQuery = req.query.searchQuery;
  let db = await client.connect();
  await db.db("Cluster0").collection("search").insertOne({query: searchQuery, time: new Date().toISOString()})

  res.status(200).send({
    done: "ok"
  })

})

app.get("/", async (req, res) => {
  res.send({
    status: "working"
  })
})

app.get("/favicon.ico", (req, res) => {
  res.sendFile("favicon.ico", {root: __dirname})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})