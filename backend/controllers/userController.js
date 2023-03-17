import User from "../model/userModel.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ userExists: true });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (user.userExists === false) {
      res.status(400).json({ message: `This user has been deleted` });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);

    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400).json({ error: `User already exists`, data: userExist });
    }

    const user = await User.create({ firstName, lastName, email, password });

    if (user) {
      res.status(201).json(user);
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
    } else {
      res.status(400).json({ error: `User not found` });
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);

    if (user) {
      user.userExists = !user.userExists;
    }

    const updatedUser = await user.save();
    res.json({ message: `User deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getUsers, getUser, createUser, updateUser, deleteUser };
