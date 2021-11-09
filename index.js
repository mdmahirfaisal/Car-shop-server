const express = require('express')
const { MongoClient } = require('mongodb');
// const admin = require("firebase-admin");

const app = express()
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000



// middle ware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uwoya.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });





async function run() {
    try {
        await client.connect();
        console.log('super car database connected successfully');
        const database = client.db("super_car_shop");
        const productsCollection = database.collection("products");
        // const usersCollection = database.collection("users");




        // GET API appointments 
        // app.get('/appointments', verifyToken, async (req, res) => {
        //     const email = req.query.email;
        //     const date = req.query.date;
        //     console.log(date, email);
        //     const query = { email: email, date: date };
        //     const cursor = appointmentsCollection.find(query);
        //     const appointments = await cursor.toArray();
        //     res.json(appointments);

        // })

        // POST API appointments 
        // app.post('/appointments', async (req, res) => {
        //     const appointment = req.body;
        //     const result = await appointmentsCollection.insertOne(appointment);
        //     res.json(result);
        // });

        // GET API specific user email
        // app.get('/users/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const query = { email: email };
        //     const user = await usersCollection.findOne(query);
        //     let isAdmin = false;
        //     if (user?.role === 'admin') {
        //         isAdmin = true;
        //     };
        //     res.json({ admin: isAdmin });

        // });


        // POST API users
        // app.post('/users', async (req, res) => {
        //     const user = req.body;
        //     const result = await usersCollection.insertOne(user);
        //     res.json(result);
        // });

        // PUT API users
        // app.put('/users', async (req, res) => {
        //     const user = req.body;
        //     const filter = { email: user.email }
        //     const options = { upsert: true };
        //     const updateDoc = { $set: user }
        //     const result = await usersCollection.updateOne(filter, updateDoc, options);
        //     res.json(result);
        // });

        // PUT API users admin
        // app.put('/users/admin', verifyToken, async (req, res) => {
        //     const user = req.body;
        //     const requester = req.decodedEmail;
        //     if (requester) {
        //         const requesterAccount = await usersCollection.findOne({ email: requester });
        //         if (requesterAccount.role === 'admin') {
        //             const filter = { email: user.email };
        //             const updateDoc = { $set: { role: 'admin' } };
        //             const result = await usersCollection.updateOne(filter, updateDoc);
        //             res.json(result);
        //         }
        //     }
        //     else {
        //         res.status(403).json({ message: 'your do not have access to make admin' })
        //     }

        // })


    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Super Car Shop  "API"   Here')
})

app.listen(port, () => {
    console.log(` listening ${port}`)
})