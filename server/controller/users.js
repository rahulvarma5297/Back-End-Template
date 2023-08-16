const { User } = require("../model/users.js");

exports.getAll = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ _id: id });
  res.json(user);
};

exports.create = (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  user
    .save()
    .then(() => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.replace = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const doc = await User.findOneAndReplace(
      {
        _id: id,
      },
      data,
      { new: true }
    );
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const doc = await User.findOneAndUpdate(
      {
        _id: id,
      },
      data,
      { new: true }
    );
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndDelete({
      _id: id,
    });
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
