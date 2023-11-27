import mongoose from "mongoose";
import {commonDeleteArrayField} from "./commonCascade.js";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: true,
  },
  image: {
    type: 'String',
    validate: /^((http(s)?:\/\/(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?)|(data:image\/[a-zA-Z+]+;base64,[-\/+=a-zA-Z0-9]+))$/,
    unique : true,
    required: true,
  },
  description: {
    type: String,
    minLength: 4,
    maxLength: 500,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  language: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commonDeleteArrayField(projectSchema,"projects");

const ProjectModel = mongoose.model("ProjectModel", projectSchema);
export default ProjectModel;
