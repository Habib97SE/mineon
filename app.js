const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const frontRoutes = require("./router/front");
const { MongoClient } = require("mongodb");

const PORT = 8000;

// const DB_URL = "mongodb://127.0.0.1:27017";
// const DB_NAME = "chckout";
const app = express();

// using cookie
app.use(cookieParser());

// bodyParser for getting data from post methods.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.cookieParser());

// public folder in root directory of the project serves all static data like
// images, css files and javascript.
app.use(express.static(path.join(__dirname, "public")));

// Template Engine = EJS
app.set("view engine", "ejs");

// All routes related to admin
//app.use("/admin", adminRoutes);

// All routes related to front site.
// Connection URL

async function findStudentsByName(collection, name) {
    return collection.find({ name }).toArray();
}
async function createStudentDocument(collection) {
    const clients = {
        name: "John Smith",
        birthdate: new Date(2000, 11, 20),
        address: { street: "Pike Lane", city: "Los Angeles", state: "CA" },
        password: "Blomma93",
    };

    await collection.insertOne(clients);
}

async function executeStudentCrudOperations() {
    let mongoClient;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db("mineOn");
        const collection = db.collection("Clients");
        console.log("Connected successfully to the database mineOn");
        //await createStudentDocument(collection);
        //console.log("Document inserted successfully");
        //const students = await findStudentsByName(collection, "John Smith");
        //console.log(students);
    } catch (error) {
        console.error("Error while connecting to MongoDB Atlas!", error);
        process.exit();
    } finally {
        await mongoClient.close();
    }
}

//executeStudentCrudOperations();

app.use(frontRoutes);
app.listen(PORT);