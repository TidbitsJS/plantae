import PlantsDao from "../dao/plants.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreatePlantDto } from "../dto/create.plant.dto";
import { PutPlantDto } from "../dto/put.plant.dto";
import { PatchPlantDto } from "../dto/patch.plant.dto";

class PlantsService implements CRUD {
  async list(limit: number, page: number) {
    return PlantsDao.getPlants(limit, page);
  }

  async create(resource: CreatePlantDto) {
    return PlantsDao.createPlant(resource);
  }

  async deleteById(id: string) {
    return PlantsDao.removePlantById(id);
  }

  async patchById(id: string, resource: PatchPlantDto): Promise<any> {
    return PlantsDao.updatePlantById(id, resource);
  }

  async putById(id: string, resource: PutPlantDto): Promise<any> {
    return PlantsDao.updatePlantById(id, resource);
  }

  async readById(id: string) {
    return PlantsDao.readById(id);
  }

  async readByName(name: string) {
    return PlantsDao.readByName(name);
  }
}

export default new PlantsService();
