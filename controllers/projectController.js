import ProjectModel from "../models/projectSchema.js";
import UserModel from "../models/userSchema.js";
import handleResponse from "./commonResponse.js";

import { findWithId, deleteWithId, updateWithId } from "./commonControllers.js";

export const createProject = (req, res) => {
  UserModel.findById(req.body.userId)
  .then((user)=>{
    if(!user){
      throw "User is Not Found";
     }
     if (req.body.startDate <= req.body.endDate) {
      ProjectModel.create(req.body)
        .then((newProject) => {
            user.projects.push(newProject._id);
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
        }
       else {
      handleResponse(
        res,
        500,
        "End Date of Project Cannot be Less than Start Date"
      );
    }
  })
  .catch((err)=>{
    handleResponse(res,404,err);
  })
  };

export const getProjectById = (req, res) => {
  findWithId(ProjectModel, req, res, "Project");
};

export const updateProjectById = (req, res) => {
  if(req.body.startDate <= req.body.endDate){
  ProjectModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
  .then((updatedProject)=>{
    handleResponse(res,201,updatedProject);
  })
  .catch((err)=>{
    handleResponse(res,500,err);
  })
  }
  else {
    handleResponse(res,500,"End Date of Project Cannot be Less than Start Date");
  }

};

export const deleteProjectById = (req, res) => {
  deleteWithId(ProjectModel, req, res, "Project");
};
