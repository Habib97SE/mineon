"use strict";
"use-strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require("mongodb"),
    MongoClient = _require.MongoClient;

var ObjectId = require("mongodb").ObjectId;

module.exports =
/*#__PURE__*/
function () {
  function Database() {
    _classCallCheck(this, Database);

    this.client = null;
    this.uri = "mongodb+srv://" + process.env.DATABASE_USER + ":" + process.env.DATABASE_PASSWORD + "@mineoncloudtest.klaol.mongodb.net/?retryWrites=true&w=majority";
    this.databaseName = process.env.DATABASE_NAME;
  }
  /**
   * Connect to the MongoDB Atlas cluster.
   * @returns {Promise<MongoClient>} - The client to the database.
   */


  _createClass(Database, [{
    key: "connectToCluster",
    value: function connectToCluster() {
      var mongoClient;
      return regeneratorRuntime.async(function connectToCluster$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              mongoClient = new MongoClient(this.uri);
              _context.next = 4;
              return regeneratorRuntime.awrap(mongoClient.connect());

            case 4:
              _context.next = 10;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              console.error("Connection to MongoDB Atlas failed!", _context.t0);
              process.exit();

            case 10:
              return _context.abrupt("return", mongoClient);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 6]]);
    } // Make four functions to execute CRUD operations on the database.

    /**
     * Returns all documents in the given collection.
     * @param {string} collectionName  - The name of the collection.
     * @param {object} query - The query to execute.
     * @returns {object} - The result of the query.
     */

  }, {
    key: "find",
    value: function find(collectionName, query) {
      var result, mongoClient, db, collection;
      return regeneratorRuntime.async(function find$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.connectToCluster());

            case 3:
              mongoClient = _context2.sent;
              db = mongoClient.db(this.databaseName);
              collection = db.collection(collectionName);
              _context2.next = 8;
              return regeneratorRuntime.awrap(collection.find(query));

            case 8:
              result = _context2.sent;
              _context2.next = 15;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              console.error("Error while connecting to MongoDB Atlas!", _context2.t0);
              process.exit();

            case 15:
              _context2.prev = 15;
              mongoClient.close();
              return _context2.finish(15);

            case 18:
              return _context2.abrupt("return", result);

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[0, 11, 15, 18]]);
    }
  }, {
    key: "findByEmail",
    value: function findByEmail(collectionName, email) {
      var mongoClient, db, collection, result;
      return regeneratorRuntime.async(function findByEmail$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.connectToCluster());

            case 3:
              mongoClient = _context3.sent;
              db = mongoClient.db(this.databaseName);
              collection = db.collection(collectionName);
              _context3.next = 8;
              return regeneratorRuntime.awrap(collection.findOne({
                email: email
              }));

            case 8:
              result = _context3.sent;
              return _context3.abrupt("return", result);

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              console.error("Error while connecting to MongoDB Atlas!", _context3.t0);
              process.exit();

            case 16:
              _context3.prev = 16;
              mongoClient.close();
              return _context3.finish(16);

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[0, 12, 16, 19]]);
    }
    /**
     * This function deletes the given id and its row from collection.
     * @param {string} collectionName - The name of the collection.
     * @param {string} id - The id of the row to delete.
     * @returns return the document if found otherwise return false.
     */

  }, {
    key: "findById",
    value: function findById(collectionName, id) {
      var mongoClient, db, collection, objectId, result;
      return regeneratorRuntime.async(function findById$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.connectToCluster());

            case 3:
              mongoClient = _context4.sent;
              db = mongoClient.db(this.databaseName);
              collection = db.collection(collectionName);
              objectId = new ObjectId(id);
              _context4.next = 9;
              return regeneratorRuntime.awrap(collection.findOne({
                _id: objectId
              }));

            case 9:
              result = _context4.sent;
              return _context4.abrupt("return", result);

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](0);
              console.error("Error while connecting to MongoDB Atlas!", _context4.t0);
              process.exit();

            case 17:
              _context4.prev = 17;
              mongoClient.close();
              return _context4.finish(17);

            case 20:
              return _context4.abrupt("return", false);

            case 21:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[0, 13, 17, 20]]);
    }
    /**
     * This function search in given collection if a user with same email
     * address already exists.
     * @param {string} collectionName - The name of the collection.
     * @param {string} email - The email of the user.
     * @returns Return the document if found otherwise return false.
     */

  }, {
    key: "isEmailInUse",
    value: function isEmailInUse(collectionName, email) {
      var mongoClient, result, db, collection;
      return regeneratorRuntime.async(function isEmailInUse$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              result = false;
              _context5.prev = 1;
              _context5.next = 4;
              return regeneratorRuntime.awrap(this.connectToCluster());

            case 4:
              mongoClient = _context5.sent;
              db = mongoClient.db(this.databaseName);
              collection = db.collection(collectionName);
              _context5.next = 9;
              return regeneratorRuntime.awrap(collection.findOne({
                email: email
              }));

            case 9:
              result = _context5.sent;
              _context5.next = 16;
              break;

            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](1);
              console.error("Error while connecting to MongoDB Atlas!", _context5.t0);
              process.exit();

            case 16:
              _context5.prev = 16;
              _context5.next = 19;
              return regeneratorRuntime.awrap(mongoClient.close());

            case 19:
              return _context5.finish(16);

            case 20:
              return _context5.abrupt("return", result);

            case 21:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[1, 12, 16, 20]]);
    }
    /**
     * Create a new document in the given collection.
     * @param {string} collectionName : The name of the collection.
     * @param {object} data : The data to insert into the collection.
     * @returns : true if document inserted successfully, otherwise false.
     */

  }, {
    key: "insert",
    value: function insert(collectionName) {
      var data,
          mongoClient,
          db,
          collection,
          _args6 = arguments;
      return regeneratorRuntime.async(function insert$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              data = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
              _context6.prev = 1;
              _context6.next = 4;
              return regeneratorRuntime.awrap(this.connectToCluster());

            case 4:
              mongoClient = _context6.sent;
              db = mongoClient.db(this.databaseName);
              collection = db.collection(collectionName);
              _context6.next = 9;
              return regeneratorRuntime.awrap(collection.insertOne(data));

            case 9:
              _context6.next = 16;
              break;

            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6["catch"](1);
              console.error("Error while connecting to MongoDB Atlas!", _context6.t0);
              process.exit();
              return _context6.abrupt("return", false);

            case 16:
              _context6.prev = 16;
              mongoClient.close();
              return _context6.finish(16);

            case 19:
              return _context6.abrupt("return", true);

            case 20:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this, [[1, 11, 16, 19]]);
    }
    /**
     * Update the given id with the new data.
     * @param {string} collectionName - The name of the collection.
     * @param {string} id - The id of the row to update.
     * @param {string} data - The data to update the row with.
     * @returns {boolean} - True if the row was updated, false otherwise.
     */

  }, {
    key: "update",
    value: function update(collectionName, id, data) {
      var mongoClient, db, collection, objectId, result;
      return regeneratorRuntime.async(function update$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return regeneratorRuntime.awrap(this.connectToCluster());

            case 3:
              mongoClient = _context7.sent;
              db = mongoClient.db(this.databaseName);
              collection = db.collection(collectionName);
              objectId = new ObjectId(id);
              _context7.next = 9;
              return regeneratorRuntime.awrap(collection.updateOne({
                _id: objectId
              }, data));

            case 9:
              result = _context7.sent;
              return _context7.abrupt("return", result);

            case 13:
              _context7.prev = 13;
              _context7.t0 = _context7["catch"](0);
              console.error("Error while connecting to MongoDB Atlas!", _context7.t0);
              process.exit();

            case 17:
              _context7.prev = 17;
              mongoClient.close();
              return _context7.finish(17);

            case 20:
              return _context7.abrupt("return", false);

            case 21:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this, [[0, 13, 17, 20]]);
    }
    /**
     * This function deletes the given id and its row from collection.
     * @param {*} collectionName - The name of the collection.
     * @param {*} id - The id of the row to delete.
     * @returns
     */

  }, {
    key: "delete",
    value: function _delete(collectionName, id) {
      var mongoClient, db, collection, objectId, result;
      return regeneratorRuntime.async(function _delete$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return regeneratorRuntime.awrap(this.connectToCluster());

            case 3:
              mongoClient = _context8.sent;
              db = mongoClient.db(this.databaseName);
              collection = db.collection(collectionName);
              objectId = new ObjectId(id);
              _context8.next = 9;
              return regeneratorRuntime.awrap(collection.deleteOne({
                _id: objectId
              }));

            case 9:
              result = _context8.sent;
              return _context8.abrupt("return", result);

            case 13:
              _context8.prev = 13;
              _context8.t0 = _context8["catch"](0);
              console.error("Error while connecting to MongoDB Atlas!", _context8.t0);
              process.exit();

            case 17:
              _context8.prev = 17;
              mongoClient.close();
              return _context8.finish(17);

            case 20:
              return _context8.abrupt("return", false);

            case 21:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this, [[0, 13, 17, 20]]);
    }
    /**
     * Create a new collection in the database. If the collection already exists, do nothing.
     * @param {string} newCollectionName - The name of the new collection.
     * return {boolean} - True if the collection was created, false otherwise.
     */

  }, {
    key: "createCollection",
    value: function createCollection(newCollectionName) {
      var mongoClient, db, collection;
      return regeneratorRuntime.async(function createCollection$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return regeneratorRuntime.awrap(this.connectToCluster());

            case 3:
              mongoClient = _context9.sent;
              db = mongoClient.db(this.databaseName);
              collection = db.collection(newCollectionName);
              return _context9.abrupt("return", true);

            case 9:
              _context9.prev = 9;
              _context9.t0 = _context9["catch"](0);
              console.error("Error while connecting to MongoDB Atlas!", _context9.t0);
              process.exit();

            case 13:
              _context9.prev = 13;
              mongoClient.close();
              return _context9.finish(13);

            case 16:
              return _context9.abrupt("return", false);

            case 17:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this, [[0, 9, 13, 16]]);
    }
  }]);

  return Database;
}();