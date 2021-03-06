"use-strict";
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

module.exports = class Database {
    constructor() {
        this.client = null;
        this.uri =
            "mongodb+srv://" +
            process.env.DATABASE_USER +
            ":" +
            process.env.DATABASE_PASSWORD +
            "@mineoncloudtest.klaol.mongodb.net/?retryWrites=true&w=majority";
        this.databaseName = process.env.DATABASE_NAME;
    }

    /**
     * Connect to the MongoDB Atlas cluster.
     * @returns {Promise<MongoClient>} - The client to the database.
     */
    async connectToCluster() {
        let mongoClient;
        try {
            mongoClient = new MongoClient(this.uri);
            await mongoClient.connect();
        } catch (error) {
            console.error("Connection to MongoDB Atlas failed!", error);
            process.exit();
        }
        return mongoClient;
    }

    // Make four functions to execute CRUD operations on the database.
    /**
     * Returns all documents in the given collection.
     * @param {string} collectionName  - The name of the collection.
     * @param {object} query - The query to execute.
     * @returns {object} - The result of the query.
     */
    async find(collectionName, query) {
        let result;
        let mongoClient;
        try {
            mongoClient = await this.connectToCluster();
            const db = mongoClient.db(this.databaseName);
            const collection = db.collection(collectionName);
            result = await collection.find(query);
        } catch (error) {
            console.error("Error while connecting to MongoDB Atlas!", error);
            process.exit();
        } finally {
            mongoClient.close();
        }
        return result;
    }

    async findByEmail(collectionName, email) {
        let mongoClient;
        try {
            mongoClient = await this.connectToCluster();
            const db = mongoClient.db(this.databaseName);
            const collection = db.collection(collectionName);
            const result = await collection.findOne({ email: email });
            return result;
        } catch (error) {
            console.error("Error while connecting to MongoDB Atlas!", error);
            process.exit();
        } finally {
            mongoClient.close();
        }
    }

    /**
     * This function deletes the given id and its row from collection.
     * @param {string} collectionName - The name of the collection.
     * @param {string} id - The id of the row to delete.
     * @returns return the document if found otherwise return false.
     */
    async findById(collectionName, id) {
        let mongoClient;
        try {
            mongoClient = await this.connectToCluster();
            const db = mongoClient.db(this.databaseName);
            const collection = db.collection(collectionName);
            const objectId = new ObjectId(id);
            const result = await collection.findOne({ _id: objectId });
            return result;
        } catch (error) {
            console.error("Error while connecting to MongoDB Atlas!", error);
            process.exit();
        } finally {
            mongoClient.close();
        }
        return false;
    }

    /**
     * This function search in given collection if a user with same email
     * address already exists.
     * @param {string} collectionName - The name of the collection.
     * @param {string} email - The email of the user.
     * @returns Return the document if found otherwise return false.
     */
    async isEmailInUse(collectionName, email) {
        let mongoClient;
        let result = false;
        try {
            mongoClient = await this.connectToCluster();
            const db = mongoClient.db(this.databaseName);
            const collection = db.collection(collectionName);
            result = await collection.findOne({ email: email });
        } catch (error) {
            console.error("Error while connecting to MongoDB Atlas!", error);
            process.exit();
        } finally {
            await mongoClient.close();
        }
        return result;
    }

    /**
     * Create a new document in the given collection.
     * @param {string} collectionName : The name of the collection.
     * @param {object} data : The data to insert into the collection.
     * @returns : true if document inserted successfully, otherwise false.
     */
    async insert(collectionName, data = {}) {
        let mongoClient;
        try {
            mongoClient = await this.connectToCluster();
            const db = mongoClient.db(this.databaseName);
            const collection = db.collection(collectionName);
            await collection.insertOne(data);
        } catch (error) {
            console.error("Error while connecting to MongoDB Atlas!", error);
            process.exit();
            return false;
        } finally {
            mongoClient.close();
        }
        return true;
    }

    /**
     * Update the given id with the new data.
     * @param {string} collectionName - The name of the collection.
     * @param {string} id - The id of the row to update.
     * @param {string} data - The data to update the row with.
     * @returns {boolean} - True if the row was updated, false otherwise.
     */
    async update(collectionName, id, data) {
        let mongoClient;
        try {
            mongoClient = await this.connectToCluster();
            const db = mongoClient.db(this.databaseName);
            const collection = db.collection(collectionName);
            const objectId = new ObjectId(id);
            const result = await collection.updateOne({ _id: objectId }, data);
            return result;
        } catch (error) {
            console.error("Error while connecting to MongoDB Atlas!", error);
            process.exit();
        } finally {
            mongoClient.close();
        }
        return false;
    }

    /**
     * This function deletes the given id and its row from collection.
     * @param {*} collectionName - The name of the collection.
     * @param {*} id - The id of the row to delete.
     * @returns
     */
    async delete(collectionName, id) {
            let mongoClient;
            try {
                mongoClient = await this.connectToCluster();
                const db = mongoClient.db(this.databaseName);
                const collection = db.collection(collectionName);
                const objectId = new ObjectId(id);
                const result = await collection.deleteOne({ _id: objectId });
                return result;
            } catch (error) {
                console.error("Error while connecting to MongoDB Atlas!", error);
                process.exit();
            } finally {
                mongoClient.close();
            }
            return false;
        }
        /**
         * Create a new collection in the database. If the collection already exists, do nothing.
         * @param {string} newCollectionName - The name of the new collection.
         * return {boolean} - True if the collection was created, false otherwise.
         */
    async createCollection(newCollectionName) {
        let mongoClient;
        try {
            mongoClient = await this.connectToCluster();
            const db = mongoClient.db(this.databaseName);
            const collection = db.collection(newCollectionName);
            return true;
        } catch (error) {
            console.error("Error while connecting to MongoDB Atlas!", error);
            process.exit();
        } finally {
            mongoClient.close();
        }
        return false;
    }
};