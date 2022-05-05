import mongooseService from "../../common/services/mongoose.service";
import shortid from "shortid";
import debug from "debug";

import { CreateUserDto } from "../dto/create.user.dto";
import { PutPlantDto } from "../../plants/dto/put.plant.dto";
import { PatchPlantDto } from "../../plants/dto/patch.plant.dto";

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
}

export default new UserDao();
