import ContactModel from "../models/contactSchema.js";
import UserModel from "../models/userSchema.js";

export const createContact = (req, res) => {
  const newMessage = req.body.message;
  ContactModel.find({ email: req.body.email })
    .then((previous) => {
      if (previous.length > 0) {
        previous[0].message.push(newMessage);
        previous[0].save();
       return UserModel.findById(req.body.userId)
       .then((user) => {
        user.contact.push(previous[0]._id);
        return user
        .save()
        .then((user) => {
          res.status(201).json("Successfully Saved " + user);
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
      } else {
        ContactModel.create(req.body)
        .then((newContact) => {
          return UserModel.findById(req.body.userId)
            .then((user) => {
              user.contact.push(newContact._id);
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
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const getContactById = (req, res) => {
  ContactModel.findById(req.params.id)
    .then((contact) => {
      if (contact === null) {
        throw "Contact is Not Found";
      } else {
        res.status(200).send(contact);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const getContacts = (req, res) => {
  ContactModel.find()
    .then((contacts) => {
      res.status(200).send(contacts);
    })
    .catch((err) => {
      res.status(500).send("Cannot Get Contacts " + err);
    });
};

export const updateContactById = (req, res) => {
  ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedContact) => {
      if (updatedContact === null) {
        throw "Cannot Update this Contact";
      } else {
        res.status(201).send(updatedContact);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const deleteContactById = (req, res) => {
  ContactModel.findByIdAndDelete(req.params.id)
    .then((deletedContact) => {
      if (deletedContact === null) {
        throw "Cannot Delete this Contact";
      } else {
        res.status(200).send(deletedContact);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
