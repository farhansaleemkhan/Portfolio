import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: 'String',
    validate: /^\S+@\S+\.\S+$/,
    unique : true,
    index:true,
    maxLength: 50,
    required: true,
  },
  phoneNumber: {
    type: 'String',
    validate: /^\+92 3\d{2}-\d{7}$/,
    unique : true,
    required: true,
  },
  address: {
    type: String,
    validate : /^House No.\S+\,\S+$/,
    required: true,
  },
  image: {
    type: 'String',
    validate: /^((http(s)?:\/\/(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?)|(data:image\/[a-zA-Z+]+;base64,[-\/+=a-zA-Z0-9]+))$/,
    unique : true,
    required: true,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectModel",
    },
  ],
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SkillModel",
  },
  about: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AboutModel",
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ContactModel",
  },
  social: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SocialModel",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.post("deleteOne", function () {
  const SkillModel = require('./skillSchema.js').default;
  SkillModel.find({userId: userId })
    .then((skill) => {
      const skillId = skill[0]._id;
      return SkillModel.updateOne({ _id: skillId }, { $set: { userId: null } });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
});


const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;
