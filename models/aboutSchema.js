import mongoose from "mongoose";

// schemaOfAbout = SOA
const SOA = new mongoose.Schema({
  description: {
    type: String,
    minLength : 10,  
    maxLength : 800,
    required : true,
  },
  resume: {
    type: String,
    validate: /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
    required : true,
    unique : true,
  },
});

const AboutModel = mongoose.model("About", SOA);
export default AboutModel;
