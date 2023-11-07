import SocialModel from "../models/socialSiteSchema.js";
import UserModel from "../models/userSchema.js";

export const createSocial = (req, res) => {
  SocialModel.create(req.body)
    .then((newSocial) => {
      return UserModel.findById(req.body.userId)
        .then((user) => {
          user.social.push(newSocial._id);
          return user.save().then((user) => {
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

export const getSocialById = (req, res) => {
  SocialModel.findById(req.params.id)
    .then((social) => {
      if (social === null) {
        throw "Social Account is Not Found";
      } else {
        res.status(200).send(social);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const getSocials = (req, res) => {
  SocialModel.find()
    .then((socials) => {
      res.status(200).send(socials);
    })
    .catch((err) => {
      res.status(500).send("Cannot Get Socials " + err);
    });
};

export const updateSocialById = (req, res) => {
  SocialModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedSocial) => {
      if (updatedSocial === null) {
        throw "Cannot Update this Social";
      } else {
        res.status(201).send(updatedSocial);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const deleteSocialById = (req, res) => {
  SocialModel.findByIdAndDelete(id)
    .then((deletedSocial) => {
      if (deletedSocial === null) {
        throw "Cannot Delete this Social";
      } else {
        res.status(200).send(deletedSocial);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
