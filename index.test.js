const { MongoClient } = require("mongodb");
require("dotenv").config();
const URI = process.env.DATABASE;
const DATABASENAME = process.env.DATABASENAME;
const COLLECTION = process.env.COLLECTION;



describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = new MongoClient(URI);
    db = await connection.db(DATABASENAME);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection(COLLECTION);

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
  
});




describe('delete', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = new MongoClient(URI);
    db = await connection.db(DATABASENAME);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should delete all doc into collection', async () => {
    const users = db.collection(COLLECTION);

    const insertedUser = await users.deleteMany({});
    expect(insertedUser.deletedCount).toBe(1);
  });
  
});

