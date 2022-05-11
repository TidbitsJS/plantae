import mongooseService from "../../common/services/mongoose.service";
import shortid from "shortid";
import debug from "debug";

import { CreateUserDto } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";

const log: debug.IDebugger = debug("app:in-memory-dao:user");

class UserDao {
  Schema = mongooseService.getMongoose().Schema;

  usersSchema = new this.Schema(
    {
      _id: String,
      name: String,
      userName: String,
      email: String,
      password: String,
      plants: [String],
    },
    { id: false }
  );

  User = mongooseService.getMongoose().model("Users", this.usersSchema);

  constructor() {
    log("Created new instance of UsersDao");
  }

  async createUser(userFields: CreateUserDto) {
    const userId = shortid.generate();
    const user = new this.User({
      _id: userId,
      ...userFields,
      plants: [],
    });

    await user.save();
    return userId;
  }

  async getUsers(limit = 12, page = 0) {
    return this.User.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async updateUserById(userId: string, userFields: PatchUserDto | PutUserDto) {
    const existingUser = await this.User.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: true }
    );

    return existingUser;
  }

  async addPlantToUser(userId: string, plantId: string) {
    const existingUser = await this.User.findOneAndUpdate(
      { _id: userId },
      { $push: { plants: plantId } },
      { new: true }
    );

    return existingUser;
  }

  async deleteUserById(userId: string) {
    return this.User.deleteOne({ _id: userId }).exec();
  }

  async readById(userId: string) {
    return this.User.findOne({ _id: userId }).exec();
  }

  async readByEmail(email: string) {
    return this.User.findOne({ email: email }).exec();
  }
}

export default new UserDao();
