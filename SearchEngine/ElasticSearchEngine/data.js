const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const app = express();
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://PowerHouseCoder:KiN8ZXuI4WaYKo9A@powerhousecoder-shard-00-00-rte3q.mongodb.net:27017,powerhousecoder-shard-00-01-rte3q.mongodb.net:27017,powerhousecoder-shard-00-02-rte3q.mongodb.net:27017/TheHinduCrawler?ssl=true&replicaSet=PowerHouseCoder-shard-0&authSource=admin&retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//require the Elasticsearch librray


 // create a new index called scotch.io-tutorial. If the index has already been created, this function fails safely
// client.indices.create({
//     index: 'thehinducrawleddata'
// }, function(error, response, status) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("created a new index", response);
//     }
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const NewsData = require('./routes/router'); // Imports routes for the products

app.use('/news', NewsData);
let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});