const express = require("express");
const cors = require("cors");
const Todo = require("./db.js");
const helmet = require("helmet");
const mongoose = require("mongoose");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.options("*", cors());

mongoose.connect("mongodb://127.0.0.1:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("mongo connect");
});

const timeOut = (callback, time = 300) => {
  setTimeout(() => {
    callback();
  }, time);
};

app.post("/init", async (req, res) => {
  await Todo.remove({});
  const size = 105;
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push({
      index: i,
      title: `title${i}`,
      name: `user${i}`,
      content: `content${i}`,
      clear: i % 2 === 0,
    });
  }
  const result = await Todo.insertMany(arr);
  return timeOut(() => {
    return res.send(!!result);
  });
});

app.post("/todo", async (req, res) => {
  const { body } = req;
  const result = await Todo.create(body);
  return timeOut(() => {
    return res.send(!!result);
  });
});

app.get("/todo", async (req, res) => {
  const result = await Todo.findOne({ index: parseInt(req.query.index, 10) });
  return timeOut(() => {
    return res.send(result);
  });
});

app.get("/todos", async (req, res) => {
  const { limit = 10, skip = 0 } = req.query;
  const body = req.body;
  const result = await Todo.find({ ...body })
    .limit(parseInt(limit, 10))
    .skip(parseInt(skip, 10));
  const total = await Todo.count({ ...body });
  return timeOut(() => {
    return res.send({ data: result, total });
  });
});

app.put("/todo", async (req, res) => {
  const { body } = req;
  const { index } = body;
  const result = await Todo.updateOne({ index }, { $set: { ...body } });
  return timeOut(() => {
    return res.send(result);
  });
});

app.put("/todos", async (req, res) => {
  const { indexes, value } = req.body;
  const result = await Todo.updateMany({ index: { $in: indexes } }, { $set: { clear: value } });
  return timeOut(() => {
    return res.send(result);
  });
});

app.delete("/todo", async (req, res) => {
  const { index } = req.body;
  const result = await Todo.deleteOne({ index });
  return timeOut(() => {
    return res.send(result);
  });
});

app.delete("/todos", async (req, res) => {
  const { indexes } = req.body;

  const result = await Todo.deleteMany({ index: { $in: indexes } });
  return timeOut(() => {
    return res.send(result);
  });
});

app.listen(3000, () => {
  console.log("start");
});
