import SocialModel from "../models/socialSiteSchema.js";
import UserModel from "../models/userSchema.js";
import handleResponse from "./commonResponse.js";
import { findWithId, deleteWithId, updateWithId } from "./commonControllers.js";

export const createSocial = (req, res) => {
  UserModel.findById(req.body.userId)
  .then((user)=>{
    if(!user){
      throw "User is Not Found";
    }
    SocialModel.create(req.body)
    .then((newSocial) => {
        user.social.push(newSocial._id);
        return user.save().then(() => {
          handleResponse(
            res,
            201,
            user
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

export const getSocialById = (req, res) => {
  findWithId(SocialModel, req, res, "Social");
};

export const updateSocialById = (req, res) => {
  updateWithId(SocialModel, req, res, "Social");
};

export const deleteSocialById = (req, res) => {
  deleteWithId(SocialModel, req, res, "Social");
};

export const getSocials = (req, res) => {
  SocialModel.find()
    .then((socials) => {
      handleResponse(res, 200, socials);
    })
    .catch((err) => {
      handleResponse(res, 404, err);
    });
};
