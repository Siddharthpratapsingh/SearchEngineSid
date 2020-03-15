const NewsData = require('../models/NewsModel');
const mongoosastic = require('mongoosastic')
const news = require('../models/NewsModel')
const elasticsearch = require('elasticsearch');
// instantiate an Elasticsearch client
const client = new elasticsearch.Client({
   hosts: [ 'http://localhost:9200']
});
// ping the client to be sure Elasticsearch is up
client.ping({
     requestTimeout: 30000,
 }, function(error) {
 // at this point, eastic search is down, please check your Elasticsearch service
     if (error) {
         console.error('Elasticsearch cluster is down!');
     } else {
         console.log('Everything is ok');
     }
 });
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};
exports.create = function (req, res) {
    let newsData = new NewsData(
        {
            title: req.body.title,
            description: req.body.description,
            img: req.body.img,
            dateAndTime:req.body.dateAndTime
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('News saved successfully')
    })
    newsData.on('es-indexed', (err, result) => {
        console.log('indexed to elastic search');
    });
    
};
exports.newsDetails = function (req, res) {
    news.search( {
        query_string: {
          query: req.params.data
        }
      } , function(err,results) {
        res.send(results)  
    })
    
};
