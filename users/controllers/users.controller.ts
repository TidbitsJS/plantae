import express from "express";
import debug from "debug";
import argon2 from "argon2";

import usersService from "../services/users.service";

const log: debug.IDebugger = debug("app:users-controller");

class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = await usersService.list(100, 0);
    res.status(200).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await usersService.readById(req.params.id);
    res.status(200).send(user);
  }

  async createUser(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    const userId = await usersService.create(req.body);
    log("User created", userId);
    res.status(201).send({ id: userId });
  }

  async patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
      req.body.password = await argon2.hash(req.body.password);
    }
    log(await usersService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    req.body.password = await argon2.hash(req.body.password);
    log(await usersService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async deleteUser(req: express.Request, res: express.Response) {
    log(await usersService.deleteById(req.body.id));
    res.status(204).send();
  }

  async getAllPlantsForUser(req: express.Request, res: express.Response) {
    const allPlants = await usersService.getAllPlantsForUser(req.params.id);

    log("AllPlants", allPlants);

    res.status(200).send(JSON.stringify(allPlants));
  }
}

export default new UsersController();
