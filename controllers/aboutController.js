import AboutModel from "../models/aboutSchema.js";
import UserModel from "../models/userSchema.js";
import handleResponse from "./commonResponse.js";
import { findWithId, deleteWithId, updateWithId } from "./commonControllers.js";

export const createAbout = (req, res) => {
  UserModel.findById(req.body.userId)
  .then((user)=>{
    if(!user){
      throw 'User is Not Found';
    }
    AboutModel.create(req.body)
    .then((newAbout) => {
        user.about = newAbout._id;
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
    handleResponse(res,404,err);
  })
};

export const getAboutById = (req, res) => {
  findWithId(AboutModel, req, res, "About");
};

export const updateAboutById = (req, res) => {
  updateWithId(AboutModel, req, res, "About");
};

export const deleteAboutById = (req, res) => {
  deleteWithId(AboutModel, req, res, "About");
};
