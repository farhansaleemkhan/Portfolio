import ProjectModel from "../models/projectSchema.js";
import UserModel from "../models/userSchema.js";

export const createProject = (req, res) => {
  ProjectModel.create(req.body)
    .then((newProject) => {
      return UserModel.findById(req.body.userId)
        .then((user) => {
          user.project.push(newProject._id);
          return user.save().then((user) => {
            res.status(201).json("Successfully Saved " + user);
          });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const getProjectById = (req, res) => {
  ProjectModel.findById(req.params.id)
    .then((project) => {
      if (project === null) {
        throw "Project is Not Found";
      } else {
        res.status(200).send(project);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const getProjects = (req, res) => {
  ProjectModel.find()
    .then((projects) => {
      res.status(200).send(projects);
    })
    .catch((err) => {
      res.status(500).send("Cannot Get Projects " + err);
    });
};

export const updateProjectById = (req, res) => {
  ProjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedProject) => {
      if (updatedProject === null) {
        throw "Cannot Update this Project";
      } else {
        res.status(201).send(updatedProject);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

export const deleteProjectById = (req, res) => {
  ProjectModel.findByIdAndDelete(req.params.id)
    .then((deletedProject) => {
      if (deletedProject === null) {
        throw "Cannot Delete this Project";
      } else {
        res.status(200).send(deletedProject);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
