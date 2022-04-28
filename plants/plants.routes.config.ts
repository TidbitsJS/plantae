import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";

export class PlantsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "PlantsRoutes");
  }

  configureRoutes() {
    this.app
      .route("/plants")
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send("GET /plants");
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send("POST /plants");
      });

    this.app
      .route("/plants/:id")
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          console.log("running before any request in /plants/:id");
          next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`GET requested for id ${req.params.id}`);
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT requested for id ${req.params.id}`);
      })
      .patch((req: express.Request, res: express.Response) => {
        res.status(200).send(`PATCH requested for id ${req.params.id}`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE requested for id ${req.params.id}`);
      });

    return this.app;
  }
}
