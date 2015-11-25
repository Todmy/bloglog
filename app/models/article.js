var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var articleSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ author: String, body: String }],
  date: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false }
});

articleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Article', articleSchema);
