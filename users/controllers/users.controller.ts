import express from "express";
import debug from "debug";

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
    const userId = await usersService.create(req.body);
    log("User created", userId);
    res.status(201).send({ id: userId });
  }

  async patch(req: express.Request, res: express.Response) {
    log(await usersService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    log(await usersService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async deleteUser(req: express.Request, res: express.Response) {
    log(await usersService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new UsersController();
