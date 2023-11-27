import SkillModel from "../models/skillSchema.js";
import UserModel from "../models/userSchema.js";
import { deleteWithId, findWithId } from "./commonControllers.js";
import handleResponse from "./commonResponse.js";

export const createSkill = (req, res) => {
  UserModel.findById(req.body.userId)
  .then((user)=>{
    if(!user){
      throw "User is Not Found";
    }
  const newskill = req.body.skills;
  SkillModel.find({ userId: req.body.userId })
    .then((previous) => {
      if (previous.length > 0) {
        previous[0].skills.push(newskill);
        return previous[0].save().then((skill) => {
          handleResponse(
            res,
            201,
            skill
          );
        });
      }
      SkillModel.create(req.body)
        .then((newSkill) => {
            user.skill = newSkill._id;
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
        .catch((err) => {
          handleResponse(res, 500, err);
        });
    })
    .catch((err) => {
      handleResponse(res, 404, err);
    });
};

export const getSkillById = (req, res) => {
  findWithId(SkillModel, req, res, "Skill");
};

export const updateSkillById = (req, res) => {
  SkillModel.findById(req.params.id)
    .then((updatedSkill) => {
      if (!updatedSkill) {
        throw "Skill is Not Found";
      } else {
        const skillId = req.body.skills.skillId;
        const doc = updatedSkill.skills.filter((skilObj) => {
          return skilObj._id.toString() == skillId;
        });
        doc[0].name = req.body.skills.name;
        doc[0].rating = req.body.skills.rating;
        return updatedSkill.save().then(() => {
          handleResponse(res, 201, updatedSkill);
        });
      }
    })
    .catch((err) => {
      handleResponse(res, 404, err);
    });
};

export const deleteSpecificSkill = (req, res) => {
  const skillId = req.body.skillId;
  SkillModel.findById(req.params.id)
    .then((skill) => {
      if (!skill) {
        throw "Skill is Not Found";
      }
      const doc = skill.skills.filter((skillObj) => {
        return skillObj._id.toString() != skillId;
      });
      skill.skills = doc;
      return skill.save().then(() => {
        handleResponse(res, 200, skill);
      });
    })
    .catch((err) => {
      handleResponse(res, 404, err);
    });
};

export const deleteOneSkillDoc = (req, res) => {
  deleteWithId(SkillModel, req, res, "Skill");
};

export const getSkills = (req, res) => {
  SkillModel.find()
    .then((skills) => {
      handleResponse(res, 200, skills);
    })
    .catch((err) => {
      handleResponse(res, 404, err);
    });
};
