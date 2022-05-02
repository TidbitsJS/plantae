import mongoose from "mongoose";
import debug from "debug";

const log: debug.IDebugger = debug("app:mongoose-service");

class MongooseService {
  private count = 0;
  private mongooseOptions = {
    // without this set to true, Mongoose prints a deprecation warning
    useNewUrlParser: true,
    // Mongoose documentation recommends setting thi to use a newer connection management engine
    useUnifiedTopology: true,
    // to provide helpful feedback
    serverSelectionTimeoutMS: 5000,
    // Causes Mongoose to use a newer native MongoDB feature instead of an older Mongoose shim
    useFindAndModify: false,
  };

  constructor() {
    this.connectWithRetry();
  }

  getMongoose() {
    return mongoose;
  }

  connectWithRetry() {
    log(`Attempting MongoDB connection (will retry if needed)`);
    mongoose
      .connect(process.env.MONGO_URI as string, this.mongooseOptions)
      .then(() => {
        log("MongoDB connection successful");
      })
      .catch((err) => {
        const retrySecons = 5;
        log(
          `MongoDb connection unsuccessful (will retry #${++this
            .count} after ${retrySecons} seconds): ${err.message}`
        );

        setTimeout(this.connectWithRetry, retrySecons * 1000);
      });
  }
}

export default new MongooseService();
