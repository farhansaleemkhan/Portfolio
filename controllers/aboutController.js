import AboutModel from "../models/aboutSchema.js";
import UserModel from "../models/userSchema.js";

export const createAbout = (req, res) => {
  AboutModel.create(req.body)
  .then((newAbout) => {
    return UserModel.findById(req.body.userId)
      .then((user) => {
        user.about.push(newAbout._id);
        return user
        .save()
        .then((user) => {
          res.status(201).json("Successfully Saved " + user);
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  })
  .catch((err) => {
    res.status(500).send(err);
  });
};

export const getAboutById = (req, res) => {
  AboutModel.findById(req.params.id)
    .then((about) => {
      if (about === null) {
        throw "About is Not Found";
      } else {
        res.status(200).send(about);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const getAbouts = (req, res) => {
  AboutModel.find()
    .then((abouts) => {
      res.status(200).send(abouts);
    })
    .catch((err) => {
      res.status(500).send("Cannot Get Abouts " + err);
    });
};

export const updateAboutById = (req, res) => {
  AboutModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedAbout) => {
      if (updatedAbout === null) {
        throw "Cannot Update this About";
      } else {
        res.status(201).send(updatedAbout);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const deleteAboutById = (req, res) => {
  AboutModel.findByIdAndDelete(req.params.id)
    .then((deletedAbout) => {
      if (deletedAbout === null) {
        throw "Cannot Delete this About";
      } else {
        res.status(200).send(deletedAbout);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
