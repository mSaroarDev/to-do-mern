const mongoose = require("mongoose");

const taskGroupSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const taskGroupModel = new mongoose.model("TaskGroup", taskGroupSchema);
module.exports = taskGroupModel;
