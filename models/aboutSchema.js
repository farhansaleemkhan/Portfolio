import mongoose from "mongoose";
import {commonDeletion} from "./commonCascade.js";

const aboutSchema = new mongoose.Schema({
  description: {
    type: String,
    minLength: 10,
    maxLength: 800,
    required :true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commonDeletion(aboutSchema,"about");

const AboutModel = mongoose.model("AboutModel", aboutSchema);
export default AboutModel;
