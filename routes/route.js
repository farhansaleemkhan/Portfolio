import express from "express";

// For Project Section
import {
  createProject,
  getProjectById,
  updateProjectById,
  deleteProjectById,
} from "../controllers/projectController.js";

// For About Section
import {
  createAbout,
  getAboutById,
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

// For Skill Section
import {
  createSkill,
  getSkillById,
  getSkills,
  updateSkillById,
  deleteSpecificSkill,
  deleteOneSkillDoc,
} from "../controllers/skillController.js";

import {
  createUser,
  getUserById,
  getUserProjects,
  getUserMessages,
  getUserSocials,
  getUserAbout,
  getUserSkills,
  updateUserById,
  deleteUserById,
} from "../controllers/userController.js";

const router = express.Router();

// *********  Routes for Project Section **********//
router.route("/project/new").post(createProject);
router
  .route("/project/:id")
  .get(getProjectById)
  .put(updateProjectById)
  .delete(deleteProjectById);
router.route("/project/get/:id").get(getUserProjects);

// *********  Routes for About Section **********//
router.route("/about/new").post(createAbout);
router
  .route("/about/:id")
  .get(getAboutById)
  .put(updateAboutById)
  .delete(deleteAboutById);
router.route("/about/get/:id").get(getUserAbout);

// *********  Routes for Contact Section **********//
router.route("/contact/new").post(createContact);
router
  .route("/contact/:id")
  .get(getContactById)
  .put(updateContactById)
  .delete(deleteContactById);
router.route("/contacts").get(getContacts);
router.route("/contact/get/:id").get(getUserMessages);

// *********  Routes for Social Site Section **********//
router.route("/social/new").post(createSocial);
router
  .route("/social/:id")
  .get(getSocialById)
  .put(updateSocialById)
  .delete(deleteSocialById);
router.route("/socials").get(getSocials);
router.route("/social/get/:id").get(getUserSocials);

// *********  Routes for User Section **********//
router.route("/user/new").post(createUser);
router
  .route("/user/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

// *********  Routes for Skill Section **********//
router.route("/skill/new").post(createSkill);
router
  .route("/skill/:id")
  .get(getSkillById)
  .put(updateSkillById)
  .delete(deleteSpecificSkill);
router.route("/skills").get(getSkills);
router.route("/skill/doc/:id").delete(deleteOneSkillDoc);
router.route("/skill/get/:id").get(getUserSkills);

export default router;
