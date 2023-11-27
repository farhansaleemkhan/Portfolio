import UserModel from "../models/userSchema.js";
import handleResponse from "./commonResponse.js";
import {
  findWithId,
  deleteWithId,
  updateWithId,
  userDetails,
} from "./commonControllers.js";

export const createUser = (req, res) => {
  UserModel.create(req.body)
    .then((newUser) => {
      handleResponse(res, 201, newUser);
    })
    .catch((err) => {
      handleResponse(res, 500, err);
    });
};

export const getUserById = (req, res) => {
  findWithId(UserModel, req, res, "User");
};

export const updateUserById = (req, res) => {
  updateWithId(UserModel, req, res, "User");
};

export const deleteUserById = (req, res) => {
  deleteWithId(UserModel, req, res, "User");
};

export const getUserProjects = (req, res) => {
  userDetails(req, res, "projects");
};

export const getUserMessages = (req, res) => {
  UserModel.findById(req.params.id)
    .populate({
      path: "contact",
    })
    .then((doc) => {
      if (!doc) {
        throw "User is Not Found";
      }
      handleResponse(
        res,
        200,
        doc.contact.message
      );
    })
    .catch((err) => {
      handleResponse(res, 404, err);
    });
};

export const getUserSocials = (req, res) => {
  userDetails(req, res, "social");
};

export const getUserAbout = (req, res) => {
  userDetails(req, res, "about");
};

export const getUserSkills = (req, res) => {
  userDetails(req, res, "skill");
};
