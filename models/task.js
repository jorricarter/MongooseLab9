var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//every task will have these values by default.
//Define your schema: what fields will one task document have
var taskSchema = new Schema( {
  text: String,
  completed: Boolean,
  dateCreated: Date,
  dateCompleted: Date,
});

// Compile taskSchema into Mongoose model object
var Task = mongoose.model('Task', taskSchema);

// And export the Task so our other code can use it
module.exports = Task;

