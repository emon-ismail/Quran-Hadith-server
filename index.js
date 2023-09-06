

const express = require('express');
const cors = require('cors');


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
// middle wares
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://quranUser:ghT0ty8IKHsKji1Q@cluster0.ww1mwol.mongodb.net/?retryWrites=true&w=majority";
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swu9d.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)


async function run(){
try{
  
    const usersCollection = client.db('quranDb').collection('users');
   const quizCollection = client.db("quranDb").collection("quiz");

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




  



    
}
finally{

}
}
run().catch(console.log)


app.get('/', (req, res) => {
    res.send('Quran is running')
})

app.listen(port, () => {
    console.log(`Quran is running on Port  ${port}`);
})





