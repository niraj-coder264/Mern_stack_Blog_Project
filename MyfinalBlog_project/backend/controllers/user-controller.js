import User from "../model/User";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  
    const { name, email, password } = req.body;
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      return console.log(err);
    }
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Already Exists! Login Instead" });
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
      name,
      email,
      password:hashedPassword,
      blogs: [],
    });
  
    try { 
      await user.save();
    } catch (err) {
      return console.log(err);
    }
    return res.status(201).json({ user });
  };

  export const login = async (req, res, next) => {

    const { email, password } = req.body;
    
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      return console.log(err);
    }
    if (!existingUser) {
      return res.status(404).json({ message: "Couldnt Find User By This Email" });
    }
  
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    return res
      .status(200)
      .json({ message: "Login Successfull", user: existingUser });
  };

  export const updateuser = async (req, res, next) => {

    const { name, email } = req.body;

    const userId = req.params.id;

    let user;
    try {
      user = await User.findByIdAndUpdate(userId, {
        name,
        email,
      });
    } catch (err) {
      return console.log(err);
    }

    if (!user) {
      return res.status(500).json({ message: "Unable To Update The Blog" });
    }
    return res.status(200).json({ user });
  };

  export const deleteuser = async (req, res, next) => {
    const id = req.params.id;
  
    let user;
    try {
      user = await User.findByIdAndRemove(id);
      await users.pull(user);
      await user.save();
    } catch (err) {
      console.log(err);
    }
    if (!user) {
      return res.status(500).json({ message: "Unable To Delete" });
    }
    return res.status(200).json({ message: "Successfully Delete" });
  };