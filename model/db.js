/**
 * This file will handle all connection to the database
 */
const { MongoClient } = require("mongodb");
const uri =
    "mongodb+srv://habib:Blomma93@mineoncloudtest.klaol.mongodb.net/?retryWrites=true&w=majority";

async function connectToCluster(uri) {
    let mongoClient;
    try {
        mongoClient = new MongoClient(uri);
        console.log("Connecting to MongoDB Atlas cluster...");
        await mongoClient.connect();
        console.log("Successfully connected to MongoDB Atlas!");

        return mongoClient;
    } catch (error) {
        console.error("Connection to MongoDB Atlas failed!", error);
        process.exit();
    }
}

async function executeOperations() {
    let mongoClient;

    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db("mineOn");
        const collection = db.collection("Clients");
        console.log("Connected successfully to the database mineOn");
    } catch (error) {
        console.error("Error while connecting to MongoDB Atlas!", error);
        process.exit();
    } finally {
        await mongoClient.close();
    }
}

// Insert a document into the collection
async function insertOneDocument(collection, document) {
    await collection.insertOne(document);
}

// Insert multiple documents into the collection
async function insertManyDocuments(collection, documents) {
    await collection.insertMany(documents);
}

// Find a document in the collection
async function findOneDocument(collection, query) {
    return await collection.findOne(query);
}

// Find multiple documents in the collection
async function findManyDocuments(collection, query) {
    return await collection.find(query).toArray();
}

// Update a document in the collection
async function updateOneDocument(collection, query, update) {
    await collection.updateOne(query, update);
}

// Update multiple documents in the collection
async function updateManyDocuments(collection, query, update) {
    await collection.updateMany(query, update);
}

// Update by ID
async function updateById(collection, id, update) {
    await collection.updateOne({ _id: new ObjectID(id) }, update);
}