import PlantsDao from "../dao/plants.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreatePlantDto } from "../dto/create.plant.dto";
import { PutPlantDto } from "../dto/put.plant.dto";
import { PatchPlantDto } from "../dto/patch.plant.dto";

class PlantsService implements CRUD {
  async list(limit: number, page: number) {
    return PlantsDao.getPlants();
  }

  async create(resource: CreatePlantDto) {
    PlantsDao.addPlant(resource);
  }

  async deleteById(id: string) {
    return PlantsDao.removePlantById(id);
  }

  async patchById(id: string, resource: PatchPlantDto): Promise<any> {
    return PlantsDao.patchPlantById(id, resource);
  }

  async putById(id: string, resource: PutPlantDto): Promise<any> {
    return PlantsDao.putPlantById(id, resource);
  }

  async readById(id: string) {
    return PlantsDao.getPlantById(id);
  }

  async readByName(name: string) {
    return PlantsDao.getPlantByName(name);
  }
}

export default new PlantsService();
