import express from "express";

// For Project Section
import {
  createProject,
  getProjectById,
  getProjects,
  updateProjectById,
  deleteProjectById,
} from "../controllers/projectController.js";

// For About Section
import {
  createAbout,
  getAboutById,
  getAbouts,
  updateAboutById,
  deleteAboutById,
} from "../controllers/aboutController.js";

// For Contact Section
import {
  createContact,
  getContactById,
  getContacts,
  updateContactById,
  deleteContactById,
} from "../controllers/contactController.js";

// For Social Site Section
import {
  createSocial,
  getSocialById,
  getSocials,
  updateSocialById,
  deleteSocialById,
} from "../controllers/socialController.js";

import {
  createUser,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
} from "../controllers/userController.js";


const router = express.Router();

// *********  Routes for Project Section **********//
router.route("/project/new").post(createProject);
router.route("/project/:id").get(getProjectById).put(updateProjectById).delete(deleteProjectById);
router.route("/projects").get(getProjects);

// *********  Routes for About Section **********//
router.route("/about/new").post(createAbout);
router.route("/about/:id").get(getAboutById).put(updateAboutById).delete(deleteAboutById);
router.route("/abouts").get(getAbouts);

// *********  Routes for Contact Section **********//
router.route("/contact/new").post(createContact);
router.route("/contact/:id").get(getContactById).put(updateContactById).delete(deleteContactById);
router.route("/contacts").get(getContacts);

// *********  Routes for Social Site Section **********//
router.route("/social/new").post(createSocial);
router.route("/social/:id").get(getSocialById).put(updateSocialById).delete(deleteSocialById);
router.route("/socials").get(getSocials);

// *********  Routes for User Section **********//
router.route("/user/new").post(createUser);
router.route("/user/:id").get(getUserById).put(updateUserById).delete(deleteUserById);
router.route("/users").get(getUsers);

export default router;
