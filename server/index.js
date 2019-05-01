require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const db = require('../database/index.js');
const getStats = require('./services.js');

mongoose
  .connect(process.env.DREWBREESDB, { useNewUrlParser: true })
  .then(res => {
    console.log('Connected to database');
  })
  .catch(err => {
    console.log('Error connecting to database', err);
  });

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/../build`));

setInterval(async () => {
  upsert();
}, 60 * 1000);

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: `${__dirname}/../build` });
});

app.get('/yards', async (req, res) => {
  db.Entry.find({ _id: 'yards' }).exec((err, response) => {
    if (response.length) {
      res.send(response[0].yards);
    } else {
      console.log('Error fetching:', err);
      res.send('error');
    }
  });
});

async function upsert() {
  const yards = await getStats();
  const timeStamp = new Date();
  db.Entry.updateOne(
    { _id: 'yards' },
    {
      _id: 'yards',
      yards,
      timeStamp,
    },
    { upsert: true },
    (err, res) => {
      if (err) {
        console.log('Error upserting:', err);
      } else {
        console.log('Upsert successful');
      }
    },
  );
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
