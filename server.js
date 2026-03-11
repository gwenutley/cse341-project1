//require installations
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./data/database");
const app = express();

const port = process.env.PORT || 3000;

//allow the POST method to work and reading of the object
app.use(bodyParser.json());
//go to the routes for the GET methods
app.use('/', require("./routes"));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Database listening and node running on port ${port}`);});
    }
});

