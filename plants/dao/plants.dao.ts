import mongooseService from "../../common/services/mongoose.service";
import shortid from "shortid";
import debug from "debug";

import { CreatePlantDto } from "../dto/create.plant.dto";
import { PutPlantDto } from "../dto/put.plant.dto";
import { PatchPlantDto } from "../dto/patch.plant.dto";

const log: debug.IDebugger = debug("app:in-memory-dao:plant");

class PlantsDao {
  Schema = mongooseService.getMongoose().Schema;

  plantsSchema = new this.Schema(
    {
      _id: String,
      name: String,
      scientificName: String,
      family: String,
      description: String,
    },
    { id: false }
  );

  Plant = mongooseService.getMongoose().model("Plants", this.plantsSchema);

  constructor() {
    log("Created new instance of PlantsDao");
  }

  async createPlant(plantFields: CreatePlantDto) {
    const plantId = shortid.generate();
    const plant = new this.Plant({
      _id: plantId,
      ...plantFields,
    });

    await plant.save();
    return plantId;
  }

  async getPlants(limit = 25, page = 0) {
    return this.Plant.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async updatePlantById(
    plantId: string,
    plantFields: PatchPlantDto | PutPlantDto
  ) {
    const existingPlant = await this.Plant.findOneAndUpdate(
      { _id: plantId },
      { $set: plantFields },
      { new: true }
    );

    return existingPlant;
  }

  async removePlantById(plantId: string) {
    return this.Plant.deleteOne({ _id: plantId }).exec();
  }

  async readById(plantId: string) {
    return this.Plant.findOne({ _id: plantId }).exec();
  }

  async readByName(plantName: string) {
    return this.Plant.findOne({ name: plantName }).exec();
  }
}

export default new PlantsDao();
