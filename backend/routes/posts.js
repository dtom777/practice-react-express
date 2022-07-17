const router = require("express").Router();
const postController = require("../controllers/post");

// /posts => /
// create
router.post("/", postController.create);

// update
router.put("/:id", postController.update);

// delete
router.delete("/:id", postController.delete);

// get
router.get("/:id", postController.get);

// getList
router.get("/", postController.getList);

module.exports = router;
