import express from "express";

import { CommonRoutesConfig } from "../common/common.routes.config";
import UsersController from "./controllers/users.controller";
import UsersMiddleware from "./middleware/users.middleware";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes() {
    this.app
      .route("/users")
      .get(UsersController.listUsers)
      .post(
        UsersMiddleware.validateRequireUserBodyFields,
        UsersMiddleware.validateSameUserDoesntExist,
        UsersController.createUser
      );

    this.app.param("userId", UsersMiddleware.extractUserId);
    this.app
      .route("/users/:id")
      .all(UsersMiddleware.validateUserExist)
      .get(UsersController.getUserById)
      .put(UsersMiddleware.validateRequireUserBodyFields, UsersController.put)
      .patch(UsersController.patch)
      .delete(UsersController.deleteUser);

    return this.app;
  }
}
