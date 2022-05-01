import express from "express";
import debug from "debug";

import plantsService from "../services/plants.service";

const log: debug.IDebugger = debug("app:plants-controller");

class PlantsMiddleware {
  async validateRequirPlantBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.name && req.body.description) next();
    else
      res
        .status(400)
        .send({ error: `Missing required fields name and description` });
  }

  async validateSamePlantDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    log("Validating plant exists", req.body.name);
    const plant = await plantsService.readByName(req.body.name);
    if (plant) res.status(400).send({ error: `Plant name already exists` });
    else next();
  }

  async validatePlantExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    log("Validating plant exists", req.params.id);
    const plant = await plantsService.readById(req.params.id);
    if (!plant) res.status(404).send({ error: `Plant not found` });
    else next();
  }

  async extractPlantId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    log("Extracting plant id", req.params.plantId);
    req.body.id = req.params.plantId;
    next();
  }
}

export default new PlantsMiddleware();
