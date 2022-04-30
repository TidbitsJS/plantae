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

  async validatePlantExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const plant = await plantsService.readByName(req.body.name);
    if (plant) res.status(400).send({ error: `Plant name already exists` });
    else next();
  }

  async extractPlantId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.plantId;
    next();
  }
}
