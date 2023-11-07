import mongoose from "mongoose";

// subContactSchema = SCS
const SCS = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 50,
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
  message: [
    {
      type: String,
      minLength: 2, //Hi
      maxLength: 500,
      required: true,
    },
  ],
});

const ContactModel = mongoose.model("Contact", SCS);

export default ContactModel;
