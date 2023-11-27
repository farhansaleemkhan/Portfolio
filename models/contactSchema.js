import mongoose from "mongoose";
import {commonDeletion} from "./commonCascade.js";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 50,
    required: true,
  },
  email: {
    type: String,
    validate: /^\S+@\S+\.\S+$/,
    maxLength: 50,
    required:true,
  },
  phoneNumber: {
    type: String,
    validate: /^\+92 3\d{2}-\d{7}$/,
    required: true,
   },
  message: [
    {
      type: String,
      minLength: 2,
      maxLength: 800,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commonDeletion(contactSchema,"contact");

const ContactModel = mongoose.model("ContactModel", contactSchema);

export default ContactModel;
