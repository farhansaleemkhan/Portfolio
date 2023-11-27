import UserModel from "./userSchema.js";

export const commonDeletion = (schema, field) => {
  schema.post("deleteOne", function () {
    const fieldId = this._conditions._id;
    UserModel.find({ [field]: fieldId })
      .then(() => {
        return UserModel.updateMany({ $set: { [field]: null } });
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  });
};

export const commonDeleteArrayField = (schema, field) => {
  schema.post("deleteOne", function () {
    const fieldId = this._conditions._id;
    UserModel.find({ [field]: fieldId })
      .then(() => {
        return UserModel.updateMany({ $pull: { [field]: fieldId } });
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  });
};
