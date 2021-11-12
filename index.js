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
        const ordersCollection = database.collection("orders");
        const usersCollection = database.collection("users");


        // GET API Load all orders
        app.get('/orders', async (req, res) => {
            const cursor = ordersCollection.find({});
            const orders = await cursor.toArray();
            res.json(orders);
        })

        // GET API orders by specific user
        app.get('/orders', async (req, res) => {
            const email = req.query.email;
            console.log(email);
            const query = { email: email, };
            const cursor = ordersCollection.find(query);
            const orders = await cursor.toArray();
            res.json(orders)
        })

        // POST API  orders send to database
        app.post('/orders', async (req, res) => {
            const orders = req.body;
            console.log(orders);
            const result = await ordersCollection.insertOne(orders);
            res.json(result);
        });

        // GET API specific user email
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            let isAdmin = false;
            if (user?.role === 'admin') {
                isAdmin = true;
            };
            res.json({ admin: isAdmin });

        });


        // POST API users
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.json(result);
        });

        // PUT API users
        app.put('/users', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email }
            const options = { upsert: true };
            const updateDoc = { $set: user }
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.json(result);
        });

        // PUT API users admin
        app.put('/users/admin', async (req, res) => {
            const user = req.body;
            const requester = req.decodedEmail;
            if (requester) {
                const requesterAccount = await usersCollection.findOne({ email: requester });
                if (requesterAccount.role === 'admin') {
                    const filter = { email: user.email };
                    const updateDoc = { $set: { role: 'admin' } };
                    const result = await usersCollection.updateOne(filter, updateDoc);
                    res.json(result);
                }
            }
            else {
                res.status(403).json({ message: 'your do not have access to make admin' })
            }

        })


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