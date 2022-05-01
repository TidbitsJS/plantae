import express from "express";
import debug from "debug";

import plantsService from "../services/plants.service";

const log: debug.IDebugger = debug("app:plants-crontroller");

class PlantsCrontroller {
  async listPlants(req: express.Request, res: express.Response) {
    const plants = await plantsService.list(100, 0);
    res.status(200).send(plants);
  }

  async getPlantById(req: express.Request, res: express.Response) {
    log("Plant ID", req.params.plantId);
    const plant = await plantsService.readById(req.params.id);
    res.status(200).send(plant);
  }

  async createPlant(req: express.Request, res: express.Response) {
    const plantId = await plantsService.create(req.body);
    log("Plant created", plantId);
    res.status(201).send({ id: plantId });
  }

  async patch(req: express.Request, res: express.Response) {
    log(await plantsService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    log(await plantsService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async deletePlant(req: express.Request, res: express.Response) {
    log(await plantsService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new PlantsCrontroller();
