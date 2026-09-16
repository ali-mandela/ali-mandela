import { MongoClient, type Db } from "mongodb";

const globalForMongo = globalThis as unknown as {
  _mongoClient?: Promise<MongoClient>;
};

// Returns null when MONGODB_URI isn't configured, so analytics degrade silently.
export async function getDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri)
      .connect()
      .catch((err) => {
        globalForMongo._mongoClient = undefined;
        throw err;
      });
  }

  const client = await globalForMongo._mongoClient;
  return client.db(process.env.MONGODB_DB ?? "portfolio");
}
