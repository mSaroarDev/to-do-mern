const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  folder_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Completed", "Incomplete"],
    default: "Incomplete",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const taskModel = new mongoose.model("Task", taskSchema);
module.exports = taskModel;
