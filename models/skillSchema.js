import mongoose from "mongoose";
import { commonDeletion } from "./commonCascade.js";

const skillSchema = new mongoose.Schema({
  skills: [
    {
      name: {
        type: 'String',
        unique : true,
        required: true
      },
      rating : {
        type: Number,
        min: 0,
        max: 5,
        required : true
      }
    }
  ],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SkillModel",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commonDeletion(skillSchema,"skill");

const SkillModel = mongoose.model("SkillModel", skillSchema);

export default SkillModel;
