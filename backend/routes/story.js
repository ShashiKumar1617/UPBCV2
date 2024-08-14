const express = require("express");
const imageupload = require("../Helpers/Libraries/imageUpload");

const { getAccessToRoute } = require("../middleware/Authorization/auth");
const {
  addStory,
  getAllStories,
  detailStory,
  likeStory,
  editStory,
  deleteStory,
  editStoryPage
} = require("../Controllers/story");
const {
  checkStoryExist,
  checkUserAndStoryExist
} = require("../middleware/database/databaseErrorhandler");

const router = express.Router();

router.post(
  "/addstory",
  [getAccessToRoute, imageupload.single("image")],
  addStory
);

router.post("/:slug", checkStoryExist, detailStory);

router.post("/:slug/like", [getAccessToRoute, checkStoryExist], likeStory);

router.get(
  "/editStory/:slug",
  [getAccessToRoute, checkStoryExist, checkUserAndStoryExist],
  editStoryPage
);

router.put(
  "/:slug/edit",
  [
    getAccessToRoute,
    checkStoryExist,
    checkUserAndStoryExist,
    imageupload.single("image")
  ],
  editStory
);

router.delete(
  "/:slug/delete",
  [getAccessToRoute, checkStoryExist, checkUserAndStoryExist],
  deleteStory
);

router.get("/getAllStories", getAllStories);

module.exports = router;
