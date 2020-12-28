const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require("stripe")('sk_test_51I2dfRGKaElLTYFVoFQiRIBiDnIst6aSQ3yqWJCHOJqUt5IgHiXb7viBT77O57QdVeI9zpDt8OwLD5ijFmrQkwm500py8Gor3u')

//API

// App config
const app = express()

// Middleware
app.use(cors({origin : true}))
app.use(express.json());

// API routes

//200=Good
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('Payment request received', total )

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    //201 = OK created something
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})


// Listen command
exports.api = functions.https.onRequest(app)

// http://localhost:5001/clone-a95db/us-central1/api