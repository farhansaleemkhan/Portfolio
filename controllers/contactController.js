import ContactModel from "../models/contactSchema.js";
import UserModel from "../models/userSchema.js";
import handleResponse from "./commonResponse.js";
import { findWithId, deleteWithId, updateWithId } from "./commonControllers.js";

export const createContact = (req, res) => {
  UserModel.findById(req.body.userId)
  .then((user)=>{
    if(!user){
      throw "User is Not Found";
    }
     const newMessage = req.body.message;
     ContactModel.find({ email: req.body.email })
     .then((previous) => {
      if (previous.length > 0) {
        previous[0].message.push(newMessage);
        return previous[0].save().then((updatedContact) => {
            return user.save().then(() => {
              handleResponse(
                res,
                201,
                updatedContact
              );
            });
          });
        }
        ContactModel.create(req.body)
        .then((newContact) => {
            user.contact = newContact._id;
            return user.save().then(() => {
              handleResponse(
                res,
                201,
                user,
              );
            });
          })
          .catch((err)=>{
            handleResponse(res,500,err);
          })
        })
        .catch((err)=>{
          handleResponse(res,500,err);
        })
      })
    .catch((err) => {
      handleResponse(res, 404, err);
    });
  };

export const getContactById = (req, res) => {
  findWithId(ContactModel, req, res, "Contact");
};

export const updateContactById = (req, res) => {
  updateWithId(ContactModel, req, res, "Contact");
};

export const deleteContactById = (req, res) => {
  deleteWithId(ContactModel, req, res, "Contact");
};

export const getContacts = (req, res) => {
  ContactModel.find()
    .then((contacts) => {
      handleResponse(res, 200, contacts);
    })
    .catch((err) => {
      handleResponse(res, 500, err);
    });
};
