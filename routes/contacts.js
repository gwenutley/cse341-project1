// routes/contacts.js
const path = require("path");
const expressPath = path.resolve(__dirname, "../node_modules/express");
const express = require(expressPath);
const router = express.Router();
const contactsController = require("../controllers/contacts");
const validation = require("../middleware/validate");

//read the existing url
router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getSingle);

//create, update, and delete
router.post("/", validation.saveContact, contactsController.createContact);
router.put("/:id", validation.saveContact, contactsController.updateContact);
router.delete("/:id", contactsController.deleteContact);

module.exports = router;