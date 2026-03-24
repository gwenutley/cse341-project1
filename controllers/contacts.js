const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

//get everything in the database
const getAll = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const result = await mongodb.getDatabase().db("project1").collection("contacts").find().toArray((err, lists) => {
        if (err) {
            res.status(400).json({ message: err });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};

//get a specific contact from the databse using their Id
const getSingle = async (req, res) => {
    //#swagger.tags=["Contacts"]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json ("Must be a valid contact id");
    }
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db("project1").collection("contacts").find({ _id: contactId }).toArray((err, lists) => {
        if (err) {
            res.status(400).json({ message: err});
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    });
};

const createContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db("project1").collection("contacts").insertOne(contact);
    if(response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occured creating the contact"); 
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json ("Must be a valid contact id to update contact");
    }
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db("project1").collection("contacts").replaceOne({ _id: contactId }, contact);
    if(response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occured updating the contact"); 
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags=["Contacts"]

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json ("Must be a valid contact id to delete contact");
    }
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db("project1").collection("contacts").deleteOne({ _id: contactId });
    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occured deleting the contact"); 
    }
}

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};