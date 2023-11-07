import mongoose from "mongoose";

// schema of User  = SOU
const SOU = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: /^\S+@\S+\.\S+$/,
    maxLength: 50,
    required: true,
  },
  phoneNumber: {
    type: String,
    validate: /^\+92 3\d{2}-\d{7}$/,
    required: true,
  },
  address: {
    type: String,
    validate: /^House No.\S+$/,
  },
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  image: {
    type: String,
    validate:
      /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
    required: true,
  },
  project: [[{ type: mongoose.Schema.Types.ObjectId, ref: "ProjectModel" }]],
  about: [{ type: mongoose.Schema.Types.ObjectId, ref: "AboutModel" }],
  contact: [{ type: mongoose.Schema.Types.ObjectId, ref: "ContactModel" }],
  social: [{ type: mongoose.Schema.Types.ObjectId, ref: "SocialModel" }],
});

const UserModel = mongoose.model("User", SOU);

export default UserModel;
