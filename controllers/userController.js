import UserModel from "../models/userSchema.js";

export const createUser = (req, res) => {
  UserModel.create(req.body)
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch((err) => {
      res.status(500).send("Cannot Create About " + err);
    });
};

export const getUserById = (req, res) => {
  UserModel.findById(req.params.id)
    .then((user) => {
      if (user === null) {
        throw "User is Not Found";
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const getUsers = (req, res) => {
  UserModel.find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send("Cannot Get Users " + err);
    });
};

export const updateUserById = (req, res) => {
  UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedUser) => {
      if (updatedSocial === null) {
        throw "Cannot Update this User";
      } else {
        res.status(201).send(updatedUser);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const deleteUserById = (req, res) => {
  UserModel.findByIdAndDelete(id)
    .then((deletedUser) => {
      if (deletedUser === null) {
        throw "Cannot Delete this User";
      } else {
        res.status(200).send(deletedUser);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};