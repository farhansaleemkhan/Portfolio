import mongoose from "mongoose";
import { commonDeleteArrayField } from "./commonCascade.js";

const socialSchema = new mongoose.Schema({
  title: {
    type: 'String',
    unique:true,
    required: true,
    minLength: 5,
    maxLength: 30,
  },
  link: {
    type: 'String',
    validate: /^((http(s)?:\/\/(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?)|(data:image\/[a-zA-Z+]+;base64,[-\/+=a-zA-Z0-9]+))$/,
    unique: true,
    required: true,
  },
  iconLink: {
    type: 'String',
    required: true,
    unique : true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commonDeleteArrayField(socialSchema,"social");

const SocialModel = mongoose.model("SocialModel", socialSchema);

export default SocialModel;
