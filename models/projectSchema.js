import mongoose from "mongoose";

//schemaOfProject = SOP
const SOP = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: true,
  },
  image: {
    type: String,
    validate:
      /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
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
});

const ProjectModel = mongoose.model("Project", SOP);

export default ProjectModel;
