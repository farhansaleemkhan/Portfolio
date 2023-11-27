import handleResponse from "./commonResponse.js";
import UserModel from "../models/userSchema.js";

export const findWithId = (model, req, res, message = "Document") => {
  model
    .findById(req.params.id)
    .then((doc) => {
      if (!doc) {
        throw `${message} is Not Found`;
      }
      handleResponse(res, 200, doc);
    })
    .catch((err) => {
      handleResponse(res, 404, err);
    });
};

export const updateWithId = (model, req, res, message = "Document") => {
  model
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((doc) => {
      if (!doc) {
        throw `${message} is Not Found`;
      }
      handleResponse(res, 201,doc);
    })
    .catch((err) => {
      handleResponse(res, 404, err);
    });
};

export const deleteWithId = (model, req, res, message = "Document") => {
  model
    .deleteOne({ _id: req.params.id })
    .then((doc) => {
      if (doc.deletedCount==0) {
        throw `${message} is Not Found`;
      }
      else
      {
        handleResponse(res, 200, `\nSuccessfully Delete the ${message}`);
      }
    })
    .catch((err) => {
      handleResponse(res, 404, err);
    });
};

export const userDetails = (req, res, path = null) => {
  UserModel.findById(req.params.id)
    .populate({
      path: `${path}`,
    })
    .then((doc) => {
      if (!doc) {
        throw "User is Not Found";
      }
      handleResponse(res, 200, doc);
    })
    .catch((err) => {
      handleResponse(res, 404, err);
    });
};

