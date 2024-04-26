const express = require("express");
const taskGroup = express.Router();
const taskGroupModel = require("../schema/taskGroupSchema");
const taskModel = require("../schema/taskSchema");
const checkAuth = require("../middlewares/checkAuth");

// create new task group
taskGroup.post("/create-task", checkAuth, async (req, res) => {
  const formData = req.body;
  const { title } = formData;

  if (!title) {
    res.status(406).json({ msg: "failed", data: "empty data" });
  } else {
    try {
      const data = new taskGroupModel({
        title: title,
        created_by: req.id,
      });
      const response = await data.save();
      res.status(201).json({ msg: "success", data: response });
    } catch (err) {
      res.status(500).json({ msg: "err", error: err });
    }
  }
});

// get all groups matching tasks
taskGroup.get("/all", checkAuth, async (req, res) => {
  try {
    const data = await taskGroupModel.find({ created_by: req.id });
    res.status(200).json({ msg: "success", data: data });
  } catch (error) {
    res.status(500).json({ msg: "error", data: error });
  }
});

// get all tasks grops
taskGroup.get("/all/tasks", checkAuth, async (req, res) => {
  try {
    const data = await taskModel.find({ created_by: req.id });
    res.status(200).json({ msg: "success", data: data });
  } catch (error) {
    res.status(500).json({ msg: "error", data: error });
  }
});

// get specific tasks group by id
taskGroup.get("/taskgroup/:folder_id", checkAuth, async (req, res) => {
  try {
    const data = await taskGroupModel.findOne({
      _id: req.params.folder_id,
    });
    res.status(200).json({ msg: "success", data: data });
  } catch (error) {
    res.status(500).json({ msg: "error", data: error });
  }
});

// delete task group by id
taskGroup.delete("/delete-group/:taskgroup_id", checkAuth, async (req, res) => {
  try {
    const data = await taskGroupModel.deleteOne({
      _id: req.params.taskgroup_id,
    });
    res.status(200).json({ msg: "success", data: data });
  } catch (error) {
    res.status(500).json({ msg: "error", data: error });
  }
});

// create new task
taskGroup.post("/create", checkAuth, async (req, res) => {
  const formData = req.body;
  const { title, folder_id } = formData;

  if (!title) {
    res.status(406).json({ msg: "failed", data: "empty data" });
  } else {
    try {
      const data = new taskModel({
        title: title,
        folder_id: folder_id,
        created_by: req.id,
      });
      const response = await data.save();
      res.status(201).json({ msg: "success", data: response });
    } catch (err) {
      res.status(500).json({ msg: "err", error: err });
    }
  }
});

// get matching tasks by id
taskGroup.get("/all/:folder_id", checkAuth, async (req, res) => {
  try {
    const data = await taskModel.find({
      created_by: req.id,
      folder_id: req.params.folder_id,
    });
    res.status(200).json({ msg: "success", data: data });
  } catch (error) {
    res.status(500).json({ msg: "error", data: error });
  }
});

// mark as done by id
taskGroup.post("/mark-done/:task_id", checkAuth, async (req, res) => {
  try {
    const data = await taskModel.updateOne(
      { _id: req.params.task_id },
      {
        $set: {
          status: "Completed",
        },
      }
    );
    res.status(200).json({ msg: "success", data: data });
  } catch (error) {
    res.status(500).json({ msg: "error", data: error });
  }
});

// delete by id
taskGroup.delete("/delete/:task_id", checkAuth, async (req, res) => {
  try {
    const data = await taskModel.deleteOne({ _id: req.params.task_id });
    res.status(200).json({ msg: "success", data: data });
  } catch (error) {
    res.status(500).json({ msg: "error", data: error });
  }
});

// delete all tasks by group id
taskGroup.delete("/delete-tasks/:taskgroup_id", checkAuth, async (req, res) => {
  console.log(req.params.taskgroup_id);
  try {
    const data = await taskModel.deleteMany({
      folder_id: req.params.taskgroup_id,
    });
    res.status(200).json({ msg: "success", data: data });
  } catch (error) {
    res.status(500).json({ msg: "error", data: error });
  }
});

module.exports = taskGroup;
