const mongoose = require('mongoose')

const mongoosastic = require('mongoosastic')

const Schema = mongoose.Schema

let NewsSchema = new Schema({
    
    title: {type: Array},
    description: {type: Array},
    img: {type: Array},
    dateAndTime: {type: Array},
},{collection: 'CrawledData'});


// Export the model
NewsSchema.plugin(mongoosastic,{
    hosts: [
      'localhost:9200'
    ]
  })
const news = mongoose.model('CrawledData',NewsSchema);
const stream = news.synchronize()
var count=0
stream.on('data', function(err, doc){
    count++;
  });
  stream.on('close', function(){
    console.log('indexed ' + count + ' documents!');
  });
  stream.on('error', function(err){
    console.log(err);
  });
  
 
module.exports=news