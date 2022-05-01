import shortid from "shortid";
import debug from "debug";

import { CreatePlantDto } from "../dto/create.plant.dto";
import { PutPlantDto } from "../dto/put.plant.dto";
import { PatchPlantDto } from "../dto/patch.plant.dto";

const log: debug.IDebugger = debug("app:in-memory-dao");

class PlantsDao {
  plants: Array<CreatePlantDto> = [];

  constructor() {
    log("Created new instance of PlantsDao");
  }

  async addPlant(plant: CreatePlantDto) {
    plant.id = shortid.generate();
    this.plants.push(plant);
    return plant.id;
  }

  async getPlants() {
    return this.plants;
  }

  async getPlantById(plantId: string) {
    log("Plant ID", plantId);
    return this.plants.find((plant: CreatePlantDto) => plant.id === plantId);
  }

  async putPlantById(plantId: string, plant: PutPlantDto) {
    const objIndex = this.plants.findIndex(
      (obj: { id: string }) => obj.id === plantId
    );

    this.plants.splice(objIndex, 1, plant);
    return `${plant.id} updated via PUT`;
  }

  async patchPlantById(plantId: string, plant: PatchPlantDto) {
    const objIndex = this.plants.findIndex(
      (obj: { id: string }) => obj.id === plantId
    );
    let currentPlant = this.plants[objIndex];

    for (let field of Object.keys(plant)) {
      if (field in plant) {
        // @ts-ignore
        currentPlant[field] = plant[field];
      }
    }

    this.plants.splice(objIndex, 1, currentPlant);
    return `${plant.id} patched via PATCH`;
  }

  async removePlantById(plantId: string) {
    const objIndex = this.plants.findIndex(
      (obj: { id: string }) => obj.id === plantId
    );

    this.plants.splice(objIndex, 1);
    return `${plantId} removed`;
  }

  async getPlantByName(name: string) {
    return this.plants.find((plant: CreatePlantDto) => plant.name === name);
  }
}

export default new PlantsDao();
