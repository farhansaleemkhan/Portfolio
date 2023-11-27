import UserModel from "./userSchema.js";
import SkillModel from "./skillSchema.js";

export const forSkill = (schema,field)=>{
schema.post("deleteOne", function () {
    const fieldId = this._conditions._id;
    UserModel.find({[field]: fieldId })
      .then(() => {
        return UserModel.updateMany({ $set: {[field]: null } });
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  });
};

export const forUser = (schema,field)=>{
  schema.post("deleteOne", function () {
    SkillModel.find({[field] : userId })
      .then((skill) => {
        const fieldId = skill[0]._id;
        return SkillModel.updateOne({ _id: fieldId }, { $set: { [field] : null } });
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  });
}