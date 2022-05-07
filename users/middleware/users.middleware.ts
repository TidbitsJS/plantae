import express from "express";
import debug from "debug";

import usersService from "../services/users.service";

const log: debug.IDebugger = debug("app:users-controller");

class UsersMiddleware {
  async validateRequireUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      req.body &&
      req.body.name &&
      req.body.username &&
      req.body.password &&
      req.body.email
    )
      next();
    else
      res.status(400).send({
        error: `Missing required fields 
                name, username, password and email`,
      });
  }

  async validateSameUserDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    log("Validatin user exists", req.body.email);
    const user = await usersService.readyByEmail(req.body.email);
    if (user)
      res.status(400).send({ error: `User with same email ID already exists` });
    else next();
  }

  async validateUserExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    log("Validating user exists", req.params.id);
    const user = await usersService.readById(req.params.id);
    if (!user) res.status(404).send({ error: `User not found` });
    else next();
  }

  async extractUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    log("Extracting user id", req.params.userId);
    req.body.id = req.params.userId;
    next();
  }
}

export default new UsersMiddleware();
