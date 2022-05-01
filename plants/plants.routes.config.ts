import express from "express";

import { CommonRoutesConfig } from "../common/common.routes.config";
import PlantsController from "./controllers/plants.controller";
import PlantsMiddleware from "./middleware/plants.middleware";

export class PlantsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "PlantsRoutes");
  }

  configureRoutes() {
    this.app
      .route("/plants")
      .get(PlantsController.listPlants)
      .post(
        PlantsMiddleware.validateRequirPlantBodyFields,
        PlantsMiddleware.validateSamePlantDoesntExist,
        PlantsController.createPlant
      );

    this.app.param("plantId", PlantsMiddleware.extractPlantId);
    this.app
      .route("/plants/:id")
      .all(PlantsMiddleware.validatePlantExist)
      .get(PlantsController.getPlantById)
      .put(PlantsMiddleware.validateRequirPlantBodyFields, PlantsController.put)
      .patch(PlantsController.patch)
      .delete(PlantsController.deletePlant);

    return this.app;
  }
}
