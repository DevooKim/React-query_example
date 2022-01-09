const express = require("express");
const cors = require("cors");
const Todo = require("./todoSchema.js");
const User = require("./userSchema.js");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.options("*", cors());

const mongoId = process.env.MONGO_ID;
const password = process.env.MONGO_PW;
mongoose.connect(
  `mongodb+srv://${mongoId}:${password}@cluster0.p4s0q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.once("open", () => {
  console.log("mongo connect");
});

const timeOut = (callback, time = 300) => {
  setTimeout(() => {
    callback();
  }, time);
};

app.post("/user", async (req, res) => {
  const { name } = req.body;
  const isExists = await User.exists({ name });
  if (isExists) {
    return res.send("already_exists_name");
  }

  await User.create({ name });
  return res.send(true);
});

app.get("/user", async (req, res) => {
  const { name } = req.query;
  const isExists = await User.exists({ name });
  return res.send(isExists);
});

app.post("/todo/init", async (req, res) => {
  await Todo.remove({});
  const size = 105;
  const arr = [];
  const { name } = req.body;

  if (!name) {
    return res.send(false);
  }

  for (let i = 0; i < size; i++) {
    arr.push({
      title: `title${i}`,
      name: `${name}`,
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
  const { title, name } = req.query;
  const result = await Todo.findOne({ title, name });
  return timeOut(() => {
    return res.send(result);
  });
});

app.get("/todos", async (req, res) => {
  const { name, limit = 10, skip = 0 } = req.query;
  const result = await Todo.find({ name }).limit(parseInt(limit, 10)).skip(parseInt(skip, 10));
  const total = await Todo.count({ name });
  return timeOut(() => {
    return res.send({ data: result, total });
  });
});

app.put("/todo", async (req, res) => {
  const { body } = req;
  const { title, name } = body;
  const result = await Todo.updateOne({ title, name }, { $set: { ...body } });
  return timeOut(() => {
    return res.send(result);
  });
});

app.put("/todos", async (req, res) => {
  const { titles, name, value } = req.body;
  const result = await Todo.updateMany({ name, title: { $in: titles } }, { $set: { clear: value } });
  return timeOut(() => {
    return res.send(result);
  });
});

app.delete("/todo", async (req, res) => {
  const { title, name } = req.body;
  const result = await Todo.deleteOne({ title, name });
  return timeOut(() => {
    return res.send(result);
  });
});

app.delete("/todos", async (req, res) => {
  const { titles, name } = req.body;

  const result = await Todo.deleteMany({ name, title: { $in: titles } });
  return timeOut(() => {
    return res.send(result);
  });
});

app.listen(3000, () => {
  console.log("start");
});
