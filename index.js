const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.get('/favicon.ico', (req, res) => {
  // You can send a simple 200 OK response or serve a default favicon file here.
  res.status(200).send('OK');
});

// middleware
app.use(cors());
app.use(express.json());





const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swu9d.mongodb.net/?retryWrites=true&w=majority`;
const uri = "mongodb+srv://quranUser:ghT0ty8IKHsKji1Q@cluster0.ww1mwol.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const quizCollection = client.db("quranDb").collection("quiz");
    const usersCollection = client.db("quranDb").collection("users");

    app.get('/quiz', async(req, res) => {
      const result = await quizCollection.find().toArray();
      res.send(result);
    });

    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await usersCollection.insertOne(user);
      res.send(result);
  });

  app.get('/users', async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      res.send(users);
  });


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
//  await client.close();
  }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('Quran is running')
})

app.listen(port, () => {
    console.log(`Quran is running on port ${port}`);
})













