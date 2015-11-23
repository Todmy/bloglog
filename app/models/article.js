var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ author: String, body: String }],
  date: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false }
});

module.exports = mongoose.model('Article', articleSchema);
